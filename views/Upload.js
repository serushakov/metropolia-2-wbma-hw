import React, { useContext, useState } from "react";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Button, Image, Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../contexts/AuthContext";
import { postMedia } from "../api/media";
import validate from "validate.js";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";

const defaultFieldState = {
  touched: false,
  value: "",
};

const useFields = () => {
  const [fields, setFields] = useState({
    title: defaultFieldState,
    description: defaultFieldState,
  });

  const handleFieldChange = (field, value) => {
    setFields((current) => ({
      ...current,
      [field]: { ...current[field], value },
    }));
  };

  const handleFieldBlur = (field) => {
    setFields((current) => ({
      ...current,
      [field]: { ...current[field], touched: true },
    }));
  };

  return { fields, handleFieldBlur, handleFieldChange };
};

const useImagePicker = () => {
  const [image, setImage] = useState();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return { image, pickImage };
};

const useUploadMedia = () => {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [data, setData] = useState();

  const uploadMedia = async (title, description, image) => {
    if (!token) return;
    setLoading(true);
    setError(null);

    try {
      const response = await postMedia(title, description, image, token);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return { uploadMedia, error, loading, data };
};

const validator = (title, description, image) =>
  validate(
    { title, description, image },
    {
      title: {
        presence: { allowEmpty: false },
      },
      description: {
        presence: { allowEmpty: false },
      },
      image: {
        presence: { allowEmpty: false },
      },
    }
  );

const Upload = () => {
  const { fields, handleFieldBlur, handleFieldChange } = useFields();
  const { image, pickImage } = useImagePicker();

  const { uploadMedia, error, loading, data } = useUploadMedia();

  console.log({ loading, data, error });

  const errors = validator(fields.title.value, fields.description.value, image);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {loading && (
        <View style={styles.activityIndicatorOverlay}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}

      <Image style={styles.image} source={{ uri: image?.uri }} />
      <Button title="Pick an image" onPress={pickImage} />

      <Input
        label="Title"
        onBlur={() => handleFieldBlur("title")}
        onTextInput={(value) => handleFieldChange("title", value)}
        value={fields.title.value}
      />
      <Input
        label="Description"
        multiline
        onBlur={() => handleFieldBlur("description")}
        onTextInput={(value) => handleFieldChange("description", value)}
        value={fields.description.value}
      />

      <Button
        disabled={!!errors}
        title="Upload"
        onPress={() =>
          uploadMedia(fields.title.value, fields.description.value, image)
        }
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },

  activityIndicatorOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(32, 33, 37, 0.4)",
  },
});

export default Upload;

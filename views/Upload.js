import React, { useState } from "react";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Button, Image, Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

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
      setImage(result.uri);
    }
  };

  return { image, pickImage };
};

const Upload = () => {
  const { fields, handleFieldBlur, handleFieldChange } = useFields();
  const { image, pickImage } = useImagePicker();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri: image }} />
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
      <Button title="Pick an image" onPress={pickImage} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    alignItems: "center",
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },
});

export default Upload;

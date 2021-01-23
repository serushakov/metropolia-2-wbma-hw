import AsyncStorage from "@react-native-community/async-storage";
import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { postLogin, postRegister } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthContext";
import FormTextInput from "../FormTextInput";

const validate = ({ username, password, email }) => {
  return (
    username.trim().length > 0 &&
    password.trim().length > 0 &&
    email.trim().length > 0
  );
};

const RegisterForm = () => {
  const [, setIsLoggedIn] = useContext(AuthContext);
  const [error, setError] = useState();

  const [fields, setFormState] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
  });

  const handleInputChange = (field, value) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const isValid = validate(fields);

  const handlePressRegister = async () => {
    setError(null);
    try {
      const registerResponse = await postRegister(fields);
      const registerContent = await registerResponse.json();

      if (registerContent.error) {
        throw Error(registerContent.error);
      }

      const loginResponse = await postLogin(fields.username, fields.password);

      const { token, error } = await loginResponse.json();

      if (loginResponse.status > 299) {
        throw Error(error);
      }

      if (token) {
        setIsLoggedIn(true);
        await AsyncStorage.setItem("userToken", token);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <FormTextInput
        autoCapitalize="none"
        placeholder="Username"
        autoCompleteType="off"
        value={fields.username}
        onChangeText={(txt) => handleInputChange("username", txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="*********"
        value={fields.password}
        onChangeText={(txt) => handleInputChange("password", txt)}
        secureTextEntry
      />
      <FormTextInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        value={fields.email}
        onChangeText={(txt) => handleInputChange("email", txt)}
      />
      <FormTextInput
        autoCapitalize="words"
        placeholder="Full name"
        value={fields.fullName}
        onChangeText={(txt) => handleInputChange("fullName", txt)}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        disabled={!isValid}
        title="Register"
        onPress={handlePressRegister}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default RegisterForm;

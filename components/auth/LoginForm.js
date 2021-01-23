import AsyncStorage from "@react-native-community/async-storage";
import React, { useContext, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { postLogin } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthContext";
import FormTextInput from "../FormTextInput";

const validate = ({ username, password }) =>
  username.trim().length > 0 && password.trim().length > 0;

const LoginForm = () => {
  const [, setIsLoggedIn] = useContext(AuthContext);

  const [fields, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const isValid = validate(fields);

  const handlePressLogin = async () => {
    const { token } = await postLogin(fields.username, fields.password);

    if (token) {
      setIsLoggedIn(true);
      await AsyncStorage.setItem("userToken", token);
    }
  };

  return (
    <View style={styles.container}>
      <FormTextInput
        autoCapitalize="none"
        placeholder="Username"
        autoCompleteType="off"
        onChangeText={(text) => handleInputChange("username", text)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => handleInputChange("password", text)}
      />
      <Button onPress={handlePressLogin} disabled={!isValid} title="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },
});

export default LoginForm;

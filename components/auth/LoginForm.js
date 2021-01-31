import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { useHandleLogin } from "../../hooks/ApiHooks";

const validate = ({ username, password }) =>
  username.trim().length > 0 && password.trim().length > 0;

const LoginForm = () => {
  const { error, doLogin } = useHandleLogin();

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

  const handlePressLogin = () => {
    doLogin(fields.username, fields.password);
  };

  return (
    <View style={styles.container}>
      <Input
        autoCapitalize="none"
        placeholder="Username"
        autoCompleteType="off"
        onChangeText={(text) => handleInputChange("username", text)}
      />

      <Input
        autoCapitalize="none"
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => handleInputChange("password", text)}
      />
      {error && <Text style={styles.error}>{error}</Text>}

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
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default LoginForm;

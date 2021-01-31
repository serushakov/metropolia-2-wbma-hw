import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";

import { postRegister } from "../../api/auth";
import { useHandleLogin } from "../../hooks/ApiHooks";

const validate = ({ username, password, email }) => {
  return (
    username.trim().length > 0 &&
    password.trim().length > 0 &&
    email.trim().length > 0
  );
};

const RegisterForm = () => {
  const [error, setError] = useState();

  const { error: loginError, doLogin } = useHandleLogin();

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

  useEffect(() => {
    setError(loginError);
  }, [loginError]);

  const isValid = validate(fields);

  const handlePressRegister = async () => {
    setError(null);

    const registerResponse = await postRegister(fields);
    const registerContent = await registerResponse.json();

    if (registerContent.error) {
      setError(registerContent.error);
      return;
    }

    doLogin(fields.username, fields.password);
  };

  return (
    <View style={styles.container}>
      <Input
        autoCapitalize="none"
        placeholder="Username"
        autoCompleteType="off"
        value={fields.username}
        onChangeText={(txt) => handleInputChange("username", txt)}
      />
      <Input
        autoCapitalize="none"
        placeholder="*********"
        value={fields.password}
        onChangeText={(txt) => handleInputChange("password", txt)}
        secureTextEntry
      />
      <Input
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        value={fields.email}
        onChangeText={(txt) => handleInputChange("email", txt)}
      />
      <Input
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

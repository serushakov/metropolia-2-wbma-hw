import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { postRegister } from "../../api/auth";
import FormTextInput from "../FormTextInput";

const validate = ({ username, password, email }) => {
  return (
    username.trim().length > 0 &&
    password.trim().length > 0 &&
    email.trim().length > 0
  );
};

const RegisterForm = () => {
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

  const handlePressRegister = () => {
    postRegister(fields);
  };

  return (
    <View style={styles.container}>
      <FormTextInput
        autoCapitalize="none"
        placeholder="Username"
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
});

export default RegisterForm;

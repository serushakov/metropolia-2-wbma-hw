import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import RegisterForm from "../components/auth/RegisterForm";

const Register = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <RegisterForm />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

Register.propTypes = {
  navigation: PropTypes.object,
};

export default Register;

import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, KeyboardAvoidingView, Platform } from "react-native";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

import { AuthContext } from "../contexts/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-elements";

const Login = ({ navigation }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    setIsLoggedIn(!!userToken);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    navigation.navigate("Home");
  }, [isLoggedIn]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LoginForm />
      <Button
        style={styles.noAccountButton}
        titleStyle={styles.noAccountButtonText}
        title="I don't have an account"
        type="clear"
        onPress={() => navigation.navigate("Register")}
      />
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
  noAccountButton: {
    marginTop: 8,
  },

  noAccountButtonText: {
    fontSize: 14,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;

import React, { useContext, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

import { AuthContext } from "../contexts/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import { Button } from "react-native-elements";
import { getCurrentUser } from "../api/auth";

const Login = ({ navigation }) => {
  const { isLoggedIn, setUser, setToken } = useContext(AuthContext);

  useEffect(() => {
    const getToken = async () => {
      const userToken = await AsyncStorage.getItem("userToken");

      if (userToken) {
        const response = await getCurrentUser(userToken);

        if (response.status !== 200) {
          setUser(null);
          setToken(null);
          return;
        }

        const user = await response.json();

        setUser(user);
        setToken(userToken);
      }
    };

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

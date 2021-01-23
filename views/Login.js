import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

import { AuthContext } from "../contexts/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import { TouchableOpacity } from "react-native-gesture-handler";

const Login = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

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
    <View style={styles.container}>
      <LoginForm />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    color: "blue",
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;

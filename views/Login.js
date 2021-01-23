import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

import { AuthContext } from "../contexts/AuthContext";
import { postLogin } from "../api/auth";

const Login = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

  const getToken = async () => {
    let userToken = await AsyncStorage.getItem("userToken");

    if (!userToken) {
      const response = await postLogin("sushakov", "");

      userToken = response.token;
    }

    if (userToken) {
      setIsLoggedIn(true);
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const handlePressLogin = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem("userToken", "kek");
    if (isLoggedIn) {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={handlePressLogin} />
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
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;

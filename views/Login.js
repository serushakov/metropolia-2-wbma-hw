import React, { useContext } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import PropTypes from "prop-types";
import { AuthContext } from "../contexts/AuthContext";

const Login = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

  const handlePressLogin = () => {
    setIsLoggedIn(true);
    if (isLoggedIn) {
      // this is to make sure isLoggedIn has changed, will be removed later
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

import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StyleSheet, SafeAreaView, Text, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { AuthContext } from "../contexts/AuthContext";

const Profile = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const logout = async () => {
    setIsLoggedIn(false);

    await AsyncStorage.removeItem("userToken");
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button title={"Logout"} onPress={logout} />
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
});

export default Profile;

import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StyleSheet, SafeAreaView, Text, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { AuthContext } from "../contexts/AuthContext";

const Profile = ({ navigation }) => {
  const { setIsLoggedIn, user, setUser } = useContext(AuthContext);

  console.log(user);

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);

    await AsyncStorage.removeItem("userToken");
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>{user?.full_name}</Text>
      <Text>{user?.username}</Text>
      <Text>{user?.email}</Text>
      <Button title="Logout" onPress={logout} />
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

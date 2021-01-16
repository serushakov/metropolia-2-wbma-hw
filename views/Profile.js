import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StyleSheet, SafeAreaView, Text, Button } from "react-native";

import { AuthContext } from "../contexts/AuthContext";

const Profile = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

  const logout = () => {
    setIsLoggedIn(false);
    if (!isLoggedIn) {
      // this is to make sure isLoggedIn has changed, will be removed later
      navigation.navigate("Login");
    }
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

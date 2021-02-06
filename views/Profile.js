import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Button, Card } from "react-native-elements";

import { AuthContext } from "../contexts/AuthContext";
import { getImageUrl } from "../utils";
import { fetchMediaByTag } from "../api/media";

const Profile = ({ navigation }) => {
  const { user, setUser, setToken } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetchMediaByTag(`avatar_${user.user_id}`)
      .then((response) => {
        if (response.length === 0) throw Error("not found");
        setImage(response[0].filename);
      })
      .catch(() => {});
  }, [user]);

  const logout = async () => {
    setUser(null);
    setToken(null);

    await AsyncStorage.removeItem("userToken");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title>{user?.full_name}</Card.Title>
        {image && (
          <Card.Image
            style={styles.image}
            source={{ uri: getImageUrl(image) }}
          />
        )}
        <View style={styles.textContent}>
          <Text>Username: {user?.username}</Text>
          <Text>Email: {user?.email}</Text>
        </View>

        <Button title="Logout" onPress={logout} />
      </Card>
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
  card: {
    width: "90%",
  },
  image: {
    height: 300,
  },
  textContent: {
    marginVertical: 16,
  },
});

export default Profile;

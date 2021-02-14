import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import PropTypes from "prop-types";
import { Card } from "react-native-elements";
import { Video } from "expo-av";
import { getFileUrl } from "../utils";

const Single = ({
  route: {
    params: { item },
  },
}) => {
  console.log(getFileUrl(item.filename));
  const renderMedia = () => {
    switch (item.media_type) {
      case "image":
        return (
          <Card.Image
            width="100%"
            style={{
              resizeMode: "contain",
              width: "100%",
              height: 400,
            }}
            source={{ uri: getFileUrl(item.filename) }}
          />
        );
      case "video":
        return (
          <Video
            source={{ uri: getFileUrl(item.filename) }}
            useNativeControls
            style={{
              width: "100%",
              height: 400,
            }}
            onPlaybackStatusUpdate={console.log}
            resizeMode="contain"
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.card}>
        {renderMedia()}
        <Card.Title style={styles.title}>{item.title}</Card.Title>
        <Card.Divider />
        <Text>{item.description}</Text>
      </Card>
    </SafeAreaView>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  card: {
    width: "90%",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "left",
  },
});

export default Single;

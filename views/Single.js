import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import PropTypes from "prop-types";
import { Card } from "react-native-elements";
import { getImageUrl } from "../utils";

const Single = ({
  route: {
    params: { item },
  },
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Image
          width="100%"
          style={{
            resizeMode: "contain",
            width: "100%",
            height: 400,
          }}
          source={{ uri: getImageUrl(item.thumbnails.w640) }}
        />

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

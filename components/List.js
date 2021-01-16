import React from "react";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAllMedia } from "../hooks/ApiHooks";
import ListItem from "./ListItem";

const getImageUrl = (fileName) =>
  `http://media.mw.metropolia.fi/wbma/uploads/${fileName}`;

const List = ({ navigation }) => {
  const { data, error, loading } = useAllMedia();

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#000000"
        />
      )}
      <FlatList
        data={data}
        keyExtractor={(item) => item.file_id.toString()}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={getImageUrl(item.thumbnails.w160)}
            title={item.title}
            text={item.description}
            onPress={() => navigation.navigate("Single")}
          />
        )}
      />
      {error && (
        <View style={styles.error}>
          <Text style={styles.text}>Could not fetch data: {error}</Text>
        </View>
      )}
    </View>
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  activityIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,

    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    position: "relative",
  },
  error: {
    bottom: 32,
    padding: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: "black",
    marginHorizontal: 16,
  },

  text: {
    color: "white",
    textAlign: "center",
  },
});

export default List;

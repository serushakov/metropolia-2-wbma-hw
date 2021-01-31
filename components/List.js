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
import { Avatar, ListItem } from "react-native-elements";

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
          <ListItem bottomDivider onPress={() => navigation.navigate("Single")}>
            <Avatar
              size="large"
              source={{ uri: getImageUrl(item.thumbnails.w160) }}
            />

            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle numberOfLines="1">
                {item.description}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron size={24} />
          </ListItem>
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
    width: "100%",
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

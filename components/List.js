import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchAllMedia, fetchMediaById } from "../api/media";
import ListItem from "./ListItem";

const getImageUrl = (fileName) =>
  `http://media.mw.metropolia.fi/wbma/uploads/${fileName}`;

const List = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { files } = await fetchAllMedia();

        const results = await Promise.all(
          files.map(({ file_id: fileId }) => fetchMediaById(fileId))
        );

        setMediaArray(results);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
  }, []);

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
        data={mediaArray}
        keyExtractor={(item) => item.file_id.toString()}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={getImageUrl(item.thumbnails.w160)}
            title={item.title}
            text={item.description}
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

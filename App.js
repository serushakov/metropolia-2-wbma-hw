import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const mediaArray = [
  {
    key: "0",
    title: "Title 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.",
    thumbnails: {
      w160: "http://placekitten.com/160/161",
    },
    filename: "http://placekitten.com/2048/1920",
  },
  {
    key: "1",
    title: "Title 2",
    description:
      "Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ",
    thumbnails: {
      w160: "http://placekitten.com/160/164",
    },
    filename: "http://placekitten.com/2041/1922",
  },
  {
    key: "2",
    title: "Title 3",
    description:
      "Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ",
    thumbnails: {
      w160: "http://placekitten.com/160/167",
    },
    filename: "http://placekitten.com/2039/1920",
  },
];

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mediaArray}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <View style={styles.listItem}>
                <Image
                  style={styles.itemImage}
                  source={{ uri: item.thumbnails.w160 }}
                />
                <View style={styles.textContent}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    backgroundColor: "#c0c0c0",
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    overflow: "hidden",
  },
  textContent: {
    padding: 16,
    flexDirection: "column",
    flexShrink: 1,
    width: "60%",
  },
  description: {
    flexDirection: "column",
    flexShrink: 1,
    flexWrap: "wrap",
    fontSize: 13,
  },
  itemImage: {
    width: "40%",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  itemText: {
    flex: 1,
    flexShrink: 1,
  },
});

export default App;

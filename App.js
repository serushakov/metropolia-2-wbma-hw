import React from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import List from "./components/List";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={{
            uri:
              "https://thumbs.dreamstime.com/b/kitty-cat-adoption-white-background-54990090.jpg",
          }}
        />
        <Text style={styles.countText}>3 homeless cats</Text>
      </View>
      <List />

      <StatusBar backgroundColor="green" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 250,
    width: "100%",
    marginBottom: 16,
  },
  headerImage: {
    height: "100%",
    width: "100%",
  },
  countText: {
    position: "absolute",
    bottom: 16,
    end: 0,
    backgroundColor: "white",
    padding: 8,
    marginEnd: 16,
    borderRadius: 8,
    borderColor: "#acacac",
    borderWidth: 1,
  },
});

export default App;

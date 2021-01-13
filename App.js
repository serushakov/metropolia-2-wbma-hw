import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import List from "./components/List";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
      </ScrollView>
      <StatusBar />
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
    paddingEnd: 24,
    borderColor: "#acacac",
    borderWidth: 1,
  },
});

export default App;

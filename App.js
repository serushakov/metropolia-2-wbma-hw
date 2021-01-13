import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import List from "./components/List";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <List />
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
});

export default App;

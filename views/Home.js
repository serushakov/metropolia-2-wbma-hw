import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import List from "../components/List";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <List navigation={navigation} />
      <StatusBar />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;

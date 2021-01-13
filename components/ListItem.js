import React from "react";
import PropTypes from "prop-types";

import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const ListItem = ({ title, text, imageUrl }) => {
  return (
    <TouchableOpacity>
      <View style={styles.listItem}>
        <Image style={styles.itemImage} source={{ uri: imageUrl }} />
        <View style={styles.textContent}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.description}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,

    flexDirection: "row",

    borderWidth: 1,
    borderColor: "#acacac",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  textContent: {
    paddingStart: 16,
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
    width: 125,
    height: 125,
    borderRadius: 150,
    alignSelf: "center",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    color: "orange",
  },
  itemText: {
    flex: 1,
    flexShrink: 1,
  },
});
export default ListItem;

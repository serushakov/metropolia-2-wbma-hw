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
export default ListItem;

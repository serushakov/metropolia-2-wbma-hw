import React from "react";
import { StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";

const FormTextInput = ({ style, ...otherProps }) => {
  return <TextInput style={[styles.textInput, style]} {...otherProps} />;
};

FormTextInput.propTypes = {
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    width: "100%",
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default FormTextInput;

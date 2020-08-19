import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
export default function Number(props) {
  return (
    <Text style={{ ...styles.number, ...props.style }}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  number: {
    color: colors.primary,
    fontSize: 24,
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
    marginVertical: 10,
  },
});

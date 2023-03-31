import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "stretch",
    height: "auto",
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  description: {
    width: "30%",
    paddingTop: "10px",
    backgroundColor: "#bff0fd",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  qty: {
    width: "70%",
    paddingTop: "10px",
    backgroundColor: "white",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  // rate: {
  //     width: '15%',
  //     borderRightColor: borderColor,
  //     borderRightWidth: 1,
  // },
  // amount: {
  //     width: '15%'
  // },
});

const InvoiceTableHeader = ({ props }) => (
  <View style={styles.container}>
    <Text style={styles.description}>{props.key}</Text>
    <Text style={styles.qty}>{props.val}</Text>
    {/* <Text style={styles.rate}>@</Text>
        <Text style={styles.amount}>Amount</Text> */}
  </View>
);

export default InvoiceTableHeader;

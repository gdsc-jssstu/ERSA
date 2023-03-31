import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from "./InvoiceTableHeader";
import { useLocation } from "react-router-dom";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
});

export default function InvoiceItemsTable({ invoice }) {
  console.log(invoice);
  return (
    <View style={styles.tableContainer}>
      <InvoiceTableHeader props={{ key: "Zone", val: invoice.zone }} />
      <InvoiceTableHeader props={{ key: "AH Value", val: invoice.ahval }} />
      <InvoiceTableHeader
        props={{ key: "Soft Story", val: invoice.softStorey }}
      />
      <InvoiceTableHeader props={{ key: "Conclusion", val: invoice.message }} />
      {/* <InvoiceTableRow items={invoice.items} /> */}
      {/* <InvoiceTableBlankSpace rowsCount={ tableRowsCount - invoice.items.length} /> */}
      {/* <InvoiceTableFooter items={invoice.items} /> */}
    </View>
  );
}

//export default InvoiceItemsTable;

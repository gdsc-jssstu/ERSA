import React from "react";
import {
  View,
  PDFViewer,
  Page,
  Document,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";
import InvoiceTitle from "../components/report/InvoiceTitle";
import InvoiceNo from "../components/report/InvoiceNo";
import InvoiceItemsTable from "../components/report/InvoiceItemsTable";
import InvoiceThankYouMsg from "../components/report/InvoiceThankYouMsg";
import { useLocation } from "react-router-dom";

const styles = StyleSheet.create({
  document: {
    width: "100vw",
    height: "100vh",
  },
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 50,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
  description: {
    marginTop: "20px",
    textAlign: "center",
  },
});

export default function Invoice() {
  const location = useLocation();
  return (
    <PDFViewer style={styles.document}>
      <Document>
        <Page size="A4" style={styles.page}>
          <InvoiceTitle title="Earthquake Resilient Structure Analysis" />

          <InvoiceThankYouMsg />
          <InvoiceItemsTable
            invoice={{
              message: location.state.message,
              ahval: location.state.ahval,
              zone: location.state.zone,
              softStorey: location.state.softStorey,
            }}
          />
          {location.state.softStorey === "Yes" ? (
            <View
              style={{
                marginTop: 20,
                fontSize: "14px",
                flexDirection: "column",
              }}
            >
              <Text>
                Your building is prone to destability during tremors. You can
                consider these techniques to strengthen your structure:
              </Text>
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <Text style={{ marginTop: 10 }}>Global:</Text>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>Adding shear wall</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>Adding infill wall</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>Adding Bracing</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>Wall thickening</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>Base Isolation</Text>
                </View>

                <Text style={{ marginTop: 10 }}>Local:</Text>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>Jacketing of beams</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>Jacketing of columns</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>Jacketing of beam-column joints</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>Wall thickening</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>Strenghtening of individual flooring</Text>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                marginTop: 20,
                fontSize: "14px",
                flexDirection: "column",
              }}
            >
              <Text style={{ marginBottom: 4 }}>
                Your building is safe from destability during tremors. However,
                you can consider these safety measures during an event of
                earthquake:
              </Text>
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>
                    Move away from display shelves containing objects that may
                    fall.{" "}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>
                    Do not stand in a doorway. You are safer under a table.
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>
                    Do not run outside or to other rooms during an earthquake.
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>
                    If you are in the kitchen, quickly turn off the stove and
                    take cover at the first sign of shaking.
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>
                    If you are in bed, hold on and stay there, protecting your
                    head with a pillow.
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ marginHorizontal: 8 }}>•</Text>
                  <Text>Do not use the elevators. </Text>
                </View>
              </View>
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
}

//export default Invoice;

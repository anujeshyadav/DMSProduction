import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Rect,
} from "@react-pdf/renderer";
import { ToWords } from "to-words";
const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,

    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Rupee",
      plural: "Rupees",
      symbol: "₹",
      fractionalUnit: {
        name: "Paisa",
        plural: "Paise",
        symbol: "",
      },
    },
  },
});
const InvoiceCharges = ({ invoiceData }) => {
  debugger;
  return (
    <>
      <View
        style={{
          width: "45%",
          height: "120px",
        }}>
        <View style={{ height: "120px" }}>
          <View
            style={{
              padding: "10px",

              height: "120px",
            }}>
            <View
              style={{
                flexDirection: "row",
                gap: "10px",
                paddingBottom: "3px",
                justifyContent: "space-between",
              }}>
              <Text
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginBottom: "6px",
                }}>
                Sub Total
              </Text>{" "}
              <Text
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginBottom: "6px",
                }}>
                {invoiceData?.amount && <>{(invoiceData?.amount).toFixed(2)}</>}
              </Text>
            </View>
            {invoiceData?.discountDetails?.length > 0 && (
              <>
                {invoiceData?.discountDetails?.map((ele, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      gap: "10px",
                      paddingBottom: "3px",
                      justifyContent: "space-between",
                    }}>
                    <Text
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",

                        marginBottom: "6px",
                      }}>
                      {ele?.title}({ele?.percentage}%)
                    </Text>{" "}
                    <Text
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",

                        marginBottom: "6px",
                      }}>
                      - {ele?.discountedValue}
                    </Text>
                  </View>
                ))}
              </>
            )}
            {invoiceData?.chargesDetails?.length > 0 && (
              <>
                {invoiceData?.chargesDetails?.map((ele, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      gap: "10px",
                      paddingBottom: "3px",
                      justifyContent: "space-between",
                    }}>
                    <Text
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",

                        marginBottom: "6px",
                      }}>
                      {ele?.title}({ele?.percentage}%)
                    </Text>{" "}
                    <Text
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",

                        marginBottom: "6px",
                      }}>
                      +{ele?.chargedAmount}
                    </Text>
                  </View>
                ))}
              </>
            )}

            {invoiceData?.igstTaxType == 1 ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    gap: "10px",
                    paddingBottom: "3px",
                    justifyContent: "space-between",
                  }}>
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      // width: "70%",
                      marginBottom: "6px",
                    }}>
                    IGST
                  </Text>
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",

                      marginBottom: "6px",
                    }}>
                    {invoiceData?.igstTotal}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    gap: "10px",
                    paddingBottom: "3px",
                    justifyContent: "space-between",
                  }}>
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",

                      marginBottom: "6px",
                    }}>
                    CGST
                  </Text>{" "}
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",

                      marginBottom: "6px",
                    }}>
                    {invoiceData?.cgstTotal}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: "10px",
                    paddingBottom: "3px",
                    justifyContent: "space-between",
                  }}>
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",

                      marginBottom: "6px",
                    }}>
                    SGST
                  </Text>
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",

                      marginBottom: "6px",
                    }}>
                    {invoiceData?.sgstTotal}
                  </Text>
                </View>
              </>
            )}
            <View
              style={{
                flexDirection: "row",
                gap: "10px",
                borderBottom: "1px solid black",
                paddingBottom: "3px",
                justifyContent: "space-between",
              }}>
              <Text
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",

                  marginBottom: "6px",
                }}>
                RoundOff
              </Text>{" "}
              <Text
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",

                  marginBottom: "6px",
                }}>
                {/* {/ {AllCharges?.delivery_charges}.00 /} */}
                {invoiceData?.roundOff && invoiceData?.roundOff}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: "10px",
                paddingBottom: "3px",
                justifyContent: "space-between",
              }}>
              <Text
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",

                  marginBottom: "6px",
                }}>
                {/* Other Charges */}
              </Text>{" "}
              <Text
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",

                  marginBottom: "6px",
                }}></Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: "10px",
                paddingBottom: "3px",
                justifyContent: "space-between",
              }}>
              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginTop: "2px",
                }}>
                Grand Total :
              </Text>{" "}
              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginTop: "2px",
                }}>
                {/* {/ {grandTotal} /} */}
                {invoiceData?.grandTotal}
              </Text>
            </View>
          </View>
        </View>
        <View></View>
      </View>
    </>
  );
};

export default InvoiceCharges;

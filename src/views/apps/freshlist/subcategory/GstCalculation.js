import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Rect,
} from "@react-pdf/renderer";

const GstCalculation = ({ invoiceData }) => {
  return (
    <>
      <View>
        <View
          style={{
            backgroundColor: "",

            // display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "32%",
              borderRight: "1px solid black",
              borderLeft: "1px solid black",
              borderBottom: "1px solid black",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              height: "30px",
            }}
          >
            <Text style={{ fontSize: "10px" }}>HSN/SAC</Text>
          </View>
          <View
            style={{
              width: "15%",
              borderRight: "1px solid black",
              alignItems: "center",
              alignContent: "center",
              borderBottom: "1px solid black",
              justifyContent: "center",
              height: "30px",
            }}
          >
            <Text style={{ fontSize: "10px" }}>
              Taxable
              <br /> value
            </Text>
          </View>
          {invoiceData && invoiceData?.igstTaxType == 1 ? (
            <>
              <View
                style={{
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  height: "15px",
                }}
              >
                <Text style={{ fontSize: "10px" }}>Integrated Tax</Text>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "39%",
                      marginTop: "10px",
                      borderBottom: "1px solid black",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderRight: "1px solid black",
                      height: "16px",
                    }}
                  >
                    <Text style={{ fontSize: "10px" }}>Rate</Text>
                  </View>
                  <View
                    style={{
                      width: "62%",
                      borderBottom: "1px solid black",
                      marginTop: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderRight: "1px solid black",
                      height: "16px",
                    }}
                  >
                    <Text style={{ fontSize: "10px" }}>Amount</Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  width: "20%",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  height: "15px",
                }}
              >
                <Text style={{ fontSize: "10px" }}>Central Tax</Text>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      marginTop: "10px",
                      borderBottom: "1px solid black",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderRight: "1px solid black",
                      height: "16px",
                    }}
                  >
                    <Text style={{ fontSize: "10px" }}>Rate</Text>
                  </View>
                  <View
                    style={{
                      width: "62%",
                      borderBottom: "1px solid black",
                      marginTop: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderRight: "1px solid black",
                      height: "16px",
                    }}
                  >
                    <Text style={{ fontSize: "10px" }}>Amount</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "20%",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  height: "15px",
                }}
              >
                <Text style={{ fontSize: "10px" }}>State Tax</Text>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      marginTop: "10px",
                      borderBottom: "1px solid black",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderRight: "1px solid black",
                      height: "16px",
                    }}
                  >
                    <Text style={{ fontSize: "10px" }}>Rate</Text>
                  </View>
                  <View
                    style={{
                      width: "62%",
                      borderBottom: "1px solid black",
                      marginTop: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderRight: "1px solid black",
                      height: "16px",
                    }}
                  >
                    <Text style={{ fontSize: "10px" }}>Amount</Text>
                  </View>
                </View>
              </View>
            </>
          )}

          <View
            style={{
              width: "13%",
              justifyContent: "center",
              borderRight: "1px solid black",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              borderBottom: "1px solid black",
              height: "30px",
            }}
          >
            <Text style={{ fontSize: "10px" }}>
              Total
              <br /> Tax Amount
            </Text>
          </View>
        </View>
        {invoiceData?.gstDetails?.length > 0 &&
          invoiceData?.gstDetails?.map((ele, i) => {
            return (
              <>
                <View
                  key={i}
                  style={{
                    backgroundColor: "",

                    // display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "32%",
                      borderRight: "1px solid black",
                      borderLeft: "1px solid black",
                      borderBottom: "1px solid black",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      height: "17px",
                    }}
                  >
                    <Text style={{ fontSize: "10px" }}>{ele?.hsn}</Text>
                  </View>
                  <View
                    style={{
                      width: "15%",
                      borderRight: "1px solid black",
                      alignItems: "center",
                      alignContent: "center",
                      borderBottom: "1px solid black",
                      justifyContent: "center",
                      height: "17px",
                    }}
                  >
                    <Text style={{ fontSize: "10px" }}>
                      {(ele?.taxable).toFixed(2)}
                    </Text>
                  </View>
                  {/* for dynamic below */}
                  {invoiceData && invoiceData?.igstTaxType == 1 ? (
                    <>
                      {ele?.igstTax &&
                        ele?.igstTax?.map((val, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                width: "40%",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                borderRight: "1px solid black",
                                borderBottom: "1px solid black",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                }}
                              >
                                <View
                                  style={{
                                    width: "40%",

                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    borderRight: "1px solid black",
                                    height: "16px",
                                  }}
                                >
                                  <Text style={{ fontSize: "10px" }}>
                                    {val?.rate} %
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    width: "62%",

                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    height: "16px",
                                  }}
                                >
                                  <Text style={{ fontSize: "10px" }}>
                                    {val?.amount?.toFixed(2)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {ele?.centralTax &&
                        ele?.centralTax?.map((val, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                width: "20%",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                borderRight: "1px solid black",
                                borderBottom: "1px solid black",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                }}
                              >
                                <View
                                  style={{
                                    width: "38%",

                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    borderRight: "1px solid black",
                                    height: "16px",
                                  }}
                                >
                                  <Text style={{ fontSize: "10px" }}>
                                    {val?.rate} %
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    width: "62%",

                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    borderRight: "1px solid black",
                                    height: "16px",
                                  }}
                                >
                                  <Text style={{ fontSize: "10px" }}>
                                    {val?.amount?.toFixed(2)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                      {ele?.stateTax &&
                        ele?.stateTax?.map((val, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                width: "20%",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                borderRight: "1px solid black",
                                borderBottom: "1px solid black",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                }}
                              >
                                <View
                                  style={{
                                    width: "40%",

                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    borderRight: "1px solid black",
                                    height: "16px",
                                  }}
                                >
                                  <Text style={{ fontSize: "10px" }}>
                                    {val?.rate} %
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    width: "62%",

                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    borderRight: "1px solid black",
                                    height: "16px",
                                  }}
                                >
                                  <Text style={{ fontSize: "10px" }}>
                                    {val?.amount?.toFixed(2)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                    </>
                  )}

                  <View
                    style={{
                      width: "13%",
                      justifyContent: "center",
                      borderRight: "1px solid black",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderBottom: "1px solid black",
                    }}
                  >
                    <Text style={{ fontSize: "10px" }}>
                      {ele?.withDiscountAmount?.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </>
            );
          })}
        {invoiceData?.gstOtherCharges?.length > 0 &&
          invoiceData?.gstOtherCharges?.map((ele, i) => {
            return (
              <>
                <View
                  key={i}
                  style={{
                    backgroundColor: "",

                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "32%",
                      borderRight: "1px solid black",
                      borderLeft: "1px solid black",
                      borderBottom: "1px solid black",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      height: "17px",
                    }}
                  >
                    <Text style={{ fontSize: "10px" }}>Other Charges</Text>
                  </View>
                  <View
                    style={{
                      width: "15%",
                      borderRight: "1px solid black",
                      alignItems: "center",
                      alignContent: "center",
                      borderBottom: "1px solid black",
                      justifyContent: "center",
                      height: "17px",
                    }}
                  >
                    <Text style={{ fontSize: "10px" }}>
                      {(ele?.taxable).toFixed(2)}
                    </Text>
                  </View>
                  {/* for dynamic below */}
                  {invoiceData && invoiceData?.igstTaxType == 1 ? (
                    <>
                      {ele?.igstTax &&
                        ele?.igstTax?.map((val, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                width: "40%",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                borderRight: "1px solid black",
                                borderBottom: "1px solid black",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                }}
                              >
                                <View
                                  style={{
                                    width: "40%",

                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    borderRight: "1px solid black",
                                    height: "16px",
                                  }}
                                >
                                  <Text style={{ fontSize: "10px" }}>
                                    {val?.rate} %
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    width: "62%",

                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    height: "16px",
                                  }}
                                >
                                  <Text style={{ fontSize: "10px" }}>
                                    {val?.amount?.toFixed(2)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {ele?.centralTax &&
                        ele?.centralTax?.map((val, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                width: "20%",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                borderRight: "1px solid black",
                                borderBottom: "1px solid black",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                }}
                              >
                                <View
                                  style={{
                                    width: "40%",

                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    borderRight: "1px solid black",
                                    height: "16px",
                                  }}
                                >
                                  <Text style={{ fontSize: "10px" }}>
                                    {val?.rate} %
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    width: "62%",

                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    borderRight: "1px solid black",
                                    height: "16px",
                                  }}
                                >
                                  <Text style={{ fontSize: "10px" }}>
                                    {val?.amount?.toFixed(2)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                      {ele?.stateTax &&
                        ele?.stateTax?.map((val, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                width: "20%",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                borderRight: "1px solid black",
                                borderBottom: "1px solid black",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                }}
                              >
                                <View
                                  style={{
                                    width: "40%",

                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    borderRight: "1px solid black",
                                    height: "16px",
                                  }}
                                >
                                  <Text style={{ fontSize: "10px" }}>
                                    {val?.rate} %
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    width: "62%",

                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    borderRight: "1px solid black",
                                    height: "16px",
                                  }}
                                >
                                  <Text style={{ fontSize: "10px" }}>
                                    {val?.amount?.toFixed(2)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                    </>
                  )}

                  <View
                    style={{
                      width: "13%",
                      justifyContent: "center",
                      borderRight: "1px solid black",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderBottom: "1px solid black",
                    }}
                  >
                    <Text style={{ fontSize: "10px" }}>
                      {(ele?.withoutTaxablePrice).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </>
            );
          })}
        <View
          style={{
            backgroundColor: "",

            // display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "32%",
              borderRight: "1px solid black",
              borderLeft: "1px solid black",
              borderBottom: "1px solid black",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              height: "17px",
            }}
          >
            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>Total</Text>
          </View>
          <View
            style={{
              width: "15%",
              borderRight: "1px solid black",
              alignItems: "center",
              alignContent: "center",
              borderBottom: "1px solid black",
              justifyContent: "center",
              height: "17px",
            }}
          >
            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
              {invoiceData?.amount && <>{(invoiceData?.amount).toFixed(2)}</>}
            </Text>
          </View>
          {/* for dynamic below */}
          {invoiceData && invoiceData?.igstTaxType == 1 ? (
            <>
              <View
                style={{
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "39%",

                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderRight: "1px solid black",
                      height: "16px",
                    }}
                  >
                    <Text
                      style={{ fontSize: "10px", fontWeight: "bold" }}
                    ></Text>
                  </View>
                  <View
                    style={{
                      width: "60%",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      height: "16px",
                    }}
                  >
                    <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                      {invoiceData?.igstTotal}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  width: "20%",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "40%",

                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderRight: "1px solid black",
                      height: "16px",
                    }}
                  >
                    <Text
                      style={{ fontSize: "10px", fontWeight: "bold" }}
                    ></Text>
                  </View>
                  <View
                    style={{
                      width: "62%",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderRight: "1px solid black",
                      height: "16px",
                    }}
                  >
                    <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                      {invoiceData?.cgstTotal}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "20%",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "40%",

                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderRight: "1px solid black",
                      height: "16px",
                    }}
                  >
                    <Text
                      style={{ fontSize: "10px", fontWeight: "bold" }}
                    ></Text>
                  </View>
                  <View
                    style={{
                      width: "62%",

                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderRight: "1px solid black",
                      height: "16px",
                    }}
                  >
                    <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                      {invoiceData?.sgstTotal}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}

          <View
            style={{
              width: "13%",
              justifyContent: "center",
              borderRight: "1px solid black",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              borderBottom: "1px solid black",
            }}
          >
            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
              {invoiceData?.grandTotal}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default GstCalculation;

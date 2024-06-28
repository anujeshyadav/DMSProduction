// import React, { useEffect, useState, useContext } from "react";

// import {
//   Card,
//   CardBody,
//   Col,
//   Form,
//   Row,
//   Input,
//   Label,
//   Button,
//   FormGroup,
// } from "reactstrap";
// import "react-phone-input-2/lib/style.css";

// import { useParams, useLocation } from "react-router-dom";
// import "../../../../assets/scss/pages/users.scss";
// import { SalesEditOrder, _Get } from "../../../../ApiEndPoint/ApiCalling";
// import "../../../../assets/scss/pages/users.scss";
// import { Route } from "react-router-dom";
// import swal from "sweetalert";
// import UserContext from "../../../../context/Context";
// import { GstCalculation } from "./GstCalculation";
// import { useHistory } from "react-router-dom";
// import { view_create_order_historyBy_id } from "../../../../ApiEndPoint/Api";

// let GrandTotal = [];

// const EditOrder = (args) => {
//   const Context = useContext(UserContext);
//   const [CustomerLimit, setCustomerLimit] = useState(0);
//   const [Index, setIndex] = useState(-1);
//   const [Party, setParty] = useState({});
//   const [error, setError] = useState("");
//   const [PartyList, setPartyList] = useState([]);
//   const [grandTotalAmt, setGrandTotalAmt] = useState(0);
//   const [Editdata, setEditdata] = useState({});
//   const [UserInfo, setUserInfo] = useState({});
//   const [GSTData, setGSTData] = useState({});

//   const [userName, setUserName] = useState("");
//   const Params = useParams();
//   const location = useLocation();
//   let History = useHistory();

//   const [product, setProduct] = useState([
//     {
//       productId: "",
//       productData: "",
//       discountPercentage: "",
//       availableQty: "",
//       qty: 1,
//       Size: "",
//       price: "",
//       unitType: "",
//       product: "",
//       grandTotal: "",
//       totalprice: "",
//       unitPriceAfterDiscount: "",
//       totalprice: "",
//       taxableAmount: "",
//       gstPercentage: "",
//       sgstRate: "",
//       cgstRate: "",
//       igstRate: "",
//     },
//   ]);
//   const handleChange = (e) => {
//     console.log(e.target.value);
//     setUserName(e.target.value);
//   };
//   const handleProductChangeProduct = (e, index) => {
//     setIndex(index);
//     let list = product;

//     const { name, value } = e.target;
//     let orderitem = product?.orderItems;
//     list.orderItems[index][name] = Number(value);
//     let amt = 0;
//     if (list?.orderItems?.length > 0) {
//       const x = list?.orderItems?.map((val, i) => {
//         list.orderItems[i]["productData"] = val?.productId;
//         return val.Size * val.qty * val.price;
//       });
//       amt = x.reduce((a, b) => a + b);
//     }

//     const gstdetails = GstCalculation(Party, list.orderItems, Context);
//     setGSTData(gstdetails);

//     list.orderItems[index]["taxableAmount"] =
//       gstdetails?.gstDetails[index]?.taxable;
//     list.orderItems[index]["sgstRate"] =
//       gstdetails?.gstDetails[index]?.sgstRate;
//     list.orderItems[index]["cgstRate"] =
//       gstdetails?.gstDetails[index]?.cgstRate;
//     list.orderItems[index]["igstRate"] =
//       gstdetails?.gstDetails[index]?.igstRate;
//     list.orderItems[index]["grandTotal"] =
//       gstdetails?.gstDetails[index]?.grandTotal;
//     list.orderItems[index]["gstPercentage"] =
//       gstdetails?.gstDetails[index]?.gstPercentage;
//     list.orderItems[index]["discountPercentage"] =
//       gstdetails?.gstDetails[index]?.discountPercentage;
//     console.log(list);
//     setProduct(list);
//     setGrandTotalAmt(amt);
//   };

//   useEffect(() => {
//     let userdata = JSON.parse(localStorage.getItem("userData"));

//     (async () => {
//       console.log(Params?.id);
//       await _Get(view_create_order_historyBy_id, Params?.id)
//         .then((res) => {
//           // console.log(res?.orderHistory);

//           let data = res?.orderHistory;
//           let URL = "order/check-party-limit/";
//           _Get(URL, res?.orderHistory?.partyId?._id)
//             .then((res) => {
//               setCustomerLimit(Number(res?.CustomerLimit));
//               // swal(`${res?.message}`);
//               console.log(res?.CustomerLimit);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//           setProduct(data);
//           setEditdata(data);
//           setProduct(data);
//           let value = data;
//           setParty(value?.partyId);
//           let Tax = {
//             Amount: value?.amount,
//             CgstTotal: value?.cgstTotal,
//             GrandTotal: value?.grandTotal,
//             IgstTaxType: value?.igstTaxType == 1 ? 1 : 0,
//             IgstTotal: value?.igstTotal,
//             RoundOff: value?.roundOff,
//             SgstTotal: value?.sgstTotal,
//           };
//           let payload = {
//             Tax: Tax,
//           };
//           setGSTData(payload);
//           setUserName(data.fullName);
//           setEditdata(data);
//           setGrandTotalAmt(data?.grandTotal);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })();

//     // CreateCustomerList(userdata?._id, userdata?.database)
//     //   .then((res) => {
//     //     let value = res?.Customer;

//     //     let partyId = location?.state?.partyId._id;
//     //     let selectedParty = value?.filter((ele) => ele?._id == partyId);
//     //     setParty(selectedParty[0]);
//     //     if (value?.length) {
//     //       setPartyList(value);
//     //     }
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });
//     // setProduct(data);
//     // let value = location?.state;
//     // let Tax = {
//     //   Amount: value?.amount,
//     //   CgstTotal: value?.cgstTotal,
//     //   GrandTotal: value?.grandTotal,
//     //   IgstTaxType: value?.igstTaxType == 1 ? true : false,
//     //   IgstTotal: value?.igstTotal,
//     //   RoundOff: value?.roundOff,
//     //   SgstTotal: value?.sgstTotal,
//     // };
//     // let payload = {
//     //   Tax: Tax,
//     // };
//     // setGSTData(payload);
//     // setUserName(location?.state.fullName);
//     // setEditdata(location?.state);
//     // setGrandTotalAmt(location?.state?.grandTotal);
//   }, []);

//   // useEffect(() => {
//   // setProduct(location?.state);
//   // setEditdata(location?.state);
//   // }, [product]);

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userData"));
//     setUserInfo(userInfo);
//   }, []);

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (GSTData?.Tax?.GrandTotal < CustomerLimit) {
//       const gstdetails = GstCalculation(Party, product?.orderItems, Context);
//       let Product = product?.orderItems?.map((ele) => {
//         if (ele?.discountPercentage > 1) {
//           return {
//             productId: ele?.productId?._id,
//             discountPercentage: ele?.discountPercentage,
//             qty: ele?.qty,
//             price: ele?.price,
//             Size: ele?.Size,
//             totalPrice: ele?.totalPrice,
//             unitQty: ele?.Size,
//             sgstRate: ele?.sgstRate,
//             cgstRate: ele?.cgstRate,
//             gstPercentage: ele?.gstPercentage,
//             igstRate: ele?.igstRate,
//             grandTotal: ele?.grandTotal,
//             taxableAmount: ele?.taxableAmount,
//             unitType: ele?.unitType,
//             totalPriceWithDiscount: Number(
//               (
//                 (ele?.totalPrice * (100 - ele?.discountPercentage)) /
//                 100
//               ).toFixed(2)
//             ),
//           };
//         } else {
//           return {
//             productId: ele?.productId?._id,
//             // productData: ele?.productData,
//             discountPercentage: ele?.discountPercentage,
//             // availableQty: ele?.availableQty,
//             qty: ele?.qty,
//             price: ele?.price,
//             Size: ele?.Size,
//             totalPrice: ele?.totalPrice,
//             sgstRate: ele?.sgstRate,
//             cgstRate: ele?.cgstRate,
//             gstPercentage: ele?.gstPercentage,
//             igstRate: ele?.igstRate,
//             grandTotal: ele?.grandTotal,
//             taxableAmount: ele?.taxableAmount,
//             unitQty: ele?.Size,
//             unitType: ele?.unitType,
//             totalPriceWithDiscount: ele?.totalPrice,
//           };
//         }
//       });
//       const fullname = Party?.firstName + " " + Party?.lastName;
//       const payload = {
//         // userId: UserInfo?._id,
//         database: UserInfo?.database,
//         partyId: Party?._id,
//         discountPercentage: Party?.Category ? Party?.Category?.discount : 0,
//         SuperAdmin: Context?.CompanyDetails?.created_by,
//         fullName: fullname,
//         address: Party?.address,
//         grandTotal: Number((gstdetails?.Tax?.GrandTotal).toFixed(2)),
//         roundOff: Number(
//           (gstdetails?.Tax?.GrandTotal - gstdetails?.Tax?.RoundOff).toFixed(2)
//         ),
//         amount: Number((gstdetails?.Tax?.Amount).toFixed(2)),
//         sgstTotal: gstdetails?.Tax?.CgstTotal,
//         igstTaxType: gstdetails?.Tax?.IgstTaxType,
//         cgstTotal: gstdetails?.Tax?.CgstTotal,
//         igstTotal: gstdetails?.Tax?.IgstTotal,
//         gstDetails: gstdetails?.gstDetails,
//         MobileNo: Party?.contactNumber,
//         pincode: Party?.pincode,
//         state: Party?.State,
//         city: Party?.City,
//         orderItems: Product,
//         // DateofDelivery: dateofDelivery,
//       };
//       if (error) {
//         swal("Error occured while Entering Details");
//       } else {
//         SalesEditOrder(payload, product?._id)
//           .then((res) => {
//             console.log(res);
//             History.goBack();
//             swal("Order Edited Successfully");
//           })
//           .catch((err) => {
//             console.log(err);
//             swal("Order Not Edited");
//           });
//       }
//     }
//   };

//   return (
//     <div>
//       <div>
//         <Card>
//           <Row className="m-2">
//             <Col className="">
//               <div>
//                 <h1 className="">Edit Order</h1>
//               </div>
//             </Col>
//             <Col>
//               <div className="float-right">
//                 <Route
//                   render={({ history }) => (
//                     <Button
//                       style={{ cursor: "pointer" }}
//                       className="float-right mr-1"
//                       color="primary"
//                       size="sm"
//                       onClick={() => history.goBack()}>
//                       Back
//                     </Button>
//                   )}
//                 />
//               </div>
//             </Col>
//           </Row>

//           <CardBody>
//             <Form className="m-1" onSubmit={submitHandler}>
//               <Col className="mb-1" lg="4" md="4" sm="12">
//                 <h3 className="mb-3">Party Name : {userName}</h3>
//               </Col>

//               {product &&
//                 product?.orderItems?.map((product, index) => {
//                   return (
//                     <Row className="" key={index}>
//                       <Col className="mb-1">
//                         <div className="">
//                           <Label>Product Name</Label>

//                           <Input
//                             type="text"
//                             placeholder="ProductName"
//                             name="Product_Title"
//                             readOnly
//                             value={product?.productId?.Product_Title}
//                             onChange={(e) =>
//                               handleProductChangeProduct(e, index)
//                             }
//                           />
//                         </div>
//                       </Col>
//                       <Col>
//                         <FormGroup>
//                           <Label>HSN Code</Label>
//                           <Input
//                             type="text"
//                             placeholder="HSTCode"
//                             name="HSN_Code"
//                             value={product?.productId?.HSN_Code}
//                             // onChange={e => handleProductChangeProduct(e, index)}
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col>
//                         <FormGroup>
//                           <Label>Qty</Label>
//                           <Input
//                             min={0}
//                             type="number"
//                             placeholder="Size"
//                             name="qty"
//                             value={product?.qty}
//                             onChange={(e) =>
//                               handleProductChangeProduct(e, index)
//                             }
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col>
//                         <FormGroup>
//                           <Label>unitType</Label>
//                           <Input
//                             type="text"
//                             placeholder={product?.unitType}
//                             name="qty"
//                             value={product?.unitType}
//                             // onChange={(e) =>
//                             //   handleProductChangeProduct(e, index)
//                             // }
//                           />
//                         </FormGroup>
//                       </Col>

//                       <Col>
//                         <FormGroup>
//                           <Label>Price</Label>
//                           <Input
//                             type="number"
//                             readOnly
//                             placeholder="Price"
//                             name="Price"
//                             value={product?.price}
//                           />
//                         </FormGroup>
//                       </Col>
//                       {/* <Col className="mb-1">
//                         <div className="">
//                           <Label>Available Size</Label>
//                           <Input
//                             type="number"
//                             disabled
//                             name="availableQty"
//                             placeholder="AvailableSize"
//                             value={product?.availableQty}
//                           />
//                         </div>
//                       </Col> */}

//                       <Col className="mb-1">
//                         <div className="">
//                           <Label>Dis(%)</Label>
//                           <Input
//                             type="text"
//                             name="discountPercentage"
//                             disabled
//                             placeholder="Discount Percentage"
//                             value={product?.discountPercentage}
//                           />
//                         </div>
//                       </Col>

//                       {/* <Col>
//                         <FormGroup>
//                           <Label>GST Rate</Label>
//                           <Input
//                           readOnly
//                             type="text"
//                             placeholder="GST Rate"
//                             name="gstPercentage"
//                             value={product?.gstPercentage}
//                             // onChange={e => handleProductChangeProduct(e, index)}
//                           />
//                         </FormGroup>
//                       </Col> */}
//                       <Col className="mb-1">
//                         <div className="">
//                           <Label>GST %</Label>
//                           <Input
//                             type="text"
//                             name="gstPercentage"
//                             disabled
//                             placeholder="GST Percentage %"
//                             value={product.gstPercentage}
//                           />
//                         </div>
//                       </Col>

//                       <Col className="mb-1">
//                         <div className="">
//                           <Label>Taxable</Label>
//                           <Input
//                             type="number"
//                             name="taxableAmount"
//                             disabled
//                             placeholder="Price"
//                             value={product.taxableAmount}
//                           />
//                         </div>
//                       </Col>
//                       {GSTData?.Tax?.IgstTaxType == 1 ? (
//                         <>
//                           <Col className="mb-1">
//                             <div className="">
//                               <Label>IGST</Label>
//                               <Input
//                                 type="number"
//                                 name="igstRate"
//                                 readOnly
//                                 placeholder="igstRate"
//                                 value={product.igstRate}
//                               />
//                             </div>
//                           </Col>
//                         </>
//                       ) : (
//                         <>
//                           <Col className="mb-1">
//                             <div className="">
//                               <Label>SGST</Label>
//                               <Input
//                                 type="number"
//                                 name="sgstRate"
//                                 readOnly
//                                 placeholder="sgstRate"
//                                 value={product.sgstRate}
//                               />
//                             </div>
//                           </Col>
//                           <Col className="mb-1">
//                             <div className="">
//                               <Label>CGST</Label>
//                               <Input
//                                 type="number"
//                                 name="cgstRate"
//                                 readOnly
//                                 placeholder="cgstRate"
//                                 value={product.cgstRate}
//                               />
//                             </div>
//                           </Col>
//                         </>
//                       )}
//                       {/* <Col className="mb-1">
//                         <div className="">
//                           <Label>Total Price</Label>
//                           <Input
//                             type="number"
//                             name="grandTotal"
//                             readOnly
//                             placeholder="TtlPrice"
//                             value={product.grandTotal}
//                           />
//                         </div>
//                       </Col> */}
//                     </Row>
//                   );
//                 })}
//               <Row></Row>
//               <Row className="mt-5">
//                 <Col lg="4" md="4" sm="4"></Col>
//                 <Col lg="4" md="4" sm="4">
//                   <div className="d-flex justify-content-center">
//                     <Button.Ripple
//                       color="primary"
//                       type="submit"
//                       className="mt-2">
//                       Submit
//                     </Button.Ripple>
//                   </div>
//                 </Col>
//                 <Col className="mb-1" lg="4" md="4" sm="4">
//                   <div className=" d-flex justify-content-end">
//                     <ul className="subtotal">
//                       <li>
//                         <Label className="pr-5">
//                           Total:
//                           <span className="p-2">
//                             {!!GSTData?.Tax?.Amount && GSTData?.Tax?.Amount
//                               ? (GSTData?.Tax?.Amount).toFixed(2)
//                               : 0}
//                           </span>
//                         </Label>
//                       </li>
//                       {GSTData?.Tax?.IgstTaxType == 1 &&
//                       GSTData?.Tax?.IgstTaxType == 1 ? (
//                         <li>
//                           <Label className="">
//                             IGST Tax:{" "}
//                             <strong>
//                               RS{" "}
//                               {!!GSTData?.Tax?.IgstTotal &&
//                               GSTData?.Tax?.IgstTotal
//                                 ? (GSTData?.Tax?.IgstTotal).toFixed(2)
//                                 : 0}
//                             </strong>
//                           </Label>
//                         </li>
//                       ) : (
//                         <>
//                           <li>
//                             <Label className="">
//                               SGST Tax:{" "}
//                               <strong>
//                                 RS{" "}
//                                 {!!GSTData?.Tax?.SgstTotal &&
//                                 GSTData?.Tax?.SgstTotal
//                                   ? (GSTData?.Tax?.SgstTotal).toFixed(2)
//                                   : 0}
//                               </strong>
//                             </Label>
//                           </li>
//                           <li>
//                             <Label className="">
//                               CGST Tax:{" "}
//                               <strong>
//                                 RS{" "}
//                                 {!!GSTData?.Tax?.CgstTotal &&
//                                 GSTData?.Tax?.CgstTotal
//                                   ? (GSTData?.Tax?.CgstTotal).toFixed(2)
//                                   : 0}
//                               </strong>
//                             </Label>
//                           </li>
//                         </>
//                       )}

//                       <li>
//                         {" "}
//                         <Label className="pr-5">
//                           Grand Total :{" "}
//                           <strong>
//                             RS{" "}
//                             {!!GSTData?.Tax?.GrandTotal
//                               ? (GSTData?.Tax?.GrandTotal).toFixed(2)
//                               : 0}
//                           </strong>
//                         </Label>
//                       </li>
//                     </ul>
//                   </div>
//                 </Col>
//               </Row>
//             </Form>
//           </CardBody>
//         </Card>
//       </div>
//     </div>
//   );
// };
// export default EditOrder;

// // import React, { useEffect, useState, useContext } from "react";
// // import { Route, useHistory, useParams, useLocation } from "react-router-dom";
// // import { history } from "../../../../history";

// // import {
// //   Card,
// //   CardBody,
// //   Col,
// //   Form,
// //   Row,
// //   Input,
// //   Label,
// //   Button,
// //   CustomInput,
// //   Table,
// // } from "reactstrap";
// // import "react-phone-input-2/lib/style.css";
// // import Multiselect from "multiselect-react-dropdown";
// // import "../../../../assets/scss/pages/users.scss";
// // import { SalesEditOrder, _Get } from "../../../../ApiEndPoint/ApiCalling";
// // import {
// //   SaveOrder,
// //   ProductListView,
// //   UnitListView,
// //   CreateCustomerList,
// // } from "../../../../ApiEndPoint/ApiCalling";
// // import "../../../../assets/scss/pages/users.scss";
// // import { WareHouse_Current_Stock } from "../../../../ApiEndPoint/Api";
// // import UserContext from "../../../../context/Context";
// // import { GstCalculation } from "./GstCalculation";
// // import swal from "sweetalert";
// // import { view_create_order_historyBy_id } from "../../../../ApiEndPoint/Api";

// // let GrandTotal = [];
// // let SelectedITems = [];
// // let SelectedSize = [];
// // let geotagging = "";

// // const EditOrder = (args) => {
// //   const [Index, setIndex] = useState("");
// //   const [CustomerLimit, setCustomerLimit] = useState(0);
// //   const [PartyLogin, setPartyLogin] = useState(false);
// //   const [Loading, setLoading] = useState(false);

// //   const [ProductList, setProductList] = useState([]);
// //   const [GSTData, setGSTData] = useState({});
// //   const [PartyList, setPartyList] = useState([]);
// //   const [PartyId, setPartyId] = useState("");
// //   const [Party, setParty] = useState({});
// //   const [UnitList, setUnitList] = useState([]);
// //   const [Editdata, setEditdata] = useState({});
// //   const [UserInfo, setUserInfo] = useState({});

// //   const [dateofDelivery, setDateofDelivery] = useState("");
// //   const [product, setProduct] = useState([
// //     {
// //       productId: "",
// //       productData: "",
// //       discountPercentage: 0,
// //       availableQty: 0,
// //       qty: 0,
// //       price: 0,
// //       Size: 0,
// //       unitType: "",
// //       unitPriceAfterDiscount: "",
// //       totalprice: "",
// //       taxableAmount: 0,
// //       gstPercentage: 0,
// //       sgstRate: 0,
// //       cgstRate: 0,
// //       igstRate: 0,
// //       grandTotal: 0,
// //     },
// //   ]);

// //   const Context = useContext(UserContext);
// //   const Params = useParams();
// //   const location = useLocation();
// //   let History = useHistory();

// //   const handleRequredQty = (e, index, avalaibleSize) => {
// //     const { name, value } = e.target;
// //     if (Number(value) <= avalaibleSize) {
// //       if (Number(value != 0)) {
// //         setIndex(index);
// //         const list = [...product];
// //         list[index][name] = Number(value);
// //         let amt = 0;
// //         if (list.length > 0) {
// //           const x = list?.map((val) => {
// //             GrandTotal[index] = val.Size * val.qty * val.price;
// //             list[index]["totalprice"] = val.Size * val.qty * val.price;
// //             return val.Size * val.qty * val.price;
// //           });
// //           amt = x.reduce((a, b) => a + b);
// //         }

// //         if (amt < CustomerLimit) {
// //           const gstdetails = GstCalculation(Party, list, Context);

// //           setGSTData(gstdetails);
// //           list[index]["taxableAmount"] = gstdetails?.gstDetails[index]?.taxable;
// //           list[index]["sgstRate"] = gstdetails?.gstDetails[index]?.sgstRate;
// //           list[index]["cgstRate"] = gstdetails?.gstDetails[index]?.cgstRate;
// //           list[index]["igstRate"] = gstdetails?.gstDetails[index]?.igstRate;
// //           list[index]["grandTotal"] = gstdetails?.gstDetails[index]?.grandTotal;
// //           list[index]["gstPercentage"] =
// //             gstdetails?.gstDetails[index]?.gstPercentage;
// //           list[index]["discountPercentage"] =
// //             gstdetails?.gstDetails[index]?.discountPercentage;
// //           // console.log(list);

// //           setProduct(list);
// //         } else {
// //           swal("Error", `Your Max Limit is ${CustomerLimit}`);
// //         }
// //       }
// //     }
// //   };

// //   const handleSelectionParty = async (selectedList, selectedItem) => {
// //     setPartyId(selectedItem._id);
// //     setParty(selectedItem);

// //     let URL = "order/check-party-limit/";
// //     await _Get(URL, selectedItem._id)
// //       .then((res) => {
// //         setCustomerLimit(Number(res?.CustomerLimit));
// //         swal(`${res?.message}`);
// //         console.log(res?.CustomerLimit);
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });

// //     const gstdetails = GstCalculation(selectedItem, product, Context);
// //     setGSTData(gstdetails);
// //   };

// //   const handleSelection = async (selectedList, selectedItem, index) => {
// //     const userdata = JSON.parse(localStorage.getItem("userData"));

// //     SelectedITems.push(selectedItem);

// //     let URl = `${WareHouse_Current_Stock}${selectedItem?.warehouse?._id}/`;
// //     var Stock;
// //     await _Get(URl, selectedItem?._id)
// //       .then((res) => {
// //         console.log(res?.currentStock);
// //         Stock = res?.currentStock;
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //         swal("something went Wrong");
// //       });

// //     setProduct((prevProductList) => {
// //       const updatedProductList = [...prevProductList];
// //       const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
// //       updatedProduct.price = selectedItem?.Product_MRP; // Update the price of the copied product
// //       updatedProduct.productId = selectedItem?._id;
// //       updatedProduct.productData = selectedItem;
// //       updatedProduct.discountPercentage =
// //         Party?.category?.discount && Party?.category?.discount
// //           ? Party?.category?.discount
// //           : 0;
// //       updatedProduct.availableQty = Stock?.currentStock;
// //       updatedProductList[index] = updatedProduct;
// //       const gstdetails = GstCalculation(Party, updatedProductList, Context);
// //       setGSTData(gstdetails);

// //       updatedProduct["taxableAmount"] = gstdetails?.gstDetails[index]?.taxable;
// //       updatedProduct["sgstRate"] = gstdetails?.gstDetails[index]?.sgstRate;
// //       updatedProduct["cgstRate"] = gstdetails?.gstDetails[index]?.cgstRate;
// //       updatedProduct["igstRate"] = gstdetails?.gstDetails[index]?.igstRate;
// //       updatedProduct["grandTotal"] = gstdetails?.gstDetails[index]?.grandTotal;
// //       updatedProduct["gstPercentage"] =
// //         gstdetails?.gstDetails[index]?.gstPercentage;
// //       updatedProduct["discountPercentage"] =
// //         gstdetails?.gstDetails[index]?.discountPercentage;

// //       return updatedProductList; // Return the updated product list to set the state
// //     });
// //   };

// //   const handleSelectionUnit = (selectedList, selectedItem, index) => {
// //     SelectedSize.push(selectedItem);
// //     setProduct((prevProductList) => {
// //       const updatedUnitList = [...prevProductList];
// //       const updatedProduct = { ...updatedUnitList[index] }; // Create a copy of the product at the specified index
// //       updatedProduct.Size = selectedItem.unitQty;
// //       updatedProduct.unitType = selectedItem.primaryUnit;
// //       updatedUnitList[index] = updatedProduct;
// //       let myarr = prevProductList?.map((ele, i) => {
// //         updatedUnitList[index]["totalprice"] =
// //           ele?.qty * ele.price * SelectedSize[i]?.unitQty;
// //         let indextotal = ele?.price * ele.qty * SelectedSize[i]?.unitQty;
// //         GrandTotal[index] = indextotal;
// //         return indextotal;
// //       });
// //       let amt = myarr.reduce((a, b) => a + b);

// //       const gstdetails = GstCalculation(Party, updatedUnitList, Context);

// //       setGSTData(gstdetails);

// //       updatedProduct["taxableAmount"] = gstdetails?.gstDetails[index]?.taxable;
// //       updatedProduct["sgstRate"] = gstdetails?.gstDetails[index]?.sgstRate;
// //       updatedProduct["cgstRate"] = gstdetails?.gstDetails[index]?.cgstRate;
// //       updatedProduct["igstRate"] = gstdetails?.gstDetails[index]?.igstRate;
// //       updatedProduct["grandTotal"] = gstdetails?.gstDetails[index]?.grandTotal;
// //       updatedProduct["gstPercentage"] =
// //         gstdetails?.gstDetails[index]?.gstPercentage;
// //       updatedProduct["discountPercentage"] =
// //         gstdetails?.gstDetails[index]?.discountPercentage;
// //       return updatedUnitList; // Return the updated product list
// //     });
// //   };

// //   useEffect(() => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           const date = new Date(position.timestamp);
// //           const CurentTime = date.toLocaleString();
// //           geotagging = `${position.coords.latitude},${position.coords.longitude}`;
// //         },
// //         (error) => {
// //           swal(`Error: ${error}`);
// //         },
// //         { timeout: 10000, enableHighAccuracy: true }
// //       );
// //     } else {
// //       swal(`Error: Geolocation not found`);
// //     }
// //     let userdata = JSON.parse(localStorage.getItem("userData"));

// //     (async () => {
// //       console.log(Params?.id);
// //       await _Get(view_create_order_historyBy_id, Params?.id)
// //         .then((res) => {
// //           // console.log(res?.orderHistory);

// //           let data = res?.orderHistory;
// //           let URL = "order/check-party-limit/";
// //           _Get(URL, res?.orderHistory?.partyId?._id)
// //             .then((res) => {
// //               setCustomerLimit(Number(res?.CustomerLimit));
// //               // swal(`${res?.message}`);
// //               console.log(res?.CustomerLimit);
// //             })
// //             .catch((err) => {
// //               console.log(err);
// //             });
// //           debugger;
// //           setProduct(data?.orderItems);

// //           // setProduct(data);
// //           let value = data;
// //           setParty(value?.partyId);
// //           let Tax = {
// //             Amount: value?.amount,
// //             CgstTotal: value?.cgstTotal,
// //             GrandTotal: value?.grandTotal,
// //             IgstTaxType: value?.igstTaxType == 1 ? 1 : 0,
// //             IgstTotal: value?.igstTotal,
// //             RoundOff: value?.roundOff,
// //             SgstTotal: value?.sgstTotal,
// //           };
// //           let payload = {
// //             Tax: Tax,
// //           };
// //           setGSTData(payload);
// //           setEditdata(data);
// //           // setUserName(data.fullName);
// //           // setGrandTotalAmt(data?.grandTotal);
// //         })
// //         .catch((err) => {
// //           console.log(err);
// //         });
// //     })();
// //     let findParty = userdata?.rolename?.roleName == "Customer";
// //     if (findParty) {
// //       setPartyLogin(true);
// //       setPartyId(userdata?._id);
// //       setParty(userdata);
// //       let URL = "order/check-party-limit/";
// //       _Get(URL, userdata?._id)
// //         .then((res) => {
// //           setCustomerLimit(Number(res?.CustomerLimit));

// //           console.log(res?.CustomerLimit);
// //         })
// //         .catch((err) => {
// //           console.log(err);
// //         });
// //     }
// //     ProductListView(userdata?._id, userdata?.database)
// //       .then((res) => {
// //         let product = res?.Product?.filter(
// //           (ele) => ele?.addProductType == "Product"
// //         );
// //         setProductList(res?.Product);
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //     CreateCustomerList(userdata?._id, userdata?.database)
// //       .then((res) => {
// //         let value = res?.Customer;
// //         if (value?.length) {
// //           setPartyList(value);
// //         }
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //     UnitListView(userdata?._id, userdata?.database)
// //       .then((res) => {
// //         setUnitList(res.Unit);
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   }, []);
// //   useEffect(() => {
// //     const userInfo = JSON.parse(localStorage.getItem("userData"));
// //     setUserInfo(userInfo);
// //   }, []);

// //   let addMoreProduct = () => {
// //     setProduct([
// //       ...product,
// //       {
// //         productId: "",
// //         productData: "",
// //         discountPercentage: "",
// //         availableQty: 0,
// //         qty: 1,
// //         Size: "",
// //         price: "",
// //         totalprice: "",
// //         unitPriceAfterDiscount: "",
// //         unitQty: "",
// //         unitType: "",
// //         taxableAmount: "",
// //         gstPercentage: "",
// //         sgstRate: "",
// //         cgstRate: "",
// //         igstRate: "",
// //         grandTotal: "",
// //       },
// //     ]);
// //   };
// //   let removeMoreProduct = (i) => {
// //     let newFormValues = [...product];
// //     newFormValues.splice(i, 1);
// //     GrandTotal.splice(i, 1);
// //     let amt = GrandTotal.reduce((a, b) => a + b, 0);
// //     setProduct(newFormValues);
// //     const gstdetails = GstCalculation(Party, newFormValues, Context);
// //     setGSTData(gstdetails);
// //   };

// //   const submitHandler = (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     debugger;
// //     if (GSTData?.Tax?.GrandTotal < CustomerLimit) {
// //       const gstdetails = GstCalculation(Party, product, Context);
// //       let Product = product?.map((ele) => {
// //         if (ele?.discountPercentage > 1) {
// //           return {
// //             productId: ele?.productId,
// //             productData: ele?.productData,
// //             discountPercentage: ele?.discountPercentage,
// //             availableQty: ele?.availableQty,
// //             qty: ele?.qty,
// //             price: ele?.price,
// //             Size: ele?.Size,
// //             unitQty: ele?.Size,
// //             unitType: ele?.unitType,
// //             totalPrice: ele?.totalprice,
// //             sgstRate: ele?.sgstRate,
// //             cgstRate: ele?.cgstRate,
// //             gstPercentage: ele?.gstPercentage,
// //             igstRate: ele?.igstRate,
// //             grandTotal: ele?.grandTotal,
// //             taxableAmount: ele?.taxableAmount,
// //             totalPriceWithDiscount: Number(
// //               (
// //                 (ele?.totalprice * (100 - ele?.discountPercentage)) /
// //                 100
// //               ).toFixed(2)
// //             ),
// //           };
// //         } else {
// //           return {
// //             productId: ele?.productId,
// //             productData: ele?.productData,
// //             discountPercentage: ele?.discountPercentage,
// //             availableQty: ele?.availableQty,
// //             qty: ele?.qty,
// //             price: ele?.price,
// //             Size: ele?.Size,
// //             totalPrice: ele?.totalprice,
// //             sgstRate: ele?.sgstRate,
// //             cgstRate: ele?.cgstRate,
// //             gstPercentage: ele?.gstPercentage,
// //             igstRate: ele?.igstRate,
// //             grandTotal: ele?.grandTotal,
// //             taxableAmount: ele?.taxableAmount,
// //             unitQty: ele?.Size,
// //             unitType: ele?.unitType,
// //             totalPriceWithDiscount: ele?.totalprice,
// //           };
// //         }
// //       });
// //       let arnStatus = false;
// //       let arnNumber = Number((gstdetails?.Tax?.GrandTotal).toFixed(2));
// //       if (arnNumber > 49999) {
// //         arnStatus = true;
// //       }
// //       const fullname = Party?.firstName + " " + Party?.lastName;
// //       const payload = {
// //         database: UserInfo?.database,
// //         ARN: Party?.rolename + 11544341546556,
// //         ARNStatus: arnStatus,
// //         partyId: PartyId,
// //         discountPercentage: Party?.category ? Party?.category?.discount : 0,
// //         SuperAdmin: Context?.CompanyDetails?.created_by,
// //         fullName: fullname,
// //         address: `${Party?.address1} ${Party?.address2}`,
// //         grandTotal: Number((gstdetails?.Tax?.GrandTotal).toFixed(2)),
// //         roundOff: Number(
// //           (gstdetails?.Tax?.GrandTotal - gstdetails?.Tax?.RoundOff).toFixed(2)
// //         ),
// //         amount: Number((gstdetails?.Tax?.Amount).toFixed(2)),
// //         sgstTotal: gstdetails?.Tax?.CgstTotal,
// //         igstTaxType: gstdetails?.Tax?.IgstTaxType,
// //         cgstTotal: gstdetails?.Tax?.CgstTotal,
// //         igstTotal: gstdetails?.Tax?.IgstTotal,
// //         gstDetails: gstdetails?.gstDetails,
// //         MobileNo: Party?.contactNumber,
// //         pincode: Party?.pincode,
// //         state: Party?.State,
// //         city: Party?.City,
// //         orderItems: Product,
// //         DateofDelivery: dateofDelivery,
// //         geotagging: geotagging,
// //       };
// //       SaveOrder(payload)
// //         .then((res) => {
// //           setLoading(false);
// //           console.log(res);
// //           swal("Order Created Successfully");
// //           History.goBack();
// //         })
// //         .catch((err) => {
// //           swal("SomeThing Went Wrong");
// //           console.log(err.response);
// //         });
// //     } else {
// //       setLoading(false);

// //       swal("Error", `Your Max Limit is ${CustomerLimit}`);
// //     }
// //   };

// //   const onRemove1 = (selectedList, removedItem, index) => {
// //     console.log(selectedList);
// //   };
// //   return (
// //     <div>
// //       <div>
// //         <Card>
// //           <Row className="m-2">
// //             <Col className="">
// //               <div>
// //                 <h1 className="">Edit Sales Order</h1>
// //               </div>
// //             </Col>
// //             <Col>
// //               <Route
// //                 render={({ history }) => (
// //                   <Button
// //                     className="btn float-right"
// //                     color="danger"
// //                     size="sm"
// //                     onClick={() =>
// //                       history.push("/app/softnumen/order/orderList")
// //                     }>
// //                     Back
// //                   </Button>
// //                 )}
// //               />
// //             </Col>
// //           </Row>

// //           <CardBody>
// //             <Form className="m-1" onSubmit={submitHandler}>
// //               <Row>
// //                 {PartyLogin && PartyLogin ? null : (
// //                   <>
// //                     <Col className="mb-1" lg="4" md="4" sm="12">
// //                       <div className="">
// //                         <h3>Party :{Editdata?.fullName}</h3>

// //                         {/* <Multiselect
// //                           required
// //                           selectionLimit={1}
// //                           isObject="false"
// //                           options={PartyList}
// //                           onSelect={(selectedList, selectedItem) =>
// //                             handleSelectionParty(selectedList, selectedItem)
// //                           }
// //                           onRemove={onRemove1}
// //                           displayValue="firstName"
// //                         /> */}
// //                       </div>
// //                     </Col>
// //                     <Col className="mb-1" lg="4" md="4" sm="12">
// //                       <div className="">
// //                         <Label>
// //                           <h3>
// //                             Expected Delivery Date :
// //                             {Editdata?.date?.split("T")[0]}
// //                           </h3>
// //                         </Label>
// //                         {/* <Input
// //                           required
// //                           type="date"
// //                           name="DateofDelivery"
// //                           value={dateofDelivery}
// //                           onChange={(e) => setDateofDelivery(e.target.value)}
// //                         /> */}
// //                       </div>
// //                     </Col>
// //                   </>
// //                 )}
// //                 <Col className="mb-1" lg="4" md="4" sm="12"></Col>
// //               </Row>
// //               <hr />
// //               {/* <Table responsive>
// //                 <thead>
// //                   <tr>
// //                     <th>#</th>
// //                     <th>ProductName</th>
// //                     <th>Available Size</th>
// //                     <th>Choose Unit</th>
// //                     <th>Purchase Quantity</th>
// //                     <th>Discount Percentage</th>
// //                     <th>Product Price </th>
// //                     <th>Taxable Amount</th>
// //                     <th>GST Percentage</th>
// //                     {GSTData?.Tax?.IgstTaxType ? (
// //                       <th> IGST Amount </th>
// //                     ) : (
// //                       <>
// //                         <th> SGST Amount </th>
// //                         <th> CGST Amount</th>
// //                       </>
// //                     )}
// //                     <th> Total Price</th>
// //                     <th> Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {product &&
// //                     product?.map((product, index) => (
// //                       <tr key={index}>
// //                         <td>1</td>
// //                         <td>
// //                           {" "}
// //                           <Multiselect
// //                             required
// //                             selectionLimit={1}
// //                             isObject="false"
// //                             options={ProductList}
// //                             onSelect={(selectedList, selectedItem) =>
// //                               handleSelection(selectedList, selectedItem, index)
// //                             }
// //                             onRemove={(selectedList, selectedItem) => {
// //                               onRemove1(selectedList, selectedItem, index);
// //                             }}
// //                             displayValue="Product_Title" // Property name to display in the dropdown options
// //                           />
// //                         </td>
// //                         <td>{product?.availableQty} </td>
// //                         <td>
// //                           {" "}
// //                           <Multiselect
// //                             required
// //                             selectionLimit={1}
// //                             isObject="false"
// //                             options={UnitList}
// //                             onSelect={(selectedList, selectedItem) =>
// //                               handleSelectionUnit(
// //                                 selectedList,
// //                                 selectedItem,
// //                                 index
// //                               )
// //                             }
// //                             onRemove={(selectedList, selectedItem) => {
// //                               onRemove1(selectedList, selectedItem, index);
// //                             }}
// //                             displayValue="primaryUnit"
// //                           />
// //                         </td>
// //                         <td>
// //                           {" "}
// //                           <Input
// //                             type="number"
// //                             name="qty"
// //                             min={0}
// //                             placeholder="Req_Qty"
// //                             required
// //                             autocomplete="off"
// //                             value={product?.qty}
// //                             onChange={(e) =>
// //                               handleRequredQty(e, index, product?.availableQty)
// //                             }
// //                           />
// //                         </td>
// //                         <td>{product?.discountPercentage}</td>
// //                         <td>{product.price}</td>
// //                         <td>{product.taxableAmount}</td>
// //                         <td>{product.gstPercentage}</td>
// //                         {GSTData?.Tax?.IgstTaxType ? (
// //                           <td>{product.igstRate}</td>
// //                         ) : (
// //                           <>
// //                             <td>{product.sgstRate}</td>
// //                             <td>{product.cgstRate}</td>
// //                           </>
// //                         )}
// //                         <td>{product.grandTotal}</td>
// //                         <td>
// //                           {" "}
// //                           {index ? (
// //                             <Button
// //                               type="button"
// //                               color="danger"
// //                               className="button remove pt-1"
// //                               onClick={() => removeMoreProduct(index)}>
// //                               x
// //                             </Button>
// //                           ) : null}
// //                         </td>
// //                       </tr>
// //                     ))}
// //                 </tbody>
// //               </Table> */}
// //               {product?.length > 0 &&
// //                 product?.map((product, index) => {
// //                   debugger;
// //                   return (
// //                     <Row className="" key={index}>
// //                       <Col className="mb-1">
// //                         <div className="">
// //                           <Label>ProductName</Label>
// //                           <Multiselect
// //                             required
// //                             selectionLimit={1}
// //                             isObject="false"
// //                             selectedValues={product?.productId}
// //                             options={ProductList}
// //                             onSelect={(selectedList, selectedItem) =>
// //                               handleSelection(selectedList, selectedItem, index)
// //                             }
// //                             onRemove={(selectedList, selectedItem) => {
// //                               onRemove1(selectedList, selectedItem, index);
// //                             }}
// //                             displayValue="Product_Title" // Property name to display in the dropdown options
// //                           />
// //                         </div>
// //                       </Col>

// //                       <Col className="mb-1">
// //                         <div className="">
// //                           <Label>Choose Unit</Label>
// //                           <Multiselect
// //                             required
// //                             selectedValues={[]}
// //                             selectionLimit={1}
// //                             isObject="false"
// //                             options={UnitList}
// //                             onSelect={(selectedList, selectedItem) =>
// //                               handleSelectionUnit(
// //                                 selectedList,
// //                                 selectedItem,
// //                                 index
// //                               )
// //                             }
// //                             onRemove={(selectedList, selectedItem) => {
// //                               onRemove1(selectedList, selectedItem, index);
// //                             }}
// //                             displayValue="primaryUnit"
// //                           />
// //                         </div>
// //                       </Col>
// //                       <Col lg="1" md="1" className="mb-1">
// //                         <div className="">
// //                           <Label>Available Size</Label>
// //                           <Input
// //                             type="number"
// //                             disabled
// //                             name="availableQty"
// //                             placeholder="AvailableSize"
// //                             value={product?.availableQty}
// //                           />
// //                         </div>
// //                       </Col>
// //                       <Col className="mb-1">
// //                         <div className="">
// //                           <Label>Qty</Label>
// //                           <Input
// //                             type="number"
// //                             name="qty"
// //                             min={0}
// //                             placeholder="Req_Qty"
// //                             required
// //                             autocomplete="off"
// //                             value={product?.qty}
// //                             onChange={(e) =>
// //                               handleRequredQty(e, index, product?.availableQty)
// //                             }
// //                           />
// //                         </div>
// //                       </Col>

// //                       <Col className="mb-1">
// //                         <div className="">
// //                           <Label>Dis(%)</Label>
// //                           <Input
// //                             type="text"
// //                             name="discountPercentage"
// //                             disabled
// //                             placeholder="Discount Percentage"
// //                             value={product?.discountPercentage}
// //                           />
// //                         </div>
// //                       </Col>
// //                       <Col className="mb-1">
// //                         <div className="">
// //                           <Label>Price</Label>
// //                           <Input
// //                             type="number"
// //                             name="price"
// //                             disabled
// //                             placeholder="Price"
// //                             value={product.price}
// //                           />
// //                         </div>
// //                       </Col>
// //                       <Col className="mb-1">
// //                         <div className="">
// //                           <Label>Taxable</Label>
// //                           <Input
// //                             type="number"
// //                             name="taxableAmount"
// //                             disabled
// //                             placeholder="Price"
// //                             value={product.taxableAmount}
// //                           />
// //                         </div>
// //                       </Col>
// //                       <Col className="mb-1">
// //                         <div className="">
// //                           <Label>GST %</Label>
// //                           <Input
// //                             type="text"
// //                             name="gstPercentage"
// //                             disabled
// //                             placeholder="GST Percentage %"
// //                             value={product.gstPercentage}
// //                           />
// //                         </div>
// //                       </Col>
// //                       {GSTData?.Tax?.IgstTaxType ? (
// //                         <>
// //                           <Col className="mb-1">
// //                             <div className="">
// //                               <Label>IGST</Label>
// //                               <Input
// //                                 type="number"
// //                                 name="igstRate"
// //                                 readOnly
// //                                 placeholder="igstRate"
// //                                 value={product.igstRate}
// //                               />
// //                             </div>
// //                           </Col>
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Col className="mb-1">
// //                             <div className="">
// //                               <Label>SGST</Label>
// //                               <Input
// //                                 type="number"
// //                                 name="sgstRate"
// //                                 readOnly
// //                                 placeholder="sgstRate"
// //                                 value={product.sgstRate}
// //                               />
// //                             </div>
// //                           </Col>
// //                           <Col className="mb-1">
// //                             <div className="">
// //                               <Label>CGST</Label>
// //                               <Input
// //                                 type="number"
// //                                 name="cgstRate"
// //                                 readOnly
// //                                 placeholder="cgstRate"
// //                                 value={product.cgstRate}
// //                               />
// //                             </div>
// //                           </Col>
// //                         </>
// //                       )}

// //                       <Col className="mb-1">
// //                         <div className="">
// //                           <Label>Total </Label>
// //                           <Input
// //                             type="number"
// //                             name="grandTotal"
// //                             readOnly
// //                             placeholder="TtlPrice"
// //                             value={product.grandTotal}
// //                           />
// //                         </div>
// //                       </Col>
// //                       <Col className="d-flex mt-1 abb">
// //                         <div className="btnStyle">
// //                           {index ? (
// //                             <Button
// //                               type="button"
// //                               color="danger"
// //                               className="button remove pt-1"
// //                               size="sm"
// //                               onClick={() => removeMoreProduct(index)}>
// //                               Remove
// //                             </Button>
// //                           ) : null}
// //                         </div>
// //                       </Col>
// //                     </Row>
// //                   );
// //                 })}
// //               <Row>
// //                 <Col lg="12" sm="12" md="12">
// //                   <div className="btnStyle d-flex justify-content-end">
// //                     <Button
// //                       className="ml-1 mb-1"
// //                       color="primary"
// //                       type="button"
// //                       size="sm"
// //                       onClick={() => addMoreProduct()}>
// //                       Add
// //                     </Button>
// //                   </div>
// //                 </Col>
// //               </Row>
// //               <Row>
// //                 <Col className="mb-1" lg="12" md="12" sm="12">
// //                   <div className=" d-flex justify-content-end">
// //                     <ul className="subtotal">
// //                       <li>
// //                         <Label className="pr-5">
// //                           Total:
// //                           <span className="p-2">
// //                             {!!GSTData?.Tax?.Amount && GSTData?.Tax?.Amount
// //                               ? (GSTData?.Tax?.Amount).toFixed(2)
// //                               : 0}
// //                           </span>
// //                         </Label>
// //                       </li>
// //                       {GSTData?.Tax?.IgstTaxType &&
// //                       GSTData?.Tax?.IgstTaxType ? (
// //                         <li>
// //                           <Label className="">
// //                             IGST Tax:{" "}
// //                             <strong>
// //                               RS{" "}
// //                               {!!GSTData?.Tax?.IgstTotal &&
// //                               GSTData?.Tax?.IgstTotal
// //                                 ? (GSTData?.Tax?.IgstTotal).toFixed(2)
// //                                 : 0}
// //                             </strong>
// //                           </Label>
// //                         </li>
// //                       ) : (
// //                         <>
// //                           <li>
// //                             <Label className="">
// //                               SGST Tax:{" "}
// //                               <strong>
// //                                 RS{" "}
// //                                 {!!GSTData?.Tax?.SgstTotal &&
// //                                 GSTData?.Tax?.SgstTotal
// //                                   ? (GSTData?.Tax?.SgstTotal).toFixed(2)
// //                                   : 0}
// //                               </strong>
// //                             </Label>
// //                           </li>
// //                           <li>
// //                             <Label className="">
// //                               CGST Tax:{" "}
// //                               <strong>
// //                                 RS{" "}
// //                                 {!!GSTData?.Tax?.CgstTotal &&
// //                                 GSTData?.Tax?.CgstTotal
// //                                   ? (GSTData?.Tax?.CgstTotal).toFixed(2)
// //                                   : 0}
// //                               </strong>
// //                             </Label>
// //                           </li>
// //                         </>
// //                       )}

// //                       <li>
// //                         {" "}
// //                         <Label className="pr-5">
// //                           Grand Total :{" "}
// //                           <strong>
// //                             RS{" "}
// //                             {!!GSTData?.Tax?.GrandTotal
// //                               ? (GSTData?.Tax?.GrandTotal).toFixed(2)
// //                               : 0}
// //                           </strong>
// //                         </Label>
// //                       </li>
// //                     </ul>
// //                   </div>
// //                 </Col>
// //               </Row>
// //               {!Loading && !Loading ? (
// //                 <Row>
// //                   <Col>
// //                     <div className="d-flex justify-content-center">
// //                       <Button.Ripple
// //                         color="primary"
// //                         type="submit"
// //                         className="mt-2">
// //                         Submit
// //                       </Button.Ripple>
// //                     </div>
// //                   </Col>
// //                 </Row>
// //               ) : (
// //                 <Row>
// //                   <Col>
// //                     <div className="d-flex justify-content-center">
// //                       <Button.Ripple color="secondary" className="mt-2">
// //                         Loading...
// //                       </Button.Ripple>
// //                     </div>
// //                   </Col>
// //                 </Row>
// //               )}
// //             </Form>
// //           </CardBody>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // };
// // export default EditOrder;

import React, { useEffect, useState, useContext } from "react";
import { Route } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  Label,
  Button,
} from "reactstrap";
import "react-phone-input-2/lib/style.css";
import Multiselect from "multiselect-react-dropdown";
import "../../../../assets/scss/pages/users.scss";
import {
  CreateCustomerList,
  _Get,
  SavePurchaseOrder,
  _Put,
  SalesEditOrder,
} from "../../../../ApiEndPoint/ApiCalling";
import { useParams, useLocation, useHistory } from "react-router-dom";
import UserContext from "../../../../context/Context";
import {
  PurchaseProductList_Product,
  Sales_Edit_Order,
  WareHouse_Current_Stock,
} from "../../../../../src/ApiEndPoint/Api";
import { view_create_order_historyBy_id } from "../../../../ApiEndPoint/Api";
import { GstCalculation } from "./GstCalculation";
let GrandTotal = [];
let SelectedITems = [];
let SelectedSize = [];
let PartyListdata = [];
var Stocks = [];
const EditOrder = args => {
  const [Index, setIndex] = useState("");
  const [Mode, setMode] = useState("Update");
  const [PartyLogin, setPartyLogin] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [ProductList, setProductList] = useState([]);
  const [GSTData, setGSTData] = useState({});
  const [PartyList, setPartyList] = useState([]);
  const [CustomerLimit, setCustomerLimit] = useState(0);
  const [PartyId, setPartyId] = useState("");
  const [Party, setParty] = useState(null);
  const [UnitList, setUnitList] = useState([]);
  const [UserInfo, setUserInfo] = useState({});
  const [dateofDelivery, setDateofDelivery] = useState("");
  const Params = useParams();

  let History = useHistory();
  const [product, setProduct] = useState([
    {
      productId: "",
      productData: "",
      availableQty: 0,
      disCountPercentage: "",
      qty: 1,
      price: "",
      Size: "",
      unitType: "",
      unitPriceAfterDiscount: "",
      totalprice: "",
      taxableAmount: 0,
      gstPercentage: 0,
      sgstRate: 0,
      cgstRate: 0,
      igstRate: 0,
      grandTotal: 0,
    },
  ]);
  const Context = useContext(UserContext);
  const handleRequredQty = (e, index, avalaibleSize) => {
    const { name, value } = e.target;
    if (Number(value) <= avalaibleSize) {
      if (Number(value != 0)) {
        setIndex(index);
        const list = [...product];
        list[index][name] = Number(value);
        let amt = 0;
        if (list?.length > 0) {
          const x = list?.map(val => {
            GrandTotal[index] = val.qty * val.price;
            list[index]["totalprice"] = val.qty * val.price;
            return val.qty * val.price;
          });
          amt = x.reduce((a, b) => a + b);
        }
        if (amt < CustomerLimit) {
          const gstdetails = GstCalculation(Party, list, Context);
          setGSTData(gstdetails);
          list[index]["taxableAmount"] = gstdetails?.gstDetails[index]?.taxable;
          list[index]["sgstRate"] = gstdetails?.gstDetails[index]?.sgstRate;
          list[index]["cgstRate"] = gstdetails?.gstDetails[index]?.cgstRate;
          list[index]["igstRate"] = gstdetails?.gstDetails[index]?.igstRate;
          list[index]["grandTotal"] = gstdetails?.gstDetails[index]?.grandTotal;
          list[index]["gstPercentage"] =
            gstdetails?.gstDetails[index]?.gstPercentage;
          list[index]["discountPercentage"] =
            gstdetails?.gstDetails[index]?.discountPercentage;
          // console.log(list);

          setProduct(list);
        } else {
          swal("Error", `Your Max Limit is ${CustomerLimit}`);
        }
        // const gstdetails = GstCalculation(Party, list, Context);
        // setGSTData(gstdetails);
        // list[index]["taxableAmount"] = gstdetails?.gstDetails[index]?.taxable;
        // list[index]["sgstRate"] = gstdetails?.gstDetails[index]?.sgstRate;
        // list[index]["cgstRate"] = gstdetails?.gstDetails[index]?.cgstRate;
        // list[index]["igstRate"] = gstdetails?.gstDetails[index]?.igstRate;
        // list[index]["grandTotal"] = gstdetails?.gstDetails[index]?.grandTotal;
        // list[index]["gstPercentage"] =
        //   gstdetails?.gstDetails[index]?.gstPercentage;
        // list[index]["disCountPercentage"] =
        //   gstdetails?.gstDetails[index]?.discountPercentage;
        // setProduct(list);
      }
    }
  };

  const handleSelectionParty = async (selectedList, selectedItem) => {
    setPartyId(selectedItem._id);
    setParty(selectedItem);
    let URL = "order/check-party-limit/";
    await _Get(URL, selectedItem._id)
      .then(res => {
        setCustomerLimit(Number(res?.CustomerLimit));
        swal(`${res?.message}`);
        console.log(res?.CustomerLimit);
      })
      .catch(err => {
        console.log(err);
      });
    const gstdetails = GstCalculation(selectedItem, product, Context);
    setGSTData(gstdetails);
  };

  const handleSelection = async (selectedList, selectedItem, index) => {
    const userdata = JSON.parse(localStorage.getItem("userData"));
    SelectedITems.push(selectedItem);
    let costPrice = Number(
      (
        selectedItem?.Product_MRP /
        (((100 +
          Number(Party?.category?.discount ? Party?.category?.discount : 0)) /
          100) *
          ((100 + Number(selectedItem?.GSTRate)) / 100))
      ).toFixed(2)
    );
    // let URl = `${WareHouse_Current_Stock}${selectedItem?.warehouse?._id}/`;
    // var Stock;
    // await _Get(URl, selectedItem?._id)
    //   .then((res) => {
    //     Stock = res?.currentStock;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     swal("something went Wrong");
    //   });
    setProduct(prevProductList => {
      const updatedProductList = [...prevProductList];
      const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
      updatedProduct.price = selectedItem?.Product_MRP; // Update the price of the copied product
      updatedProduct.productId = selectedItem?._id;
      updatedProduct.discount = Party?.category?.discount;
      // updatedProduct.availableQty = Stock?.currentStock;
      updatedProduct.availableQty = selectedItem?.Opening_Stock;
      updatedProduct.wholeQty = selectedItem?.Opening_Stock;
      updatedProduct.HSN_Code = selectedItem?.HSN_Code;
      updatedProduct.basicPrice = costPrice;

      updatedProduct["discountPercentage"] =
        Party?.category?.discount && Party?.category?.discount
          ? Party?.category?.discount
          : 0;
      updatedProduct.productData = selectedItem;
      updatedProduct.primaryUnit = selectedItem?.primaryUnit;
      updatedProduct.secondaryUnit = selectedItem?.secondaryUnit;
      updatedProduct.secondarySize = selectedItem?.secondarySize;

      updatedProduct.disCountPercentage =
        Party?.Category?.discount && Party?.Category?.discount
          ? Party?.Category?.discount
          : 0;

      updatedProductList[index] = updatedProduct;
      const gstdetails = GstCalculation(Party, updatedProductList, Context);
      setGSTData(gstdetails);
      updatedProduct["taxableAmount"] = gstdetails?.gstDetails[index]?.taxable;
      updatedProduct["sgstRate"] = gstdetails?.gstDetails[index]?.sgstRate;
      updatedProduct["cgstRate"] = gstdetails?.gstDetails[index]?.cgstRate;
      updatedProduct["igstRate"] = gstdetails?.gstDetails[index]?.igstRate;
      updatedProduct["grandTotal"] = gstdetails?.gstDetails[index]?.grandTotal;
      updatedProduct["gstPercentage"] =
        gstdetails?.gstDetails[index]?.gstPercentage;
      updatedProduct["disCountPercentage"] =
        gstdetails?.gstDetails[index]?.discountPercentage;

      return updatedProductList; // Return the updated product list to set the state
    });
  };

  const handleSelectionUnit = (selectedList, selectedItem, index) => {
    SelectedSize.push(selectedItem);
    setProduct(prevProductList => {
      const updatedUnitList = [...prevProductList];
      const updatedProduct = { ...updatedUnitList[index] }; // Create a copy of the product at the specified index
      updatedProduct.Size = selectedItem?.unitQty;
      updatedProduct.unitType = selectedItem.primaryUnit;
      updatedUnitList[index] = updatedProduct;
      let myarr = prevProductList?.map((ele, i) => {
        updatedUnitList[index]["totalprice"] =
          ele?.qty * ele.price * SelectedSize[i]?.unitQty;
        let indextotal = ele?.price * ele.qty * SelectedSize[i]?.unitQty;
        GrandTotal[index] = indextotal;
        return indextotal;
      });
      let amt = myarr.reduce((a, b) => a + b);

      const gstdetails = GstCalculation(Party, updatedUnitList, Context);

      setGSTData(gstdetails);
      updatedProduct["taxableAmount"] = gstdetails?.gstDetails[index]?.taxable;
      updatedProduct["sgstRate"] = gstdetails?.gstDetails[index]?.sgstRate;
      updatedProduct["cgstRate"] = gstdetails?.gstDetails[index]?.cgstRate;
      updatedProduct["igstRate"] = gstdetails?.gstDetails[index]?.igstRate;
      updatedProduct["grandTotal"] = gstdetails?.gstDetails[index]?.grandTotal;
      updatedProduct["gstPercentage"] =
        gstdetails?.gstDetails[index]?.gstPercentage;
      updatedProduct["disCountPercentage"] =
        gstdetails?.gstDetails[index]?.discountPercentage;
      return updatedUnitList; // Return the updated product list
    });
  };

  const fetchQuantity = async warehouseId => {
    debugger;

    for (const id of warehouseId) {
      debugger;
      // const quantity = await fetchQuantity(id);
      // results.push({ warehouseId: id, quantity });
      let URl = `${WareHouse_Current_Stock}${id?.warehouseid}/`;

      await _Get(URl, id?.productId?._id)
        .then(res => {
          debugger;
          console.log(res?.currentStock);
          Stocks.push(res?.currentStock);
        })
        .catch(err => {
          console.log(err);
          swal("something went Wrong");
        });
    }
  };
  useEffect(() => {
    let userdata = JSON.parse(localStorage.getItem("userData"));
    setLoading(true);

    let findParty = userdata?.rolename?.roleName == "Customer";
    if (findParty) {
      setPartyLogin(true);
      setPartyId(userdata?._id);
    }

    (async () => {
      await _Get(PurchaseProductList_Product, userdata?.database)
        .then(res => {
          setProductList(res?.Product);
        })
        .catch(err => {
          console.log(err);
        });
      await CreateCustomerList(userdata?._id, userdata?.database)
        .then(res => {
          let value = res?.Customer;
          if (value?.length) {
            setPartyList(value);
            PartyListdata = value;
          }
        })
        .catch(err => {
          console.log(err);
        });
      setMode("Update");
      await _Get(view_create_order_historyBy_id, Params?.id)
        .then(res => {
          // debugger;
          let value = res?.orderHistory;
          let selectedParty = PartyListdata?.filter(
            ele => ele?._id == value?.partyId?._id
          );
          let URL = "order/check-party-limit/";
          _Get(URL, res?.orderHistory?.partyId?._id)
            .then(res => {
              setCustomerLimit(Number(res?.CustomerLimit));
              // console.log(res?.CustomerLimit);
            })
            .catch(err => {
              console.log(err);
            });
          setParty(selectedParty[0]);
          setPartyId(value?.partyId?._id);
          let updatedProduct = value?.orderItems;

          // let warhouseid=updatedProduct?.map((ele)=>{
          //   return {
          //     warehouseid:ele?.productId?.warehouse,
          //     productId:ele?.productId,
          //   }
          // })
          // debugger
          // // check stock
          //   const quantity = async ()=>{
          //    let response= await fetchQuantity(warhouseid)
          //   };
          //   quantity()
          //   console.log(Stocks)
          //   debugger

          //

          // const updatedProduct = { ...updatedProductList[index] };
          let order = value?.orderItems?.map((element, index) => {
            let costPrice = Number(
              (
                element?.productId?.Product_MRP /
                (((100 +
                  Number(
                    selectedParty[0]?.category?.discount
                      ? selectedParty[0]?.category?.discount
                      : 0
                  )) /
                  100) *
                  ((100 + Number(element?.productId?.GSTRate)) / 100))
              ).toFixed(2)
            );
            SelectedITems.push(element?.productId);
            // const updatedProductList = [...prevProductList];
            // const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
            updatedProduct[index]["price"] = element?.productId?.Product_MRP; // Update the price of the copied product
            updatedProduct[index]["basicPrice"] = costPrice; // Update the price of the copied product
            updatedProduct[index]["availableQty"] =
              element?.productId?.Product_MRP * 100; // Update the price of the copied product
            updatedProduct[index]["discount"] =
              selectedParty[0]?.category?.discount;
            updatedProduct[index]["HSN_Code"] = element?.productId?.HSN_Code;
            updatedProduct[index]["productData"] = element?.productId;
            updatedProduct[index]["primaryUnit"] =
              element?.productId?.primaryUnit;
            updatedProduct[index]["secondaryUnit"] =
              element?.productId?.secondaryUnit;
            updatedProduct[index]["secondarySize"] =
              element?.productId?.secondarySize;
            updatedProduct[index]["productId"] = element?.productId?._id;

            updatedProduct[index]["disCountPercentage"] =
              selectedParty[0]?.category?.discount &&
              selectedParty[0]?.category?.discount
                ? selectedParty[0]?.category?.discount
                : 0;
            const gstdetails = GstCalculation(
              selectedParty[0],
              updatedProduct,
              Context
            );
            setGSTData(gstdetails);
            updatedProduct[index]["taxableAmount"] =
              gstdetails?.gstDetails[index]?.taxable;
            updatedProduct[index]["sgstRate"] =
              gstdetails?.gstDetails[index]?.sgstRate;
            updatedProduct[index]["cgstRate"] =
              gstdetails?.gstDetails[index]?.cgstRate;
            updatedProduct[index]["igstRate"] =
              gstdetails?.gstDetails[index]?.igstRate;
            updatedProduct[index]["grandTotal"] =
              gstdetails?.gstDetails[index]?.grandTotal;
            updatedProduct[index]["gstPercentage"] =
              gstdetails?.gstDetails[index]?.gstPercentage;
            updatedProduct[index]["disCountPercentage"] =
              gstdetails?.gstDetails[index]?.discountPercentage;
          });

          setProduct(updatedProduct);
          setLoading(false);
        })
        .catch(err => {
          console.log(err.response);
          setLoading(false);
        });
    })();
  }, []);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    setUserInfo(userInfo);
  }, []);

  let addMoreProduct = () => {
    setProduct([
      ...product,
      {
        productId: "",
        productData: "",
        availableQty: 0,
        disCountPercentage: "",
        qty: 1,
        Size: "",
        price: "",
        totalprice: "",
        unitQty: "",
        unitType: "",
        unitPriceAfterDiscount: "",
        taxableAmount: "",
        gstPercentage: "",
        sgstRate: "",
        cgstRate: "",
        igstRate: "",
        grandTotal: "",
      },
    ]);
  };
  let removeMoreProduct = i => {
    let newFormValues = [...product];
    newFormValues.splice(i, 1);
    GrandTotal.splice(i, 1);

    setProduct(newFormValues);
    const gstdetails = GstCalculation(Party, newFormValues, Context);
    setGSTData(gstdetails);
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (GSTData?.Tax?.GrandTotal < CustomerLimit) {
      setLoading(true);
      const gstdetails = GstCalculation(Party, product, Context);
      const fullname = UserInfo?.firstName + " " + UserInfo?.lastName;
      let Product = product?.map(ele => {
        if (ele?.disCountPercentage > 1) {
          return {
            igstTaxType: gstdetails?.Tax?.IgstTaxType,
            productId: ele?.productId,
            productData: ele?.productData,
            discountPercentage: ele?.disCountPercentage,
            availableQty: ele?.availableQty,
            qty: ele?.qty,
            price: ele?.price,
            primaryUnit: ele?.primaryUnit,
            secondaryUnit: ele?.secondaryUnit,
            secondarySize: ele?.secondarySize,
            // Size: ele?.Size,
            // unitQty: ele?.unitQty,
            // unitType: ele?.unitType,
            totalPrice: ele?.qty * ele?.price,
            sgstRate: ele?.sgstRate,
            cgstRate: ele?.cgstRate,
            gstPercentage: ele?.gstPercentage,
            igstRate: ele?.igstRate,
            grandTotal: ele?.grandTotal,
            taxableAmount: ele?.taxableAmount,
            totalPriceWithDiscount: Number(
              (
                (ele?.qty * ele?.price * (100 - ele?.disCountPercentage)) /
                100
              ).toFixed(2)
            ),
          };
        } else {
          return {
            productId: ele?.productId,
            productData: ele?.productData,
            discountPercentage: ele?.disCountPercentage,
            availableQty: ele?.availableQty,
            qty: ele?.qty,
            price: ele?.price,
            // Size: ele?.Size,
            totalPrice: ele?.qty * ele?.price,
            primaryUnit: ele?.primaryUnit,
            secondaryUnit: ele?.secondaryUnit,
            secondarySize: ele?.secondarySize,
            // unitQty: ele?.unitQty,
            // unitType: ele?.unitType,
            sgstRate: ele?.sgstRate,
            cgstRate: ele?.cgstRate,
            gstPercentage: ele?.gstPercentage,
            igstRate: ele?.igstRate,
            grandTotal: ele?.grandTotal,
            taxableAmount: ele?.taxableAmount,
            totalPriceWithDiscount: ele?.qty * ele?.price,
            igstTaxType: gstdetails?.Tax?.IgstTaxType,
          };
        }
      });

      const payload = {
        userId: UserInfo?._id,
        database: UserInfo?.database,
        partyId: PartyId,
        SuperAdmin: Context?.CompanyDetails?.created_by,
        fullName: fullname,
        address: UserInfo?.address,
        grandTotal: Number((gstdetails?.Tax?.GrandTotal).toFixed(2)),
        roundOff: Number(
          (gstdetails?.Tax?.GrandTotal - gstdetails?.Tax?.RoundOff).toFixed(2)
        ),
        amount: Number((gstdetails?.Tax?.Amount).toFixed(2)),
        sgstTotal: gstdetails?.Tax?.CgstTotal,
        igstTaxType: gstdetails?.Tax?.IgstTaxType,
        cgstTotal: gstdetails?.Tax?.CgstTotal,
        igstTotal: gstdetails?.Tax?.IgstTotal,
        gstDetails: gstdetails?.gstDetails,
        MobileNo: Party?.contactNumber,
        state: Party?.State,
        city: Party?.City,
        orderItems: Product,
        // DateofDelivery: dateofDelivery,
      };
      debugger;
      await _Put(Sales_Edit_Order, Params.id, payload)
        .then(res => {
          setLoading(false);
          History.goBack();
          swal("success", "Order Edited Successfully", "success");
        })
        .catch(err => {
          setLoading(false);
          swal("error", "Error Occured", "error");
        });
    } else {
      swal("Error", `Your Max Limit is ${CustomerLimit}`);
    }
  };

  const onRemove1 = (selectedList, removedItem, index) => {
    console.log(selectedList);
  };
  return (
    <div>
      <div>
        <Card>
          <Row className="m-1">
            <Col className="">
              <div>
                <h1 className="">{Mode && Mode} Sales Order</h1>
              </div>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className="btn float-right"
                    color="danger"
                    onClick={() => history.goBack()}
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>

          <CardBody>
            {Loading ? (
              <>
                <div className="d-flex justify-content-center p-5">
                  Loading...
                </div>
              </>
            ) : (
              <>
                <Form className="m-1" onSubmit={submitHandler}>
                  <Row>
                    {PartyLogin && PartyLogin ? null : (
                      <>
                        <Col className="mb-1" lg="4" md="4" sm="12">
                          <div className="">
                            <Label>
                              Choose Party{" "}
                              <span style={{ color: "red" }}> *</span>
                            </Label>

                            <Multiselect
                              required
                              selectedValues={Party !== null && [Party]}
                              selectionLimit={1}
                              isObject="false"
                              options={PartyList}
                              onSelect={(selectedList, selectedItem) =>
                                handleSelectionParty(selectedList, selectedItem)
                              }
                              onRemove={onRemove1}
                              displayValue="firstName"
                            />
                          </div>
                        </Col>
                        {/* <Col className="mb-1" lg="4" md="4" sm="12">
                      <div className="">
                        <Label>Expected Delivery Date</Label>
                        <Input
                          required
                          type="date"
                          name="DateofDelivery"
                          value={dateofDelivery}
                          onChange={(e) => setDateofDelivery(e.target.value)}
                        />
                      </div>
                    </Col> */}
                      </>
                    )}
                    <Col className="mb-1" lg="4" md="4" sm="12"></Col>
                  </Row>
                  {product &&
                    product?.map((product, index) => (
                      <Row className="" key={index}>
                        <Col>
                          <div className="viewspacebetween">
                            <div className="viewspacebetween0">
                              <Label>
                                Product <span style={{ color: "red" }}> *</span>
                              </Label>
                              <Multiselect
                                required
                                selectedValues={
                                  product?.productData && [product?.productData]
                                }
                                selectionLimit={1}
                                isObject="false"
                                options={ProductList}
                                onSelect={(selectedList, selectedItem) =>
                                  handleSelection(
                                    selectedList,
                                    selectedItem,
                                    index
                                  )
                                }
                                onRemove={(selectedList, selectedItem) => {
                                  onRemove1(selectedList, selectedItem, index);
                                }}
                                displayValue="Product_Title" // Property name to display in the dropdown options
                              />
                            </div>

                            <div
                              className="viewspacebetween3"
                              style={{ width: "84px" }}
                            >
                              <Label>HSN</Label>
                              <Input
                                readOnly
                                type="text"
                                name="HSN_Code"
                                placeholder="HSN_Code"
                                required
                                value={product?.HSN_Code}
                              />
                            </div>

                            <div
                              className="viewspacebetween3"
                              style={{ width: "84px" }}
                            >
                              <Label>Gross Unit</Label>
                              <Input
                                type="text"
                                name="secondaryUnit"
                                readOnly
                                placeholder="Gross Unit"
                                value={product.secondaryUnit}
                              />
                            </div>

                            <div
                              className="viewspacebetween3"
                              style={{ width: "84px" }}
                            >
                              <Label>Gross Qty</Label>
                              <Input
                                type="number"
                                readOnly
                                // name="qty"
                                // min={0}
                                placeholder="Gross Qty"
                                // required
                                // autocomplete="off"
                                value={(
                                  product?.qty / product?.secondarySize
                                )?.toFixed(2)}
                                // onChange={(e) => handleRequredQty(e, index)}
                              />
                            </div>
                            <div
                              className="viewspacebetween2"
                              style={{ width: "90px" }}
                            >
                              <Label>
                                Avail Qty{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Label>
                              <Input
                                type="number"
                                name="availQty"
                                min={0}
                                placeholder="availableQty"
                                readOnly
                                autocomplete="off"
                                value={product?.availableQty}
                                // onChange={e =>
                                //   handleRequredQty(e, index, product?.availableQty)
                                // }
                              />
                            </div>
                            <div
                              className="viewspacebetween3"
                              style={{ width: "84px" }}
                            >
                              <Label>Net Qty</Label>
                              <Input
                                type="number"
                                name="qty"
                                min={0}
                                placeholder="Req_Qty"
                                required
                                autocomplete="off"
                                value={product?.qty}
                                onChange={e =>
                                  handleRequredQty(
                                    e,
                                    index,
                                    product?.availableQty
                                  )
                                }
                              />
                            </div>

                            <div
                              className="viewspacebetween3"
                              style={{ width: "84px" }}
                            >
                              <Label>Net Unit</Label>
                              <Input
                                readOnly
                                type="text"
                                name="primaryUnit"
                                // min={0}
                                placeholder="Net Unit"
                                required
                                value={product?.primaryUnit}
                                // onChange={(e) => handleRequredQty(e, index)}
                              />
                            </div>

                            <div
                              className="viewspacebetween3"
                              style={{ width: "84px" }}
                            >
                              <Label>Sales Price</Label>
                              <Input
                                type="number"
                                name="price"
                                readOnly
                                placeholder="Price"
                                value={product.price}
                              />
                            </div>

                            <div
                              className="viewspacebetween3"
                              style={{ width: "84px" }}
                            >
                              <Label>Dis. %</Label>
                              <Input
                                type="number"
                                name="price"
                                readOnly
                                placeholder="Discount %"
                                value={product.disCountPercentage}
                              />
                            </div>

                            <div
                              className="viewspacebetween3"
                              style={{ width: "84px" }}
                            >
                              <Label>Tax %</Label>
                              <Input
                                type="text"
                                name="gstPercentage"
                                disabled
                                placeholder="GST Percentage %"
                                value={product.gstPercentage}
                              />
                            </div>

                            <div
                              className="viewspacebetween3"
                              style={{ width: "84px" }}
                            >
                              <Label>Basic Price</Label>
                              <Input
                                type="number"
                                name="basicPrice"
                                readOnly
                                placeholder="Basic Price"
                                value={product.basicPrice}
                              />
                            </div>

                            <div
                              className="viewspacebetween3"
                              style={{ width: "84px" }}
                            >
                              <Label>Basic Total</Label>
                              <Input
                                type="number"
                                name="taxableAmount"
                                disabled
                                placeholder="taxle Amount"
                                value={product.taxableAmount}
                              />
                            </div>
                          </div>
                        </Col>
                        {/* <Col className="mb-1">
                      <div className="">
                        <Label>Unit</Label>
                        <Multiselect
                          required
                          selectionLimit={1}
                          isObject="false"
                          options={UnitList}
                          onSelect={(selectedList, selectedItem) =>
                            handleSelectionUnit(
                              selectedList,
                              selectedItem,
                              index
                            )
                          }
                          onRemove={(selectedList, selectedItem) => {
                            onRemove1(selectedList, selectedItem, index);
                          }}
                          displayValue="primaryUnit"
                        />
                      </div>
                    </Col> */}
                        {/* <Col className="mb-1">
                      <div className="">
                        <Label>Price</Label>
                        <Input
                          type="number"
                          name="price"
                          disabled
                          placeholder="Price"
                          value={product.price}
                        />
                      </div>
                    </Col> */}

                        {/* <Col className="mb-1">
                      <div className="">
                        <Label>Taxable</Label>
                        <Input
                          type="number"
                          name="taxableAmount"
                          disabled
                          placeholder="taxle Amount"
                          value={product.taxableAmount}
                        />
                      </div>
                    </Col> */}

                        {/* {GSTData?.Tax?.IgstTaxType ? (
                      <>
                        <Col className="mb-1">
                          <div className="">
                            <Label>IGST</Label>
                            <Input
                              type="number"
                              name="igstRate"
                              readOnly
                              placeholder="igstRate"
                              value={product.igstRate}
                            />
                          </div>
                        </Col>
                      </>
                    ) : (
                      <>
                        <Col className="mb-1">
                          <div className="">
                            <Label>SGST</Label>
                            <Input
                              type="number"
                              name="sgstRate"
                              readOnly
                              placeholder="sgstRate"
                              value={product.sgstRate}
                            />
                          </div>
                        </Col>
                        <Col className="mb-1">
                          <div className="">
                            <Label>CGST</Label>
                            <Input
                              type="number"
                              name="cgstRate"
                              readOnly
                              placeholder="cgstRate"
                              value={product.cgstRate}
                            />
                          </div>
                        </Col>
                      </>
                    )} */}
                        {/* <Col className="mb-1">
                      <div className="">
                        <Label>Total Price</Label>
                        <Input
                          type="number"
                          name="grandTotal"
                          readOnly
                          placeholder="TtlPrice"
                          value={product.grandTotal}
                        />
                      </div>
                    </Col> */}

                        <Col className="d-flex mt-1 abb">
                          <div className="btnStyle">
                            {index ? (
                              <Button
                                type="button"
                                style={{ padding: "16px 16px" }}
                                color="danger"
                                className="button remove cancel"
                                size="sm"
                                onClick={() => removeMoreProduct(index)}
                              >
                                X
                              </Button>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                    ))}
                  <Row>
                    <Col>
                      <div className="btnStyle float-right">
                        <Button
                          className="ml-1 mb-1"
                          color="primary"
                          type="button"
                          size="sm"
                          onClick={() => addMoreProduct()}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mb-1 mt-1" lg="12" md="12" sm="12">
                      <div className=" d-flex justify-content-end">
                        <ul className="subtotal">
                          <li>
                            <div className="totalclas">
                              <span className="">Total:</span>
                              <span className="">
                                {!!GSTData?.Tax?.Amount && GSTData?.Tax?.Amount
                                  ? (GSTData?.Tax?.Amount).toFixed(2)
                                  : 0}
                              </span>
                            </div>
                          </li>
                          {GSTData?.Tax?.IgstTaxType &&
                          GSTData?.Tax?.IgstTaxType ? (
                            <li>
                              <div className="totalclas">
                                <span className="">IGST Tax: </span>
                                <strong>
                                  {!!GSTData?.Tax?.IgstTotal &&
                                  GSTData?.Tax?.IgstTotal
                                    ? (GSTData?.Tax?.IgstTotal).toFixed(2)
                                    : 0}
                                </strong>
                              </div>
                            </li>
                          ) : (
                            <>
                              <li>
                                <div className="totalclas">
                                  <span className="">SGST Tax: </span>
                                  <strong>
                                    {!!GSTData?.Tax?.SgstTotal &&
                                    GSTData?.Tax?.SgstTotal
                                      ? (GSTData?.Tax?.SgstTotal).toFixed(2)
                                      : 0}
                                  </strong>
                                </div>
                              </li>
                              <li>
                                <div className="totalclas">
                                  <span className="">CGST Tax: </span>
                                  <strong>
                                    {!!GSTData?.Tax?.CgstTotal &&
                                    GSTData?.Tax?.CgstTotal
                                      ? (GSTData?.Tax?.CgstTotal).toFixed(2)
                                      : 0}
                                  </strong>
                                </div>
                              </li>
                            </>
                          )}
                          <hr />
                          <li>
                            {" "}
                            <div className="totalclas">
                              <span className="">Grand Total : </span>
                              <strong>
                                {!!GSTData?.Tax?.GrandTotal
                                  ? (GSTData?.Tax?.GrandTotal).toFixed(2)
                                  : 0}
                              </strong>
                            </div>
                          </li>
                          <hr />
                        </ul>
                      </div>
                    </Col>
                  </Row>

                  {!Loading && !Loading ? (
                    <>
                      {GSTData?.Tax?.GrandTotal > 0 && (
                        <Row>
                          <Col>
                            <div className="d-flex justify-content-center">
                              <Button
                                color="primary"
                                type="submit"
                                className="mt-2"
                              >
                                {Mode && Mode}
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      )}
                    </>
                  ) : (
                    <Row>
                      <Col>
                        <div className="d-flex justify-content-center">
                          <Button color="secondary" className="mt-2">
                            Loading...
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Form>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default EditOrder;

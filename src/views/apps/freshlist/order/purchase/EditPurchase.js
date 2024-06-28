import React, { useEffect, useState, useContext } from "react";

import { Route } from "react-router-dom";
import { history } from "../../../../../history";

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
import "../../../../../assets/scss/pages/users.scss";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  CreateCustomerList,
  _Get,
  SavePurchaseOrder,
  _Put,
} from "../../../../../ApiEndPoint/ApiCalling";
import { useParams, useLocation, useHistory } from "react-router-dom";

import "../../../../../assets/scss/pages/users.scss";

import UserContext from "../../../../../context/Context";
import { PurchaseGstCalculation } from "./../PurchaseGstCalculation";
import {
  PurchaseProductList_Product,
  Purchase_Edit_Order,
  Purchase_OrderViewOne,
} from "../../../../../ApiEndPoint/Api";
let GrandTotal = [];
let SelectedITems = [];
let SelectedSize = [];
let PartyListdata = [];
let selectedLandedPrice = [];

const EditPurchase = (args) => {
  const [Index, setIndex] = useState("");
  const [Mode, setMode] = useState("Create");
  const [PartyLogin, setPartyLogin] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [ProductList, setProductList] = useState([]);
  const [GSTData, setGSTData] = useState({});
   const [Charges, setCharges] = useState(100);

   const [PartyList, setPartyList] = useState([]);
   const [PartyId, setPartyId] = useState("");
   const [Party, setParty] = useState(null);
   const [UnitList, setUnitList] = useState([]);
   const [UserInfo, setUserInfo] = useState({});
   const [maxGst, setmaxGst] = useState({});
   const [LandedPrice, setLandedPrice] = useState([]);
   const [dateofDelivery, setDateofDelivery] = useState("");
   const Params = useParams();
   const [modal, setModal] = useState(false);

   const toggle = (e) => {
     e.preventDefault();
     setModal(!modal);
     product?.forEach((ele) => {
       if (typeof ele?.gstPercentage == "number") {
         return ele;
       } else {
         if (ele?.gstPercentage?.includes("+")) {
           ele["gstPercentage"] = ele?.gstPercentage?.split("+")[0] * 2;
           return ele;
         } else {
           return ele;
         }
       }
     });

     const maxGst = product.reduce(function (prev, current) {
       return prev && prev?.gstPercentage > current?.gstPercentage
         ? prev
         : current;
     });
     setmaxGst(maxGst);
     product.forEach((ele) => {
       ele["landedCost"] = ele?.basicPrice;
     });
     debugger;
   };

   let History = useHistory();
   const [product, setProduct] = useState([
     {
       productId: "",
       productData: "",
       disCountPercentage: "",
       availableQty: "",
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

   const handleChangePrice = (e, index) => {
     const { name, value } = e.target;
     if (Number(value != 0)) {
       setIndex(index);
       const list = [...product];
       list[index][name] = Number(value);
       debugger;
       if (typeof list[index].gstPercentage == "number") {
         list[index]["price"] = Number(
           (
             Number(value) *
             ((100 + Number(list[index].gstPercentage)) / 100)
           ).toFixed(2)
         );
       } else {
         list[index]["price"] = Number(
           (
             Number(value) *
             ((100 + Number(list[index]?.gstPercentage?.split("+")[0] * 2)) /
               100)
           ).toFixed(2)
         );
       }
       // list[index]["price"] = Number(value);
       let amt = 0;
       if (list?.length > 0) {
         const x = list?.map((val) => {
           GrandTotal[index] = val.qty * val.price;
           list[index]["totalprice"] = val.qty * val.price;
           return val.qty * val.price;
         });
         amt = x.reduce((a, b) => a + b);
       }
       // let taxableAmount = Number(
       //   ((e.target.value * ele?.qty * (100 + wholeGst)) / 100).toFixed(2)
       // );
       const gstdetails = PurchaseGstCalculation(Party, list, Context, Charges);
       setGSTData(gstdetails);
       list[index]["taxableAmount"] = gstdetails?.gstDetails[index]?.taxable;
       list[index]["sgstRate"] = gstdetails?.gstDetails[index]?.sgstRate;
       list[index]["cgstRate"] = gstdetails?.gstDetails[index]?.cgstRate;
       list[index]["igstRate"] = gstdetails?.gstDetails[index]?.igstRate;
       list[index]["grandTotal"] = gstdetails?.gstDetails[index]?.grandTotal;
       list[index]["gstPercentage"] =
         gstdetails?.gstDetails[index]?.gstPercentage;
       list[index]["disCountPercentage"] =
         gstdetails?.gstDetails[index]?.discountPercentage;
       setProduct(list);
     }
   };
   const handleRequredQty = (e, index) => {
     const { name, value } = e.target;
     if (Number(value != 0)) {
       setIndex(index);
       const list = [...product];
       list[index][name] = Number(value);
       let amt = 0;
       if (list?.length > 0) {
         const x = list?.map((val) => {
           GrandTotal[index] = val.qty * val.basicPrice;
           list[index]["totalprice"] = val.qty * val.basicPrice;
           return val.qty * val.basicPrice;
         });
         amt = x.reduce((a, b) => a + b);
       }

       const gstdetails = PurchaseGstCalculation(Party, list, Context, Charges);
       setGSTData(gstdetails);
       list[index]["taxableAmount"] = gstdetails?.gstDetails[index]?.taxable;
       list[index]["sgstRate"] = gstdetails?.gstDetails[index]?.sgstRate;
       list[index]["cgstRate"] = gstdetails?.gstDetails[index]?.cgstRate;
       list[index]["igstRate"] = gstdetails?.gstDetails[index]?.igstRate;
       list[index]["grandTotal"] = gstdetails?.gstDetails[index]?.grandTotal;
       list[index]["gstPercentage"] =
         gstdetails?.gstDetails[index]?.gstPercentage;
       list[index]["disCountPercentage"] =
         gstdetails?.gstDetails[index]?.discountPercentage;
       setProduct(list);
     }
   };

   const handleAddLandedPrice = (e, index) => {
     let { name, value } = e.target;
     selectedLandedPrice[index] = Number(value);
     let sum = selectedLandedPrice?.reduce((a, b) => a + b, 0);
     let landedTax = Number(((sum * maxGst?.gstPercentage) / 100).toFixed(2));
     setLandedPrice({
       ...LandedPrice,
       ["landedTax"]: landedTax,
       [name]: Number(value),
     });
     // debugger;
     let TotalExpenses = Number(
       (sum * (100 + maxGst?.gstPercentage) * 100).toFixed(2)
     );
     let LandedPercentage = Number(
       (TotalExpenses / (GSTData?.Tax?.Amount * 100)).toFixed(2)
     );
     product.forEach((ele) => {
       ele["landedCost"] = Number(
         ((ele?.basicPrice * (100 + Number(LandedPercentage))) / 100).toFixed(2)
       );
     });
   };

   const handleSelectionParty = (selectedList, selectedItem) => {
     setPartyId(selectedItem._id);
     setParty(selectedItem);
     const gstdetails = PurchaseGstCalculation(
       selectedItem,
       product,
       Context,
       Charges
     );
     setGSTData(gstdetails);
   };

   const handleSelection = async (selectedList, selectedItem, index) => {
     const userdata = JSON.parse(localStorage.getItem("userData"));
     SelectedITems.push(selectedItem);
     let costPrice = Number(
       (
         selectedItem?.Product_MRP /
         (((100 + Number(Party?.category?.discount ? 0 : 0)) / 100) *
           ((100 + Number(selectedItem?.GSTRate)) / 100))
       ).toFixed(2)
     );
     setProduct((prevProductList) => {
       const updatedProductList = [...prevProductList];
       const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
       updatedProduct.price = selectedItem?.Product_MRP; // Update the price of the copied product
       updatedProduct.productId = selectedItem?._id;
       updatedProduct.discount = Party?.category?.discount;
       updatedProduct.HSN_Code = selectedItem?.HSN_Code;
       updatedProduct.productData = selectedItem;
       updatedProduct.basicPrice = costPrice;
       updatedProduct.primaryUnit = selectedItem?.primaryUnit;
       updatedProduct.secondaryUnit = selectedItem?.secondaryUnit;
       updatedProduct.secondarySize = selectedItem?.secondarySize;

       updatedProduct.disCountPercentage =
         Party?.Category?.discount && Party?.Category?.discount
           ? Party?.Category?.discount
           : 0;

       updatedProductList[index] = updatedProduct;
       const gstdetails = PurchaseGstCalculation(
         Party,
         updatedProductList,
         Context,
         Charges
       );
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
     setProduct((prevProductList) => {
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

       const gstdetails = PurchaseGstCalculation(
         Party,
         updatedUnitList,
         Context,
         Charges
       );

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
         .then((res) => {
           setProductList(res?.Product);
         })
         .catch((err) => {
           console.log(err);
         });
       await CreateCustomerList(userdata?._id, userdata?.database)
         .then((res) => {
           let value = res?.Customer;
           if (value?.length) {
             setPartyList(value);
             PartyListdata = value;
           }
         })
         .catch((err) => {
           console.log(err);
         });
       setMode("Update");
       await _Get(Purchase_OrderViewOne, Params?.id)
         .then((res) => {
           let value = res?.orderHistory;
           let selectedParty = PartyListdata?.filter(
             (ele) => ele?._id == value?.partyId?._id
           );
           setParty(selectedParty[0]);
           let values = res?.orderHistory;
           setLandedPrice({
             transportationCost: values?.transportationCost,
             LabourCost: values?.labourCost,
             LocalFreight: values?.localFreight,
             MiscellanousCost: values?.miscellaneousCost,
             landedTax: values?.tax,
           });
           setPartyId(value?.partyId?._id);
           setCharges(res?.orderHistory?.coolieAndCartage);
           let updatedProduct = value?.orderItems;
           // const updatedProduct = { ...updatedProductList[index] };
           let order = value?.orderItems?.map((element, index) => {
             debugger;
             let costPrice = Number(
               (
                 element?.productId?.Product_MRP /
                 (((100 +
                   Number(selectedParty[0]?.category?.discount ? 0 : 0)) /
                   100) *
                   ((100 + Number(element?.productId?.GSTRate)) / 100))
               ).toFixed(2)
             );
             SelectedITems.push(element?.productId);
             // const updatedProductList = [...prevProductList];
             // const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
             updatedProduct[index]["price"] = element?.productId?.Product_MRP; // Update the price of the copied product
             updatedProduct[index]["basicPrice"] = costPrice; // Update the price of the copied product
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
             const gstdetails = PurchaseGstCalculation(
               selectedParty[0],
               updatedProduct,
               Context,
               res?.orderHistory?.coolieAndCartage
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
         .catch((err) => {
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
         disCountPercentage: "",
         availableQty: "",
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
   let removeMoreProduct = (i) => {
     let newFormValues = [...product];
     newFormValues.splice(i, 1);
     GrandTotal.splice(i, 1);

     setProduct(newFormValues);
     const gstdetails = PurchaseGstCalculation(
       Party,
       newFormValues,
       Context,
       Charges
     );
     setGSTData(gstdetails);
   };

   const submitHandler = async (e) => {
     e.preventDefault();
     setLoading(true);
     const gstdetails = PurchaseGstCalculation(
       Party,
       product,
       Context,
       Charges
     );
     const fullname = UserInfo?.firstName + " " + UserInfo?.lastName;
     debugger;
     let Product = product?.map((ele) => {
       if (ele?.disCountPercentage > 1) {
         return {
           igstTaxType: gstdetails?.Tax?.IgstTaxType,
           productId: ele?.productId,
           productData: ele?.productData,
           discountPercentage: ele?.disCountPercentage,
           availableQty: ele?.availableQty,
           qty: ele?.qty,
           price: ele?.price,
           basicPrice: ele?.basicPrice,
           landedCost: ele?.landedCost,
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
           basicPrice: ele?.basicPrice,
           landedCost: ele?.landedCost,
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
       //  roundOff: Number(
       //    ( gstdetails?.Tax?.RoundOff).toFixed(2)
       //  ),
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
       coolieAndCartage: Charges,
       transportationCost: LandedPrice?.transportationCost,
       labourCost: LandedPrice?.LabourCost,
       localFreight: LandedPrice?.LocalFreight,
       miscellaneousCost: LandedPrice?.MiscellanousCost,
       tax: LandedPrice?.landedTax,
       maxGstPercentage: Number(gstdetails?.Tax?.maxGst),
       // DateofDelivery: dateofDelivery,
     };
     // await SavePurchaseOrder(payload)
     //   .then((res) => {
     //     setLoading(false);
     //     swal("Purchase Order Added Successfully");
     //     history.goBack();
     //   })
     //   .catch((err) => {
     //     swal("SomeThing Went Wrong");

     //     setLoading(false);
     //     console.log(err);
     //   });
     await _Put(Purchase_Edit_Order, Params.id, payload)
       .then((res) => {
         setLoading(false);

         History.goBack();
         swal("success", "Order Updated Successfully", "success");
       })
       .catch((err) => {
         setLoading(false);
         swal("error", "Error Occured", "error");
       });
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
                 <h1 className="">{Mode && Mode} Purchase Order</h1>
               </div>
             </Col>

             <Col>
               <Route
                 render={({ history }) => (
                   <Button
                     className="btn float-right"
                     color="danger"
                     onClick={() => history.goBack()}>
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
                 <Form

                 //  onSubmit={submitHandler}
                 >
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
                                 handleSelectionParty(
                                   selectedList,
                                   selectedItem
                                 )
                               }
                               onRemove={onRemove1}
                               displayValue="firstName"
                             />
                           </div>
                         </Col>
                         <Col className="mb-1" lg="4" md="4" sm="12">
                           <div className="">
                             <Label>Coolie and Cartage</Label>
                             <Input
                               type="text"
                               name="cooliecharges"
                               placeholder="Coolie and Cartage charges"
                               value={Charges}
                               onChange={(e) => {
                                 setCharges(Number(e.target.value));
                                 const list = [...product];
                                 const gstdetails = PurchaseGstCalculation(
                                   Party,
                                   list,
                                   Context,
                                   Number(e.target.value)
                                 );
                                 setGSTData(gstdetails);
                               }}
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
                             <div className="" style={{ width: "300px" }}>
                               <Label>
                                 Product Name{" "}
                                 <span style={{ color: "red" }}> *</span>
                               </Label>
                               <Multiselect
                                 required
                                 selectedValues={
                                   product?.productData && [
                                     product?.productData,
                                   ]
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
                               className="viewspacebetween1"
                               style={{ width: "90px" }}>
                               <Label>HSN</Label>
                               <Input
                                 readOnly
                                 type="text"
                                 name="HSN_Code"
                                 placeholder="HSN_Code"
                                 required
                                 value={product?.HSN_Code}
                                 // onChange={(e) => handleRequredQty(e, index)}
                               />
                             </div>

                             <div
                               className="viewspacebetween1"
                               style={{ width: "90px" }}>
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
                               className="viewspacebetween1"
                               style={{ width: "90px" }}>
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
                                 ).toFixed(2)}
                                 // onChange={(e) => handleRequredQty(e, index)}
                               />
                             </div>

                             <div
                               className="viewspacebetween1"
                               style={{ width: "90px" }}>
                               <Label>Net Qty</Label>
                               <Input
                                 type="number"
                                 name="qty"
                                 min={0}
                                 placeholder="Req_Qty"
                                 required
                                 autocomplete="off"
                                 value={product?.qty}
                                 onChange={(e) => handleRequredQty(e, index)}
                               />
                             </div>

                             <div
                               className="viewspacebetween1"
                               style={{ width: "90px" }}>
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

                             {/* <div className="viewspacebetween1" style={{width:'90px'}}>
                          <Label>Sales Price</Label>
                          <Input
                            type="number"
                            readOnly
                            name="price"
                            disabled
                            placeholder="Price"
                            value={product.price}
                          />
                        </div> */}

                             {/* <div className="viewspacebetween1" style={{width:'90px'}}>
                            <Label>Dis. %</Label>
                            <Input
                              type="number"
                              name="price"
                              disabled
                              placeholder="Discount %"
                              value={product.disCountPercentage}
                            />
                          </div> */}
                             <div
                               className="viewspacebetween1"
                               style={{ width: "90px" }}>
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
                               className="viewspacebetween1"
                               style={{ width: "90px" }}>
                               <Label>Basic Price</Label>
                               <Input
                                 min={1}
                                 type="number"
                                 name="basicPrice"
                                 placeholder="Basic Price"
                                 value={product.basicPrice}
                                 onChange={(e) => handleChangePrice(e, index)}
                               />
                             </div>

                             <div
                               className="viewspacebetween1"
                               style={{ width: "90px" }}>
                               <Label>Basic Total</Label>
                               <Input
                                 type="number"
                                 name="taxableAmount"
                                 disabled
                                 placeholder="Basic Total"
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
                                 onClick={() => removeMoreProduct(index)}>
                                 X
                               </Button>
                             ) : null}
                           </div>
                         </Col>
                       </Row>
                     ))}
                   <Row>
                     <Col>
                       <div className="btnStyle" style={{ float: "right" }}>
                         <Button
                           className="ml-1 mb-1"
                           color="primary"
                           type="button"
                           size="sm"
                           onClick={() => addMoreProduct()}>
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
                               <span className="">Basic Total:</span>
                               <span className="">
                                 {!!GSTData?.Tax?.Amount && GSTData?.Tax?.Amount
                                   ? (GSTData?.Tax?.Amount).toFixed(2)
                                   : 0}
                               </span>
                             </div>
                           </li>
                           <li>
                             <div className="totalclas">
                               <span className="">Charges:</span>
                               <span className="">
                                 {!!Charges && Charges ? Charges.toFixed(2) : 0}
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
                 </Form>
                 {!Loading && !Loading ? (
                   <>
                     {GSTData?.Tax?.GrandTotal > 0 && (
                       <Row>
                         <Col>
                           <div className="d-flex justify-content-center">
                             <Button
                               onClick={toggle}
                               color="primary"
                               type="submit"
                               className="mt-2">
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
               </>
             )}
           </CardBody>
         </Card>
       </div>
       <Modal size="lg" isOpen={modal} toggle={toggle} {...args}>
         <ModalHeader toggle={toggle}>Update</ModalHeader>
         <ModalBody>
           <div className="p-2">
             <Form onSubmit={submitHandler}>
               <div className="d-flex justify-content-center p-2">
                 <h4>Update Landed Price</h4>
               </div>
               <Row className="mt-2">
                 <Col lg="4" md="6" sm="6" className="mb-1">
                   <Label>Transportation Cost</Label>
                   <Input
                     required
                     type="number"
                     name="transportationCost"
                     value={LandedPrice?.transportationCost}
                     onChange={(e) => handleAddLandedPrice(e, 0)}
                     placeholder="Transportation cost"
                   />
                 </Col>
                 <Col lg="4" md="6" sm="6" className="mb-1">
                   <Label>Labour Cost</Label>
                   <Input
                     required
                     type="number"
                     name="LabourCost"
                     onChange={(e) => handleAddLandedPrice(e, 1)}
                     value={LandedPrice?.LabourCost}
                     placeholder="Labour Cost"
                   />
                 </Col>
                 <Col lg="4" md="6" sm="6" className="mb-1">
                   <Label>Local Freight</Label>
                   <Input
                     required
                     type="number"
                     value={LandedPrice?.LocalFreight}
                     name="LocalFreight"
                     onChange={(e) => handleAddLandedPrice(e, 2)}
                     placeholder="LocalFreight cost"
                   />
                 </Col>
                 <Col lg="4" md="6" sm="6" className="mb-1">
                   <Label>Miscellaneous Cost</Label>
                   <Input
                     required
                     type="number"
                     name="MiscellanousCost"
                     value={LandedPrice?.MiscellanousCost}
                     onChange={(e) => handleAddLandedPrice(e, 3)}
                     placeholder="MiscellanousCost cost"
                   />
                 </Col>
                 <Col lg="4" md="6" sm="6" className="mb-1">
                   <Label>Tax</Label>
                   <Input
                     readOnly
                     type="number"
                     name="landedTax"
                     value={LandedPrice?.landedTax}
                     onChange={(e) => handleAddLandedPrice(e, 4)}
                     placeholder="Tax"
                   />
                 </Col>
               </Row>
               <Row>
                 {!Loading ? (
                   <>
                     <Col>
                       <div className="d-flex justify-content-center">
                         <Button color="primary" type="submit" className="mt-2">
                           Submit
                         </Button>
                       </div>
                     </Col>
                   </>
                 ) : (
                   <>
                     <Col>
                       <div className="d-flex justify-content-center">
                         <Button color="secondary" className="mt-2">
                           Loading...
                         </Button>
                       </div>
                     </Col>
                   </>
                 )}
               </Row>
             </Form>
           </div>
         </ModalBody>
         {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
       </Modal>
     </div>
   );
};
export default EditPurchase;

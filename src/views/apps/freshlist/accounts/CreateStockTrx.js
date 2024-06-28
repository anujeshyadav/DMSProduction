import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  Label,
  Button,
  Badge,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";

import "../../../../assets/scss/pages/users.scss";
import {
  ProductListView,
  UnitListView,
  StocktrxFtoW,
  WarehousetoWareHouseTrx,
  _Get,
} from "../../../../ApiEndPoint/ApiCalling";
import "../../../../assets/scss/pages/users.scss";
import { Route } from "react-router-dom";
import { WareahouseList_For_addProduct } from "../../../../ApiEndPoint/Api";

let GrandTotal = [];
let SelectedITems = [];
let SelectedSize = [];
const CreateTarget = (args) => {
  let history = useHistory();
  const [formData, setFormData] = useState({});
  const [Index, setIndex] = useState("");
  const [StockTrxdate, setStockTrxDate] = useState("");
  const [index, setindex] = useState("");
  const [error, setError] = useState("");
  const [ProductList, setProductList] = useState([]);
  const [ProductWTWList, setProductWTWList] = useState([]);
  const [WareHouseone, setWareHouseone] = useState([]);
  const [WareHousetwo, setWareHousetwo] = useState([]);
  const [TypeOfTrx, setTypeOfTrx] = useState("");
  const [grandTotalAmt, setGrandTotalAmt] = useState(0);
  const [UnitList, setUnitList] = useState([]);
  const [UserInfo, setUserInfo] = useState({});
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState("");
  const [audit, setAudit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [WareHouselist, setWarehouseList] = useState([]);
  const toggle = (item) => {
    setItems(item);
    setModal(!modal);
  };
  const audittoggle = () => {
    setAudit(!audit);
  };
  const handleopentoggle = (iteam) => {
    toggle(iteam);
  };
  const handleHistory = () => {
    audittoggle();
  };
  const [product, setProduct] = useState([
    {
      product: "",
      igstTaxType: false,
      productId: "",
      AvailaleQty: null,
      availableQty: "",
      transferQty: 1,
      price: "",
      gstPercentage: "",
      totalprice: "",
      Size: "",
      unitType: "",
      stockTrxDate: "",
      targetEndDate: "",
      discount: "",
      Shipping: "",
      tax: "",
      grandTotal: "",
    },
  ]);

  const handleProductChangeProduct = (e, index, avalaibleSize) => {
    if (avalaibleSize >= Number(e.target.value)) {
      setIndex(index);
      // console.log(product);

      const { name, value } = e.target;
      const list = [...product];
      if (name.includes("transferQty")) {
        let available = Number(list[index]["AvailaleQty"]);
        let Askingfor = Number(value);
        if (available >= Askingfor) {
          list[index][name] = Askingfor;
        } else {
          swal("Can not Transfer More then Stock");
          list[index][name] = available - 1;
        }
      } else {
        list[index][name] = value;
      }

      let amt = 0;
      if (list.length > 0) {
        const x = list?.map((val) => {
          GrandTotal[index] = val.price * val.transferQty;
          list[index]["totalprice"] = val.price * val.transferQty;
          return val.price * val.transferQty;
        });
        amt = x.reduce((a, b) => a + b);
        console.log("GrandTotal", amt);
      }
      // console.log(list)
      setProduct(list);
      setGrandTotalAmt(amt);
    } else {
      return null;
    }
  };
  const handleProductChangeProductone = (e, index) => {
    setIndex(index);

    const { name, value } = e.target;
    const list = [...product];
    if (name.includes("transferQty")) {
      list[index][name] = Number(value);
    } else {
      list[index][name] = value;
    }
    console.log(GrandTotal);

    let amt = 0;
    if (list.length > 0) {
      const x = list?.map((val) => {
        GrandTotal[index] = val.price * val.transferQty;
        list[index]["totalprice"] = val.price * val.transferQty;
        return val.price * val.transferQty;
      });
      amt = x.reduce((a, b) => a + b);
    }
    setProduct(list);
    setGrandTotalAmt(amt);
  };

  const handleRemoveSelected = (selectedList, selectedItem, index) => {
    SelectedITems.splice(index, 1);
    let myarr = product?.map((ele, i) => {
      let indextotal = ele?.qty * SelectedITems[i]?.Product_MRP;
      GrandTotal[index] = indextotal;
      return indextotal;
    });

    let amt = myarr?.reduce((a, b) => a + b);
    setGrandTotalAmt(amt);
  };
  const handleRemoveSelectedone = (selectedList, selectedItem, index) => {
    SelectedSize.splice(index, 1);
    let myarr = product?.map((ele, i) => {
      console.log(ele?.price * SelectedSize[i]?.unitQty);
      let indextotal = SelectedSize[i]?.unitQty;
      GrandTotal[index] = indextotal;
      return indextotal;
    });

    let amt = myarr.reduce((a, b) => a + b);
    setGrandTotalAmt(amt);
  };
  const handleSelection = (selectedList, selectedItem, index) => {
    SelectedITems.push(selectedItem);
    setProduct((prevProductList) => {
      const updatedProductList = [...prevProductList]; // Create a copy of the productList array
      const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
      updatedProduct.price = selectedItem?.price; // Update the price of the copied product
      updatedProduct.product = selectedItem?.productId; // Update the price of the copied product
      updatedProduct.productId = selectedItem?.productId?._id;
      updatedProduct.discount = selectedItem?.discount;
      updatedProduct.Size = selectedItem?.primaryUnit;
      updatedProduct.igstTaxType = selectedItem?.igstTaxType;
      updatedProduct.AvailaleQty = selectedItem?.currentStock;
      updatedProduct.gstPercentage = selectedItem?.gstPercentage;
      // updatedProduct.AvailaleQty =
      //   selectedItem?.currentStock /
      //   (selectedItem?.Size > 1 ? selectedItem?.Size : 1);
      updatedProductList[index] = updatedProduct; // Replace the product at the specified index with the updated one

      return updatedProductList; // Return the updated product list to set the state
    });
  };
  const handleSelectionProduct = (selectedList, selectedItem, index) => {
    SelectedITems.push(selectedItem);
    setProduct((prevProductList) => {
      const updatedProductList = [...prevProductList]; // Create a copy of the productList array
      const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
      updatedProduct.price = selectedItem?.Product_MRP; // Update the price of the copied product
      updatedProduct.productId = selectedItem?._id;
      updatedProduct.AvailaleQty = selectedItem?.Size;
      updatedProductList[index] = updatedProduct; // Replace the product at the specified index with the updated one

      return updatedProductList; // Return the updated product list to set the state
    });
  };
  const handleSelectionone = (selectedList, selectedItem, index) => {
    SelectedSize.push(selectedItem);
    setProduct((prevProductList) => {
      const updatedProductList = [...prevProductList]; // Create a copy of the productList array
      const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
      updatedProduct.Size = selectedItem?.unitQty; // Update the price of the copied product
      updatedProduct.unitType = selectedItem?.primaryUnit;
      updatedProductList[index] = updatedProduct; // Replace the product at the specified index with the updated one
      let myarr = prevProductList?.map((ele, i) => {
        console.log(ele?.transferQty * ele?.price * SelectedSize[i]?.unitQty);
        let indextotal =
          ele?.transferQty * ele?.price * SelectedSize[i]?.unitQty;
        GrandTotal[index] = indextotal;
        return indextotal;
      });
      let amt = myarr.reduce((a, b) => a + b);
      setGrandTotalAmt(amt);
      return updatedProductList; // Return the updated product list to set the state
    });
  };
  const handleInputChange = (e, type, i) => {
    const { name, value, checked } = e.target;
    setindex(i);
    if (type == "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          [name]: checked,
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else {
      if (type == "number") {
        if (/^\d{0,10}$/.test(value)) {
          setFormData({
            ...formData,
            [name]: value,
          });
          setError("");
        } else {
          setError(
            "Please enter a valid number with a maximum length of 10 digits"
          );
        }
      } else {
        if (value.length <= 10) {
          setFormData({
            ...formData,
            [name]: value,
          });
          setError("");
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      }
    }
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    _Get(WareahouseList_For_addProduct, userData?.database)
      .then((values) => {
        let value = values?.Warehouse;
        if (value) {
          setWarehouseList(value);
        }
        console.log(value);
      })
      .catch((err) => {
        console.log(err);
      });

    UnitListView(userData?._id, userData?.database)
      .then((res) => {
        console.log(res?.Unit);
        setUnitList(res?.Unit);
      })
      .catch((err) => {
        console.log(err);
      });

    ProductListView(userData?._id, userData?.database)
      .then((res) => {
        console.log(res.Product);
        let AllProduct = res?.Product?.filter(
          (ele) => ele?.addProductType == "Product"
        );

        setProductList(res.Product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userData"));

    setUserInfo(userInfo);
  }, []);

  let addMoreProduct = () => {
    setProduct([
      ...product,
      {
        product: "",
        productId: "",
        igstTaxType: false,
        AvailaleQty: null,
        availableQty: "",
        transferQty: 1,
        price: "",
        gstPercentage: "",
        totalprice: "",
        Size: "",
        unitType: "",
        stockTrxDate: "",
        targetEndDate: "",
        discount: "",
        Shipping: "",
        tax: "",
        grandTotal: "",
      },
    ]);
  };
  let removeMoreProduct = (i) => {
    let newFormValues = [...product];
    newFormValues.splice(i, 1);
    GrandTotal.splice(i, 1);
    let amt = GrandTotal.reduce((a, b) => a + b);
    setGrandTotalAmt(amt);

    setProduct(newFormValues);
  };

  const WareHousetoWareHouse = (e) => {
    e.preventDefault();
    let userdata = JSON.parse(localStorage.getItem("userData"));

    let Allproduct = product?.map((ele, i) => {
      return {
        productId: ele?.productId,
        unitType: ele?.unitType,
        price: ele?.price,
        Size: ele?.Size,
        transferQty: ele?.transferQty,
        totalPrice: ele?.totalprice,
        currentStock: ele?.AvailaleQty,
        igstTaxType: ele?.igstTaxType,
        gstPercentage: ele?.gstPercentage,
      };
    });

    let payload = {
      productItems: Allproduct,
      warehouseToId: WareHousetwo[0]?._id,
      warehouseFromId: WareHouseone[0]?._id,
      stockTransferDate: StockTrxdate,
      grandTotal: grandTotalAmt,
      transferStatus: "InProcess",
      created_by: userdata?._id,
    };
    console.log(payload);
    setLoading(true);
    WarehousetoWareHouseTrx(payload)
      .then((res) => {
        setLoading(false);

        swal("Stock transerffered is Initiated");
        history.goBack();
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
        swal("Something Went Wrong");
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let userdata = JSON.parse(localStorage.getItem("userData"));

    let Allproduct = product?.map((ele, i) => {
      console.log(ele);
      return {
        productId: ele?.productId,
        unitType: ele?.unitType,
        price: ele?.price,
        Size: ele?.Size,
        transferQty: ele?.transferQty,
        totalPrice: ele?.totalprice,
        currentStock: ele?.transferQty * ele?.Size,
      };
    });
    let payload = {
      productItems: Allproduct,
      warehouseToId: WareHouseone[0]?._id,
      stockTransferDate: StockTrxdate,
      grandTotal: grandTotalAmt,
      transferStatus: "InProcess",
      created_by: userdata?._id,
    };

    if (error) {
      swal("Error occured while Entering Details");
    } else {
      StocktrxFtoW(payload)
        .then((res) => {
          swal("Stock Assigned to WareHouse");
          // }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onSelect1 = (selectedList, selectedItem, index) => {
    console.log(selectedList);
    setWareHouseone(selectedList);
  };
  const onSelectone = (selectedList, selectedItem, index) => {
    setWareHouseone(selectedList);
    let MySelectedwarehouseProduct = selectedList[0]?.productItems?.map(
      (ele, i) => {
        return {
          ...ele?.productId,
          ...ele,
          Product_Title: ele?.productId?.Product_Title,
        };
      }
    );

    setProductWTWList(MySelectedwarehouseProduct);
  };
  const onRemove1 = (selectedList, removedItem, index) => {
    console.log(selectedList);
    console.log(index);
  };
  const onRemoveone = (selectedList, removedItem, index) => {
    console.log(selectedList);
    console.log(index);
  };
  const onSelect2 = (selectedList, selectedItem, index) => {
    console.log(selectedList);
    setWareHousetwo(selectedList);
  };
  const onRemove2 = (selectedList, removedItem, index) => {
    console.log(selectedList);
    console.log(index);
  };
  return (
    <div>
      <Card>
        <Row className="m-2">
          <Col lg="8" md="8" sm="8" className="mb-2 mt-1">
            <div>
              <h1 className="">Create Stock Transfer</h1>
              <div className="choose">
                {/* <h4 className="mb-1">Choose Type of Stock trx</h4> */}
                {/* <div
                  className="form-label-group"
                  onChange={(e) => setTypeOfTrx(e.target.value)}>
                  <input
                    required
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Warehousetowarehouse"
                  />
                  <span style={{ marginRight: "20px" }}>
                    Warehouse to Warehouse
                  </span>
                </div> */}
              </div>
            </div>
          </Col>
          <Col>
            <div className="float-right">
              <Route
                render={({ history }) => (
                  <Button
                    style={{ cursor: "pointer" }}
                    className="float-right mr-1"
                    color="primary"
                    onClick={() => history.goBack()}>
                    {" "}
                    Back
                  </Button>
                )}
              />
            </div>
          </Col>
        </Row>
        <CardBody>
          {/* {TypeOfTrx && TypeOfTrx == "Warehousetowarehouse" && ( */}
          <Form className="mx-1" onSubmit={WareHousetoWareHouse}>
            <Row>
              <Col className="mb-1" lg="3" md="3" sm="12">
                <div className="">
                  <Label>Choose Warehouse(from where) *</Label>
                  <Multiselect
                    required
                    selectionLimit={1}
                    isObject="false"
                    options={WareHouselist} // Options to display in the dropdown
                    onSelect={onSelectone} // Function will trigger on select event
                    onRemove={onRemoveone} // Function will trigger on remove event
                    displayValue="warehouseName" // Property name to display in the dropdown options
                  />
                </div>
              </Col>
              <Col className="mb-1" lg="3" md="3" sm="12">
                <div className="">
                  <Label>Choose Warehouse (to be Transfer) * </Label>

                  <Multiselect
                    required
                    selectionLimit={1}
                    isObject="false"
                    options={WareHouselist} // Options to display in the dropdown
                    onSelect={onSelect2} // Function will trigger on select event
                    onRemove={onRemove2} // Function will trigger on remove event
                    displayValue="warehouseName" // Property name to display in the dropdown options
                  />
                </div>
              </Col>
              <Col className="mb-1" lg="2" md="2" sm="12">
                <div className="">
                  <Label>Stock Transfer date</Label>
                  <Input
                    required
                    type="date"
                    name="targetEndDate"
                    placeholder="Date of Delivery"
                    value={StockTrxdate}
                    onChange={(e) => setStockTrxDate(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            {product &&
              product?.map((product, index) => (
                <Row className="" key={index}>
                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Product Name</Label>
                      <Multiselect
                        required
                        selectionLimit={1}
                        isObject="true"
                        options={ProductWTWList}
                        onSelect={(selectedList, selectedItem) =>
                          handleSelection(selectedList, selectedItem, index)
                        }
                        onRemove={(selectedList, selectedItem) => {
                          handleRemoveSelected(
                            selectedList,
                            selectedItem,
                            index
                          );
                        }}
                        displayValue="Product_Title" // Property name to display in the dropdown options
                      />
                    </div>
                  </Col>
                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Size</Label>
                      <Input type="text" value={product?.Size} readOnly />
                      {/* <Multiselect
                        required
                        selectionLimit={1}
                        isObject="false"
                        options={UnitList}
                        onSelect={(selectedList, selectedItem) =>
                          handleSelectionone(selectedList, selectedItem, index)
                        }
                        onRemove={(selectedList, selectedItem) => {
                          handleRemoveSelectedone(
                            selectedList,
                            selectedItem,
                            index
                          );
                        }}
                        displayValue="primaryUnit" // Property name to display in the dropdown options
                      /> */}
                    </div>
                  </Col>
                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Available Qty</Label>
                      <Input
                        disabled
                        type="number"
                        min={0}
                        name="AvailaleQty"
                        placeholder="Available Qty"
                        value={product?.AvailaleQty}
                      />
                    </div>
                  </Col>
                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Quantity To be Transfer</Label>
                      <Input
                        type="number"
                        min={0}
                        name="transferQty"
                        placeholder="Req_Qty"
                        value={product?.transferQty}
                        onChange={(e) =>
                          handleProductChangeProduct(
                            e,
                            index,
                            product?.AvailaleQty
                          )
                        }
                      />
                    </div>
                  </Col>

                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Price</Label>
                      <Input
                        type="number"
                        name="price"
                        readOnly
                        placeholder="Price"
                        value={product.price}
                      />
                    </div>
                  </Col>
                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Total Price</Label>
                      <Input
                        type="number"
                        name="totalprice"
                        readOnly
                        placeholder="TtlPrice"
                        value={product.price * product.transferQty}
                      />
                    </div>
                  </Col>

                  <Col className="d-flex mt-1 abb" lg="3" md="3" sm="12">
                    <div className="btnStyle">
                      {index ? (
                        <Badge
                          type="button"
                          color="danger"
                          className="button remove "
                          onClick={() => removeMoreProduct(index)}>
                          - Remove
                        </Badge>
                      ) : null}
                    </div>

                    <div className="btnStyle">
                      <Button
                        className="ml-1 mb-1"
                        color="primary"
                        type="button"
                        onClick={() => addMoreProduct()}>
                        + Add
                      </Button>
                    </div>
                  </Col>
                </Row>
              ))}

            <Row>
              <Col className="mb-1" lg="12" md="12" sm="12">
                <div className=" d-flex justify-content-end">
                  <Label className="pr-5">
                    Grand Total :{" "}
                    <strong>
                      {grandTotalAmt && grandTotalAmt == "NaN"
                        ? 0
                        : grandTotalAmt}{" "}
                    </strong>
                  </Label>
                </div>
              </Col>
            </Row>
            {!Loading && !Loading ? (
              <>
                <Row>
                  <Col>
                    <div className="d-flex justify-content-center">
                      <Button.Ripple
                        color="primary"
                        type="submit"
                        className="mt-2">
                        Submit
                      </Button.Ripple>
                    </div>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row>
                  <Col>
                    <div className="d-flex justify-content-center">
                      <Button.Ripple color="secondary" className="mt-2">
                        Loading...
                      </Button.Ripple>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Form>
          {/* )} */}
          {/* {TypeOfTrx && TypeOfTrx == "Factorytowarehourse" && (
            <Form className="m-1" onSubmit={submitHandler}>
              <Row>
                <Col className="mb-1" lg="3" md="3" sm="12">
                  <div className="">
                    <Label>Choose Warehouse </Label>

                    <Multiselect
                      required
                      selectionLimit={1}
                      // showCheckbox="true"
                      isObject="false"
                      options={WareHouselist} // Options to display in the dropdown
                      // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                      onSelect={onSelect1} // Function will trigger on select event
                      onRemove={onRemove1} // Function will trigger on remove event
                      displayValue="warehouseName" // Property name to display in the dropdown options
                    />
                  </div>
                </Col>

                <Col className="mb-1" lg="2" md="2" sm="12">
                  <div className="">
                    <Label>Stock Transfer date</Label>
                    <Input
                      required
                      type="date"
                      name="targetEndDate"
                      placeholder="Date of Delivery"
                      value={StockTrxdate}
                      onChange={(e) => setStockTrxDate(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              {product &&
                product?.map((product, index) => (
                  <Row className="" key={index}>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Product Name</Label>
                        <Multiselect
                          required
                          selectionLimit={1}
                          isObject="false"
                          options={ProductList}
                          onSelect={(selectedList, selectedItem) =>
                            handleSelectionProduct(
                              selectedList,
                              selectedItem,
                              index
                            )
                          }
                          onRemove={(selectedList, selectedItem) => {
                            handleRemoveSelected(
                              selectedList,
                              selectedItem,
                              index
                            );
                          }}
                          displayValue="Product_Title" // Property name to display in the dropdown options
                        />
                      </div>
                    </Col>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Size</Label>
                        <Multiselect
                          required
                          selectionLimit={1}
                          isObject="false"
                          options={UnitList}
                          onSelect={(selectedList, selectedItem) =>
                            handleSelectionone(
                              selectedList,
                              selectedItem,
                              index
                            )
                          }
                          onRemove={(selectedList, selectedItem) => {
                            handleRemoveSelectedone(
                              selectedList,
                              selectedItem,
                              index
                            );
                          }}
                          displayValue="primaryUnit" // Property name to display in the dropdown options
                        />
                      </div>
                    </Col>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Quantity To be Transfer</Label>
                        <Input
                          type="number"
                          min={0}
                          name="transferQty"
                          placeholder="Req_Qty"
                          value={product?.transferQty}
                          onChange={(e) =>
                            handleProductChangeProductone(e, index)
                          }
                        />
                      </div>
                    </Col>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Price</Label>
                        <Input
                          type="number"
                          name="price"
                          readOnly
                          placeholder="Price"
                          value={product.price}
                        />
                      </div>
                    </Col>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Total Price</Label>
                        <Input
                          type="number"
                          name="totalprice"
                          readOnly
                          placeholder="TtlPrice"
                          value={
                            product.Size * product.price * product.transferQty
                          }
                        />
                      </div>
                    </Col>

                    <Col className="d-flex mt-1 abb" lg="3" md="3" sm="12">
                      <div className="btnStyle">
                        {index ? (
                          <Button
                            type="button"
                            color="danger"
                            className="button remove "
                            onClick={() => removeMoreProduct(index)}>
                            - Remove
                          </Button>
                        ) : null}
                      </div>

                      <div className="btnStyle">
                        <Button
                          className="ml-1 mb-1"
                          color="primary"
                          type="button"
                          onClick={() => addMoreProduct()}>
                          + Add
                        </Button>
                      </div>
                    </Col>
                  </Row>
                ))}
              <Row>
                
               
                
              </Row>
              <Row>
                <Col className="mb-1" lg="12" md="12" sm="12">
                  <div className=" d-flex justify-content-end">
                    <Label className="pr-5">
                      Grand Total :{" "}
                      <stron>
                        {grandTotalAmt && grandTotalAmt == "NaN"
                          ? 0
                          : grandTotalAmt}{" "}
                      </stron>
                    </Label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="d-flex justify-content-center">
                    <Button.Ripple
                      color="primary"
                      type="submit"
                      className="mt-2">
                      Submit
                    </Button.Ripple>
                  </div>
                </Col>
              </Row>
            </Form>
          )} */}
        </CardBody>
      </Card>
    </div>
  );
};
export default CreateTarget;

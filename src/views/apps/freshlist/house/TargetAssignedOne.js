import React, { useRef } from "react";
import { Route } from "react-router-dom";
import {
  Card,
  CardBody,
  Input,
  Row,
  Modal,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  ModalHeader,
  ModalBody,
  Badge,
} from "reactstrap";

import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import EditAccount from "../accounts/EditAccount";
import ViewAccount from "../accounts/ViewAccount";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Logo from "../../../../assets/img/profile/pages/logomain.png";
import Papa from "papaparse";
import { Eye, Trash2, ChevronDown, Edit } from "react-feather";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";

import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaFilter,
  FaPlus,
} from "react-icons/fa";
import moment from "moment-timezone";
import swal from "sweetalert";
import {
  CreateAccountList,
  CreateAccountView,
  Create_TargetList,
  DeleteAccount,
  Delete_individualTarget,
  Delete_targetINlist,
} from "../../../../ApiEndPoint/ApiCalling";
import {
  BsCloudDownloadFill,
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import * as XLSX from "xlsx";
import UserContext from "../../../../context/Context";

const SelectedColums = [];

class TargetAssignedOne extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
    this.gridApi = null;
    this.state = {
      isOpen: false,
      Arrindex: "",
      rowData: [],
      modal: false,
      modalone: false,
      ViewOneData: {},

      setMySelectedarr: [],
      SelectedCols: [],
      paginationPageSize: 5,
      currenPageSize: "",
      getPageSize: "",
      // columnDefs: [],
      AllcolumnDefs: [],
      SelectedcolumnDefs: [],
      defaultColDef: {
        sortable: true,
        enablePivot: true,
        enableValue: true,
        resizable: true,
        suppressMenu: true,
      },
      columnDefs: [
        {
          headerName: "UID",
          valueGetter: "node.rowIndex + 1",
          field: "node.rowIndex + 1",
          // checkboxSelection: true,
          width: 80,
          filter: true,
          // cellRendererFramework: (params) => {
          //   return (
          //     <div className="d-flex align-items-center cursor-pointer">
          //       <div className="">
          //         <input
          //           className="addinarray"
          //           onClick={(e) => {
          //             console.log(e.target.checked);
          //             if (e.target.checked) {
          //               console.log(this.state.SelectedProduct);
          //               this.setState({
          //                 SelectedProduct: this.state.SelectedProduct.concat(
          //                   params?.data
          //                 ),
          //               });
          //             } else {
          //               let data = this.state.SelectedProduct.filter((ele, i) => {
          //                 if (ele?.id === params?.data?.id) {
          //                   this.state.SelectedProduct.splice(i, 1);
          //                 }
          //               });
          //             }
          //           }}
          //           type="checkbox"
          //         />
          //       </div>
          //     </div>
          //   );
          // },
        },

        {
          headerName: "Product Title",
          field: "productId.Product_Title",
          filter: "agSetColumnFilter",
          width: 200,
          cellRendererFramework: (params) => {
            console.log(params.data);
            return (
              <div className="d-flex align-items-center cursor-pointer">
                <div className="">
                  <span>{params.data?.productId?.Product_Title}</span>
                  {/* {params?.data?.product_images ? (
                    <img
                      style={{ borderRadius: "12px" }}
                      width="60px"
                      height="40px"
                      src={params?.data?.product_images[0]}
                      alt="image"
                    />
                  ) : (
                    "No Image "
                  )} */}
                </div>
              </div>
            );
          },
        },
        {
          headerName: "Product_MRP",
          field: "productId.Product_MRP",
          filter: "agSetColumnFilter",
          width: 200,
          cellRendererFramework: (params) => {
            // console.log(params.data);
            return (
              <div className="d-flex align-items-center cursor-pointer">
                <div className="">
                  <span>{params.data?.productId?.Product_MRP}</span>
                  {/* {params?.data?.product_images ? (
                    <img
                      style={{ borderRadius: "12px" }}
                      width="60px"
                      height="40px"
                      src={params?.data?.product_images[0]}
                      alt="image"
                    />
                  ) : (
                    "No Image "
                  )} */}
                </div>
              </div>
            );
          },
        },
        {
          headerName: "Price",
          field: "price",
          filter: "agSetColumnFilter",
          width: 200,
          cellRendererFramework: (params) => {
            // console.log(params.data);
            return (
              <div className="d-flex align-items-center cursor-pointer">
                <div className="">
                  <span>{params.data?.price}</span>
                  {/* {params?.data?.product_images ? (
                    <img
                      style={{ borderRadius: "12px" }}
                      width="60px"
                      height="40px"
                      src={params?.data?.product_images[0]}
                      alt="image"
                    />
                  ) : (
                    "No Image "
                  )} */}
                </div>
              </div>
            );
          },
        },
        {
          headerName: "Quantity Assigned",
          field: "qtyAssign",
          filter: "agSetColumnFilter",
          width: 200,
          cellRendererFramework: (params) => {
            // console.log(params.data);
            return (
              <div className="d-flex align-items-center cursor-pointer">
                <div className="">
                  <span>{params.data?.qtyAssign}</span>
                  {/* {params?.data?.product_images ? (
                    <img
                      style={{ borderRadius: "12px" }}
                      width="60px"
                      height="40px"
                      src={params?.data?.product_images[0]}
                      alt="image"
                    />
                  ) : (
                    "No Image "
                  )} */}
                </div>
              </div>
            );
          },
        },
        {
          headerName: "Total Price",
          field: "totalPrice",
          filter: "agSetColumnFilter",
          width: 200,
          cellRendererFramework: (params) => {
            // console.log(params.data);
            return (
              <div className="d-flex align-items-center cursor-pointer">
                <div className="">
                  <span>
                    {params.data?.totalPrice && params.data?.totalPrice ? (
                      <>{params.data?.totalPrice}</>
                    ) : (
                      <>{params?.data.qtyAssign * params.data?.price}</>
                    )}
                  </span>
                  {/* {params?.data?.product_images ? (
                    <img
                      style={{ borderRadius: "12px" }}
                      width="60px"
                      height="40px"
                      src={params?.data?.product_images[0]}
                      alt="image"
                    />
                  ) : (
                    "No Image "
                  )} */}
                </div>
              </div>
            );
          },
        },
        {
          headerName: "HSN_Code",
          field: "productId.HSN_Code",
          filter: "agSetColumnFilter",
          width: 200,
          cellRendererFramework: (params) => {
            // console.log(params.data);
            return (
              <div className="d-flex align-items-center cursor-pointer">
                <div className="">
                  <span>{params.data?.productId?.HSN_Code}</span>
                  {/* {params?.data?.product_images ? (
                    <img
                      style={{ borderRadius: "12px" }}
                      width="60px"
                      height="40px"
                      src={params?.data?.product_images[0]}
                      alt="image"
                    />
                  ) : (
                    "No Image "
                  )} */}
                </div>
              </div>
            );
          },
        },
        // {
        //   headerName: "Actions",
        //   field: "transactions",
        //   width: 180,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="actions cursor-pointer">
        //         {/* {this.state.Viewpermisson && ( */}
        //         {/* <Eye
        //           className="mr-50"
        //           size="25px"
        //           color="green"

        //         /> */}
        //         {/* )} */}
        //         {/* {this.state.Editpermisson && ( */}
        //         {/* <Edit
        //           className="mr-50"
        //           size="25px"
        //           color="blue"
        //           onClick={() =>
        //             this.props.history.push({
        //               pathname: `/app/freshlist/house/editmyproduct/${params.data?._id}`,
        //               state: params.data,
        //             })
        //           } */}
        //         {/* /> */}
        //         {/* )} */}
        //         {/* {this.state.Deletepermisson && ( */}
        //         {/* <Trash2
        //           className="mr-50"
        //           size="25px"
        //           color="Red"
        //           onClick={() => {
        //             this.runthisfunction(params?.data);
        //           }}
        //         /> */}
        //         {/* )} */}
        //       </div>
        //     );
        //   },
        // },

        // {
        //   headerName: "Products",
        //   field: "products",
        //   filter: "agSetColumnFilter",
        //   width: 500,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex flex-wrap">
        //         {params?.data?.products &&
        //           params?.data?.products?.map((ele, i) => {
        //             if (params.data?.products.length > 1) {
        //               return <span key={i}>{ele?.title}, &nbsp;</span>;
        //             } else {
        //               return <span key={i}>{ele?.title}</span>;
        //             }
        //           })}
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Product Name",
        //   field: "title",
        //   filter: "agSetColumnFilter",
        //   width: 200,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.title}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Assign To",
        //   field: "assign_full_name",
        //   filter: "agSetColumnFilter",
        //   width: 150,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.assign_full_name}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },

        // {
        //   headerName: "Product",
        //   field: "title",
        //   filter: "agSetColumnFilter",
        //   width: 150,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.title}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Assigned User",
        //   field: "qty",
        //   filter: "agSetColumnFilter",
        //   width: 180,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params?.data?.assign_full_name}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "CATEGORY",
        //   field: "category_name",
        //   filter: "agSetColumnFilter",
        //   width: 150,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.category_name}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Description",
        //   field: "description",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{ReactHtmlParser(params.data?.description)}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "PRICE",
        //   field: "price",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params?.data?.price}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "DiscountPrice",
        //   field: "discountprice",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.discountprice}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Shipping Fee",
        //   field: "shipping_fee",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.shipping_fee}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Tax Rate",
        //   field: "tax_rate",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.tax_rate}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Tags",
        //   field: "tags",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.tags}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "STOCK",
        //   field: "stock",

        //   filter: "agSetColumnFilter",
        //   width: 150,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{ReactHtmlParser(params.data?.stock)}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },

        // {
        //   headerName: "SALES",
        //   field: "pisces",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{ReactHtmlParser(params.data.pisces)}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
      ],
    };
  }
  toggleModal = () => {
    this.setState((prevState) => ({
      modalone: !prevState.modalone,
    }));
  };
  LookupviewStart = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  handleChangeEdit = (data, types) => {
    let type = types;
    if (type == "readonly") {
      this.setState({ ViewOneUserView: true });
      this.setState({ ViewOneData: data });
    } else {
      this.setState({ EditOneUserView: true });
      this.setState({ EditOneData: data });
    }
  };

  async componentDidMount() {
    // console.log(this.props?.ViewData);
    // console.log(this.props?.ViewData?.products);
    this.setState({ ViewOneData: this.props?.ViewData });
    const UserInformation = this.context?.UserInformatio;
    this.setState({ rowData: this.props?.ViewData?.products });
    this.setState({ AllcolumnDefs: this.state.columnDefs });
    this.setState({ SelectedCols: this.state.columnDefs });

    let userHeading = JSON.parse(localStorage.getItem("ViewOnetargetList"));
    if (userHeading?.length) {
      this.setState({ columnDefs: userHeading });
      // this.gridApi.setColumnDefs(userHeading);
      this.setState({ SelectedcolumnDefs: userHeading });
    } else {
      this.setState({ columnDefs: this.state.columnDefs });
      this.setState({ SelectedcolumnDefs: this.state.columnDefs });
    }
  }
  toggleDropdown = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  runthisfunction(data) {
    console.log(this.state.ViewOneData?._id);
    debugger;
    swal("Warning", "Sure You Want to Delete it", {
      buttons: {
        cancel: "cancel",
        catch: { text: "Delete ", value: "delete" },
      },
    }).then((value) => {
      switch (value) {
        case "delete":
          Delete_individualTarget(
            this.state.ViewOneData?._id,
            data?.productId?._id
          )
            .then((res) => {
              let selectedData = this.gridApi.getSelectedRows();
              this.gridApi.updateRowData({ remove: selectedData });
            })
            .catch((err) => {
              console.log(err);
            });
          break;
        default:
      }
    });
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridRef.current = params.api;

    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages(),
    });
  };

  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
  };

  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        currenPageSize: val,
        getPageSize: val,
      });
    }
  };
  handleChangeHeader = (e, value, index) => {
    let check = e.target.checked;
    if (check) {
      SelectedColums?.push(value);
    } else {
      const delindex = SelectedColums?.findIndex(
        (ele) => ele?.headerName === value?.headerName
      );

      SelectedColums?.splice(delindex, 1);
    }
  };
  parseCsv(csvData) {
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          if (result.data && result.data.length > 0) {
            resolve(result.data);
          } else {
            reject(new Error("No data found in the CSV"));
          }
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
  generatePDF(parsedData) {
    let pdfsize = [Object.keys(parsedData[0])][0].length;
    let size = pdfsize > 15 ? "a1" : pdfsize < 14 > 10 ? "a3" : "a4";

    const doc = new jsPDF("landscape", "mm", size, false);
    doc.setTextColor(5, 87, 97);
    const tableData = parsedData.map((row) => Object.values(row));
    doc.addImage(Logo, "JPEG", 10, 10, 50, 30);
    let date = new Date();
    doc.setCreationDate(date);
    doc.text("UserAccount", 14, 51);
    doc.autoTable({
      head: [Object.keys(parsedData[0])],
      body: tableData,
      startY: 60,
    });

    doc.save("UserList.pdf");
  }

  exportToPDF = async () => {
    const csvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    try {
      const parsedData = await this.parseCsv(csvData);
      this.generatePDF(parsedData);
    } catch (error) {
      console.error("Error parsing CSV:", error);
    }
  };
  processCell = (params) => {
    // console.log(params);
    // Customize cell content as needed
    return params.value;
  };

  convertCsvToExcel(csvData) {
    return new Promise((resolve) => {
      Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (result) {
          const worksheet = XLSX.utils.json_to_sheet(result.data);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
          const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
          });
          const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          resolve(blob);
        },
      });
    });
  }
  downloadExcelFile(blob) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Userlist.xlsx";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportToExcel = async (e) => {
    const CsvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    const blob = await this.convertCsvToExcel(CsvData);
    this.downloadExcelFile(blob);
  };

  convertCSVtoExcel = () => {
    const CsvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    Papa.parse(CsvData, {
      complete: (result) => {
        const ws = XLSX.utils.json_to_sheet(result.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        const excelType = "xls";
        XLSX.writeFile(wb, `UserList.${excelType}`);
      },
    });
  };

  shiftElementUp = () => {
    let currentIndex = this.state.Arrindex;
    if (currentIndex > 0) {
      const myArrayCopy = [...this.state.SelectedcolumnDefs];
      const elementToMove = myArrayCopy.splice(currentIndex, 1)[0];
      this.setState({ Arrindex: currentIndex - 1 });
      myArrayCopy.splice(currentIndex - 1, 0, elementToMove);
      this.setState({ SelectedcolumnDefs: myArrayCopy });
    }
  };

  shiftElementDown = () => {
    let currentIndex = this.state.Arrindex;
    if (currentIndex < this.state.SelectedcolumnDefs.length - 1) {
      const myArrayCopy = [...this.state.SelectedcolumnDefs];
      const elementToMove = myArrayCopy.splice(currentIndex, 1)[0];
      this.setState({ Arrindex: currentIndex + 1 });
      myArrayCopy.splice(currentIndex + 1, 0, elementToMove);
      this.setState({ SelectedcolumnDefs: myArrayCopy });
    }
  };
  convertCsvToXml = () => {
    const CsvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    Papa.parse(CsvData, {
      complete: (result) => {
        const rows = result.data;

        // Create XML
        let xmlString = "<root>\n";

        rows.forEach((row) => {
          xmlString += "  <row>\n";
          row.forEach((cell, index) => {
            xmlString += `    <field${index + 1}>${cell}</field${index + 1}>\n`;
          });
          xmlString += "  </row>\n";
        });

        xmlString += "</root>";

        // setXmlData(xmlString);

        // Create a download link
        const blob = new Blob([xmlString], { type: "text/xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "output.xml";
        link.click();
      },
    });
  };

  HandleSetVisibleField = (e) => {
    e.preventDefault();
    debugger;
    this.gridApi.setColumnDefs(this.state.SelectedcolumnDefs);
    this.setState({ columnDefs: this.state.SelectedcolumnDefs });
    this.setState({ SelectedcolumnDefs: this.state.SelectedcolumnDefs });
    this.setState({ rowData: this.state.rowData });
    localStorage.setItem(
      "ViewOnetargetList",
      JSON.stringify(this.state.SelectedcolumnDefs)
    );
    this.LookupviewStart();
  };

  HeadingRightShift = () => {
    const updatedSelectedColumnDefs = [
      ...new Set([
        ...this.state.SelectedcolumnDefs.map((item) => JSON.stringify(item)),
        ...SelectedColums.map((item) => JSON.stringify(item)),
      ]),
    ].map((item) => JSON.parse(item));
    this.setState({
      SelectedcolumnDefs: [...new Set(updatedSelectedColumnDefs)], // Update the state with the combined array
    });
  };
  handleLeftShift = () => {
    let SelectedCols = this.state.SelectedcolumnDefs?.slice();
    let delindex = this.state.Arrindex; /* Your delete index here */

    if (SelectedCols && delindex >= 0) {
      const splicedElement = SelectedCols?.splice(delindex, 1); // Remove the element

      this.setState({
        SelectedcolumnDefs: SelectedCols, // Update the state with the modified array
      });
    }
  };
  render() {
    const {
      rowData,
      columnDefs,
      defaultColDef,
      SelectedcolumnDefs,
      isOpen,
      SelectedCols,
      AllcolumnDefs,
    } = this.state;
    return (
      <>
        {/* <ExcelReader /> */}
        <Row className="app-user-list">
          {this.state.EditOneUserView && this.state.EditOneUserView ? (
            <Row className="card">
              <Col>
                <div className="d-flex justify-content-end p-1">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ EditOneUserView: false });
                    }}
                    color="danger">
                    Back
                  </Button>
                </div>
              </Col>

              <EditAccount EditOneData={this.state.EditOneData} />
            </Row>
          ) : (
            <>
              {this.state.ViewOneUserView && this.state.ViewOneUserView ? (
                <>
                  <Row className="card">
                    <Col>
                      <div className="d-flex justify-content-end p-1">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({ ViewOneUserView: false });
                          }}
                          color="danger">
                          Back
                        </Button>
                      </div>
                    </Col>
                    <ViewAccount ViewOneData={this.state.ViewOneData} />
                  </Row>
                </>
              ) : (
                <>
                  <Col sm="12">
                    <Card>
                      <Row className="m-2">
                        <Col>
                          <h1 className="float-left">Assigned Product List</h1>
                        </Col>
                        <Col>
                          <span className="mx-1">
                            <FaFilter
                              style={{ cursor: "pointer" }}
                              title="filter coloumn"
                              size="25px"
                              onClick={this.LookupviewStart}
                              color="#39cccc"
                              className="float-right"
                            />
                          </span>
                          <span className="mx-1">
                            <div className="dropdown-container float-right">
                              <BsCloudDownloadFill
                                style={{ cursor: "pointer" }}
                                title="download file"
                                size="25px"
                                className="dropdown-button "
                                color="#39cccc"
                                onClick={this.toggleDropdown}
                              />
                              {isOpen && (
                                <div
                                  style={{
                                    position: "absolute",
                                    zIndex: "1",
                                  }}
                                  className="dropdown-content dropdownmy">
                                  <h5
                                    onClick={() => this.exportToPDF()}
                                    style={{ cursor: "pointer" }}
                                    className=" mx-1 myactive mt-1">
                                    .PDF
                                  </h5>
                                  <h5
                                    onClick={() =>
                                      this.gridApi.exportDataAsCsv()
                                    }
                                    style={{ cursor: "pointer" }}
                                    className=" mx-1 myactive">
                                    .CSV
                                  </h5>
                                  <h5
                                    onClick={this.convertCSVtoExcel}
                                    style={{ cursor: "pointer" }}
                                    className=" mx-1 myactive">
                                    .XLS
                                  </h5>
                                  <h5
                                    onClick={this.exportToExcel}
                                    style={{ cursor: "pointer" }}
                                    className=" mx-1 myactive">
                                    .XLSX
                                  </h5>
                                  <h5
                                    onClick={() => this.convertCsvToXml()}
                                    style={{ cursor: "pointer" }}
                                    className=" mx-1 myactive">
                                    .XML
                                  </h5>
                                </div>
                              )}
                            </div>
                          </span>
                          <span>
                            <Route
                              render={({ history }) => (
                                <Badge
                                  style={{ cursor: "pointer" }}
                                  className="float-right mr-1"
                                  color="primary"
                                  onClick={() =>
                                    history.push(
                                      "/app/SoftNumen/account/CreateTarget"
                                    )
                                  }>
                                  <FaPlus size={15} /> Create Target
                                </Badge>
                              )}
                            />
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {/* <div>
                            Sales Person Name:{" "}
                            {
                              this.state.ViewOneData?.salesPersonId[0]
                                ?.firstName
                            }{" "}
                            {this.state.ViewOneData?.salesPersonId[0]?.lastName}{" "}
                          </div> */}
                        </Col>
                        <Col>
                          <div>
                            Total Target : {this.state.ViewOneData?.grandTotal}
                          </div>
                        </Col>
                        <Col>
                          <div>
                            <h5>
                              Target Start date :{" "}
                              {this.state.ViewOneData?.startDate?.split("T")[0]}
                            </h5>
                            <h5>
                              Target Start date :{" "}
                              {this.state.ViewOneData?.endDate?.split("T")[0]}
                            </h5>
                          </div>
                        </Col>
                      </Row>
                      <CardBody>
                        {this.state.rowData === null ? null : (
                          <div className="ag-theme-material w-100 my-2 ag-grid-table">
                            <div className="d-flex flex-wrap justify-content-between align-items-center">
                              <div className="mb-1">
                                <UncontrolledDropdown className="p-1 ag-dropdown">
                                  <DropdownToggle tag="div">
                                    {this.gridApi
                                      ? this.state.currenPageSize
                                      : "" * this.state.getPageSize -
                                        (this.state.getPageSize - 1)}{" "}
                                    -{" "}
                                    {this.state.rowData.length -
                                      this.state.currenPageSize *
                                        this.state.getPageSize >
                                    0
                                      ? this.state.currenPageSize *
                                        this.state.getPageSize
                                      : this.state.rowData.length}{" "}
                                    of {this.state.rowData.length}
                                    <ChevronDown className="ml-50" size={15} />
                                  </DropdownToggle>
                                  <DropdownMenu right>
                                    <DropdownItem
                                      tag="div"
                                      onClick={() => this.filterSize(5)}>
                                      5
                                    </DropdownItem>
                                    <DropdownItem
                                      tag="div"
                                      onClick={() => this.filterSize(20)}>
                                      20
                                    </DropdownItem>
                                    <DropdownItem
                                      tag="div"
                                      onClick={() => this.filterSize(50)}>
                                      50
                                    </DropdownItem>
                                    <DropdownItem
                                      tag="div"
                                      onClick={() => this.filterSize(100)}>
                                      100
                                    </DropdownItem>
                                    <DropdownItem
                                      tag="div"
                                      onClick={() => this.filterSize(134)}>
                                      134
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                              <div className="d-flex flex-wrap justify-content-end mb-1">
                                <div className="table-input mr-1">
                                  <Input
                                    placeholder="search Item here..."
                                    onChange={(e) =>
                                      this.updateSearchQuery(e.target.value)
                                    }
                                    value={this.state.value}
                                  />
                                </div>
                              </div>
                            </div>
                            <ContextLayout.Consumer className="ag-theme-alpine">
                              {(context) => (
                                <AgGridReact
                                  id="myAgGrid"
                                  // gridOptions={{
                                  //   domLayout: "autoHeight",
                                  //   // or other layout options
                                  // }}
                                  gridOptions={this.gridOptions}
                                  rowSelection="multiple"
                                  defaultColDef={defaultColDef}
                                  columnDefs={columnDefs}
                                  rowData={rowData}
                                  // onGridReady={(params) => {
                                  //   this.gridApi = params.api;
                                  //   this.gridColumnApi = params.columnApi;
                                  //   this.gridRef.current = params.api;

                                  //   this.setState({
                                  //     currenPageSize:
                                  //       this.gridApi.paginationGetCurrentPage() +
                                  //       1,
                                  //     getPageSize:
                                  //       this.gridApi.paginationGetPageSize(),
                                  //     totalPages:
                                  //       this.gridApi.paginationGetTotalPages(),
                                  //   });
                                  // }}
                                  onGridReady={this.onGridReady}
                                  colResizeDefault={"shift"}
                                  animateRows={true}
                                  floatingFilter={false}
                                  // pagination={true}
                                  paginationPageSize={
                                    this.state.paginationPageSize
                                  }
                                  pivotPanelShow="always"
                                  enableRtl={context.state.direction === "rtl"}
                                  ref={this.gridRef} // Attach the ref to the grid
                                  domLayout="autoHeight" // Adjust layout as needed
                                />
                              )}
                            </ContextLayout.Consumer>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </>
              )}
            </>
          )}
        </Row>

        <Modal
          isOpen={this.state.modal}
          toggle={this.LookupviewStart}
          className={this.props.className}
          style={{ maxWidth: "1050px" }}>
          <ModalHeader toggle={this.LookupviewStart}>Change Fileds</ModalHeader>
          <ModalBody className="modalbodyhead">
            <Row>
              <Col lg="4" md="4" sm="12" xl="4" xs="12">
                <h4>Avilable Columns</h4>
                <div className="mainshffling">
                  <div class="ex1">
                    {AllcolumnDefs &&
                      AllcolumnDefs?.map((ele, i) => {
                        return (
                          <>
                            <div
                              onClick={(e) =>
                                this.handleChangeHeader(e, ele, i)
                              }
                              key={i}
                              className="mycustomtag mt-1">
                              <span className="mt-1">
                                <h5
                                  style={{ cursor: "pointer" }}
                                  className="allfields">
                                  <input
                                    type="checkbox"
                                    // checked={check && check}
                                    className="mx-1"
                                  />

                                  {ele?.headerName}
                                </h5>
                              </span>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              </Col>
              <Col lg="2" md="2" sm="12" xl="2" xs="12" className="colarrowbtn">
                <div className="mainarrowbtn">
                  <div style={{ cursor: "pointer" }}>
                    <FaArrowAltCircleRight
                      onClick={this.HeadingRightShift}
                      className="arrowassign"
                      size="30px"
                    />
                  </div>
                  <div style={{ cursor: "pointer" }} className="my-2">
                    <FaArrowAltCircleLeft
                      onClick={this.handleLeftShift}
                      className="arrowassign"
                      size="30px"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6" md="6" sm="12" xl="6" xs="12">
                <Row>
                  <Col lg="8" md="8" sm="12" xs="12">
                    <h4>Visible Columns</h4>
                    <div className="mainshffling">
                      <div class="ex1">
                        {SelectedcolumnDefs &&
                          SelectedcolumnDefs?.map((ele, i) => {
                            return (
                              <>
                                <div key={i} className="mycustomtag mt-1">
                                  <span className="mt-1">
                                    <h5
                                      onClick={() =>
                                        this.setState({ Arrindex: i })
                                      }
                                      style={{
                                        cursor: "pointer",
                                        backgroundColor: `${
                                          this.state.Arrindex === i
                                            ? "#1877f2"
                                            : ""
                                        }`,
                                      }}
                                      className="allfields">
                                      <IoMdRemoveCircleOutline
                                        onClick={() => {
                                          const SelectedCols =
                                            this.state.SelectedcolumnDefs?.slice();
                                          const delindex =
                                            SelectedCols?.findIndex(
                                              (element) =>
                                                element?.headerName ==
                                                ele?.headerName
                                            );

                                          if (SelectedCols && delindex >= 0) {
                                            const splicedElement =
                                              SelectedCols?.splice(delindex, 1); // Remove the element
                                            // splicedElement contains the removed element, if needed

                                            this.setState({
                                              SelectedcolumnDefs: SelectedCols, // Update the state with the modified array
                                            });
                                          }
                                          // const delindex =
                                          //   SelectedCols.findIndex(
                                          //     (element) =>
                                          //       element?.headerName ==
                                          //       ele?.headerName
                                          //   );

                                          // SelectedCols?.splice(delindex, 1);
                                          // this.setState({
                                          //   SelectedcolumnDefs: SelectedCols,
                                          // });
                                        }}
                                        style={{ cursor: "pointer" }}
                                        size="25px"
                                        color="red"
                                        className="mr-1"
                                      />

                                      {ele?.headerName}
                                    </h5>
                                  </span>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </Col>
                  <Col lg="4" md="4" sm="12" xs="12">
                    <div className="updownbtn justify-content-center">
                      <div>
                        <BsFillArrowUpSquareFill
                          className="arrowassign mb-1"
                          size="30px"
                          onClick={this.shiftElementUp}
                        />
                      </div>
                      <div>
                        <BsFillArrowDownSquareFill
                          onClick={this.shiftElementDown}
                          className="arrowassign"
                          size="30px"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="d-flex justify-content-center">
                  <Button onClick={this.HandleSetVisibleField} color="primary">
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.modalone}
          toggle={this.toggleModal}
          className="modal-dialog modal-xl"
          // className="modal-dialog modal-lg"
          size="lg"
          backdrop={true}
          fullscreen={true}>
          <ModalHeader toggle={this.toggleModal}>View Details</ModalHeader>
          <ModalBody className="myproducttable">
            <h2>Assigned Product List</h2>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default TargetAssignedOne;

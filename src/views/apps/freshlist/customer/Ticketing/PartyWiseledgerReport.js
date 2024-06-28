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
  ModalHeader,
  ModalBody,
  Badge,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Button,
  Spinner,
  CustomInput,
} from "reactstrap";
import { ContextLayout } from "../../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Logo from "../../../../../assets/img/profile/pages/logomain.png";
import Papa from "papaparse";
import { Eye, Trash2, ChevronDown, Edit, CornerDownLeft } from "react-feather";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import "../../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../../assets/scss/pages/users.scss";
import StockTrxInvoice from "../../subcategory/StockTrxInvoice";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaDownload,
  FaFilter,
  FaPlus,
} from "react-icons/fa";
import swal from "sweetalert";
import {
  _Get,
  CreateCustomerList,
  createOrderhistoryview,
  Delete_targetINlist,
  PurchaseOrderList,
} from "../../../../../ApiEndPoint/ApiCalling";
import {
  BsCloudDownloadFill,
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import * as XLSX from "xlsx";
import UserContext from "../../../../../context/Context";
import { CheckPermission } from "../../house/CheckPermission";
import SuperAdminUI from "../../../../SuperAdminUi/SuperAdminUI";
import { ImDownload } from "react-icons/im";
import {
  View_Ledger_by_id,
  WareahouseList_For_addProduct,
} from "../../../../../ApiEndPoint/Api";
import { B2B } from "./GSTR2Reportconst";
const SelectedColums = [];
let SecondLast = null;

class PartyWiseledgerReport extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
    this.gridApi = null;
    this.state = {
      isOpen: false,
      MasterShow: false,
      Arrindex: "",
      Ledger: [],
      AllLedger: [],
      rowData: [],
      rowAllData: [],
      PartyList: [],
      startDate: "",
      EndDate: "",
      ShowBill: false,
      modal: false,
      modalone: false,
      ViewData: {},
      InsiderPermissions: {},
      setMySelectedarr: [],
      SelectedCols: [],
      paginationPageSize: 5,
      currenPageSize: "",
      getPageSize: "",
      PartyId: "",
      PartyName: "",
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
          width: 120,
          filter: true,
        },

        // {
        //   headerName: "Actions",
        //   field: "transactions",
        //   width: 180,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="actions cursor-pointer">
        //         {this.state.InsiderPermissions &&
        //           this.state.InsiderPermissions?.View && (
        //             <Eye
        //               className="mr-50"
        //               size="25px"
        //               color="green"
        //               onClick={() => {
        //                 this.togglemodal();
        //                 this.handleChangeView(params.data, "readonly");
        //               }}
        //             />
        //           )}
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Status",
        //   field: "status",
        //   filter: true,
        //   width: 150,
        //   cellRendererFramework: (params) => {
        //     return params.value == "Active" ? (
        //       <div className="badge badge-pill badge-success">
        //         {params.data.status}
        //       </div>
        //     ) : params.value == "Deactive" ? (
        //       <div className="badge badge-pill badge-warning">
        //         {params.data.status}
        //       </div>
        //     ) : params.value == "return" ? (
        //       <div className="badge badge-pill badge-danger">
        //         {params.data.status}
        //       </div>
        //     ) : params.value == "InProcess" ? (
        //       <div className="badge badge-pill badge-secondary">
        //         {params.data.status}
        //       </div>
        //     ) : params.value == "cancelled" ? (
        //       <div className="badge badge-pill badge-danger">
        //         {params.data.status}
        //       </div>
        //     ) : null;
        //   },
        // },

        {
          headerName: "Date",
          field: "createdAt",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            console.log(params?.data);
            return (
              <div>
                <span>{params?.data?.createdAt?.split("T")[0]}</span>
              </div>
            );
          },
        },
        {
          headerName: "Name",
          field: "partyId.firstName",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params?.data?.partyId?.firstName}</span>
              </div>
            );
          },
        },
        {
          headerName: "Particulars",
          field: "particular",
          filter: true,
          width: 220,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params?.data?.particular}</span>
              </div>
            );
          },
        },
        {
          headerName: "Reason",
          field: "reason",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params?.data?.reason}</span>
              </div>
            );
          },
        },
        {
          headerName: "Debit",
          field: "debit",
          filter: true,
          width: 250,
          cellRendererFramework: (params) => {
            return (
              <div>
                {params?.data?.debit && (
                  <Badge color="info">
                    <span>-{params?.data?.debit}</span>
                  </Badge>
                )}
              </div>
            );
          },
        },

        {
          headerName: "Credit",
          field: "credit",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            console.log(params.data);
            return (
              <div className="d-flex align-items-center cursor-pointer">
                <div>
                  {params.data?.credit && (
                    <Badge color="primary">
                      {params.data?.credit && params.data?.credit}
                    </Badge>
                  )}
                </div>
              </div>
            );
          },
        },
        // {
        //   headerName: "CGST",
        //   field: "updatedAt",
        //   filter: true,
        //   width: 180,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div>
        //           <Badge color="primary">
        //             {params.data?.cgstTotal && params.data?.cgstTotal}
        //           </Badge>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "IGST",
        //   field: "updatedAt",
        //   filter: true,
        //   width: 180,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div>
        //           <Badge color="primary">
        //             {params.data?.igstTotal && params.data?.igstTotal}
        //           </Badge>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Amount",
        //   field: "amount",
        //   filter: true,
        //   width: 150,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div>
        //           <Badge color="primary">
        //             {params.data?.amount?.toFixed(2)}
        //           </Badge>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "RoundOff",
        //   field: "roundOff",
        //   filter: true,
        //   width: 150,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div>
        //           <Badge color="primary">{params.data?.roundOff}</Badge>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Grand Total",
        //   field: "grandTotal",
        //   filter: true,
        //   width: 150,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div>
        //           <Badge color="primary">{params.data?.grandTotal}</Badge>
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

  handleChangeView = (data, types) => {
    let type = types;
    if (type == "readonly") {
      console.log("ResponseData", data.orderItems);
      this.setState({ ViewOneUserView: true });
      this.setState({ ViewOneData: data });
    } else {
      this.setState({ EditOneUserView: true });
      this.setState({ EditOneData: data });
    }
  };
  handleLedger = async (e) => {
    e.preventDefault();
    this.setState({ Loading: true });

    await _Get(View_Ledger_by_id, this.state.PartyId)
      .then((res) => {
        this.setState({ Loading: false });
        SecondLast = res?.Ledger?.length - 1;

        this.setState({ rowData: res?.Ledger, rowAllData: res?.Ledger });
      })
      .catch((err) => {
        this.setState({ Loading: false });
        this.setState({ Ledger: [], AllLedger: [] });
      });
  };

  async Apicalling(id, db) {
    this.setState({ Loading: true });
    await CreateCustomerList(id, db)
      .then((res) => {
        this.setState({ Loading: false });
        this.setState({ AllcolumnDefs: this.state.columnDefs });
        this.setState({ SelectedCols: this.state.columnDefs });

        let userHeading = JSON.parse(
          localStorage.getItem("PartywiseLedgerReport")
        );
        if (userHeading?.length) {
          this.setState({ columnDefs: userHeading });
          // this.gridApi.setColumnDefs(userHeading);
          this.setState({ SelectedcolumnDefs: userHeading });
        } else {
          this.setState({ columnDefs: this.state.columnDefs });
          this.setState({ SelectedcolumnDefs: this.state.columnDefs });
        }
        let value = res?.Customer;
        if (value?.length) {
          this.setState({ PartyList: value });
        }
      })
      .catch((err) => {
        this.setState({ Loading: false });

        console.log(err);
        this.setState({ PartyList: [] });
      });
  }
  async componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    const UserInformation = this.context?.UserInformatio;
    if (userInfo?.rolename?.roleName === "MASTER") {
      this.setState({ MasterShow: true });
    }
    const InsidePermissions = CheckPermission("PartywiseLedger Report");
    this.setState({ InsiderPermissions: InsidePermissions });
    await this.Apicalling(userInfo?._id, userInfo?.database);
  }

  togglemodal = () => {
    this.setState((prevState) => ({
      modalone: !prevState.modalone,
    }));
    this.setState({ ShowBill: false });
  };
  handleStockTrxInvoiceShow = () => {
    this.setState({ ShowBill: true });
  };
  toggleDropdown = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  runthisfunction(id) {
    swal("Warning", "Sure You Want to Delete it", {
      buttons: {
        cancel: "cancel",
        catch: { text: "Delete ", value: "delete" },
      },
    }).then((value) => {
      switch (value) {
        case "delete":
          Delete_targetINlist(id)
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
  handleDate = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmitDate = () => {
    const filteredItems = this.state.rowAllData?.filter((item) => {
      const dateList = new Date(item.createdAt);
      const onlyDate = dateList.toISOString().split("T")[0];

      return onlyDate >= this.state.startDate && onlyDate <= this.state.EndDate;
    });
    this.setState({ rowData: filteredItems });
  };
  convertCsvToXml = () => {
    const CsvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    Papa.parse(CsvData, {
      complete: (result) => {
        const rows = result.data;

        let xmlString = "<root>\n";

        rows.forEach((row) => {
          xmlString += "  <row>\n";
          row.forEach((cell, index) => {
            xmlString += `    <field${index + 1}>${cell}</field${index + 1}>\n`;
          });
          xmlString += "  </row>\n";
        });

        xmlString += "</root>";
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

    this.gridApi.setColumnDefs(this.state.SelectedcolumnDefs);
    this.setState({ columnDefs: this.state.SelectedcolumnDefs });
    this.setState({ SelectedcolumnDefs: this.state.SelectedcolumnDefs });
    this.setState({ rowData: this.state.rowData });
    localStorage.setItem(
      "PartywiseLedgerReport",
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

  handleParentSubmit = (e) => {
    e.preventDefault();
    let SuperAdmin = JSON.parse(localStorage.getItem("SuperadminIdByMaster"));
    let id = SuperAdmin.split(" ")[0];
    let db = SuperAdmin.split(" ")[1];
    this.Apicalling(id, db);
  };
  handleDropdownChange = (selectedValue) => {
    localStorage.setItem("SuperadminIdByMaster", JSON.stringify(selectedValue));
  };
  render() {
    if (this.state.Loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20rem",
          }}>
          <Spinner
            style={{
              height: "4rem",
              width: "4rem",
            }}
            color="primary">
            Loading...
          </Spinner>
        </div>
      );
    }
    const {
      rowData,
      columnDefs,
      defaultColDef,
      SelectedcolumnDefs,
      isOpen,
      InsiderPermissions,
      SelectedCols,
      PartyList,
      AllcolumnDefs,
    } = this.state;
    return (
      <>
       
            <Card>
              <Row className="ml-1 mr-1">
                <Col lg="3" md="3" xl="3" style={{marginTop:'30px'}}>
                <Row>
                  <Col lg='6' md='6' xl='6'>
                  <h3 className="float-left " style={{ fontWeight: "600" }}>
                  Party Wise Ledger Report
                </h3>
                  </Col>
                  <Col lg='6' md='6' xl='6'>
                  <div className="table-input ">
                    <Input
                     
                      placeholder="search Item here..."
                      onChange={(e) =>
                        this.updateSearchQuery(e.target.value)
                      }
                      value={this.state.value}
                    />
                  </div>
                  </Col>
                </Row>
                 
                </Col>
              
                <Col style={{marginTop:'30px'}} lg='3' xl='3' md='3'>
                <Row>
                <Col md='8' lg='8' xl='8' xs='8'>
                <CustomInput
                onChange={(e) => {
                  let selected =
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-name"
                    );
                  //                     PartyId: "",
                  //   PartyName: "",
                  this.setState({
                    PartyId: e.target.value,
                    PartyName: selected,
                  });
                }}
                value={this.state.PartyId}
                type="select">
                <option value={0}>--Select Party--</option>
                {PartyList?.length > 0 &&
                  PartyList?.map((ele, i) => {
                    return (
                      <option
                        data-name={`${ele?.firstName} ${ele?.lastName} `}
                        value={
                          ele?._id
                        }>{`${ele?.firstName} ${ele?.lastName} `}</option>
                    );
                  })}
              </CustomInput>
                </Col>
                <Col md='4' lg='4' xl='4' xs='4'>
                <div className="table-input ">
                <Button
                  onClick={this.handleLedger}
                  type="submit"
                  className=""
                  color="primary">
                  Submit
                </Button>
              </div>
                </Col>
                </Row>
                </Col>
                <Col md='5' lg='5' xl='5'>
                <Row>
                <Col md='5' lg='5' xl='5' style={{marginTop:'9px'}}> 
                <div className="table-input">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.handleDate}
                />
              </div>
                </Col>
                <Col md='5' lg='5' xl='5' style={{marginTop:'9px'}}>
                <div className="table-input">
                <Label>End Date</Label>
                <Input
                  type="date"
                  name="EndDate"
                  value={this.state.EndDate}
                  onChange={this.handleDate}
                />
              </div>
                </Col>
                <Col md='2' lg='2' xl='2' style={{marginTop:'30px'}} >
                <div className="table-input">
                    <Button
                      type="submit"
                    
                      color="primary"
                      onClick={this.handleSubmitDate}>
                      Submit
                    </Button>
                  </div>
                </Col>
                </Row>
              
                </Col>
               
                <Col lg="1" md="1" style={{marginTop:'30px'}} >
                  {InsiderPermissions && InsiderPermissions?.View && (
                    <span className="">
                      <FaFilter
                        style={{ cursor: "pointer" }}
                        title="filter coloumn"
                        size="35px"
                        onClick={this.LookupviewStart}
                        color="#39cccc"
                        className="float-right"
                      />
                    </span>
                  )}
                  {InsiderPermissions && InsiderPermissions?.Download && (
                    <span
                      onMouseEnter={this.toggleDropdown}
                      onMouseLeave={this.toggleDropdown}
                      className="">
                      <div className="dropdown-container float-right">
                        <ImDownload
                          style={{ cursor: "pointer" }}
                          title="Download file"
                          size="35px"
                          className="dropdown-button "
                          color="#39cccc"
                        />
                        {isOpen && (
                          <div
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            border: "1px solid #39cccc",
                            backgroundColor: "white",
                          }}
                            className="dropdown-content dropdownmy">
                            <h5
                              onClick={() => this.exportToPDF()}
                              style={{ cursor: "pointer" }}
                              className=" mx-1 myactive mt-1">
                              .PDF
                            </h5>
                            <h5
                              onClick={() => this.gridApi.exportDataAsCsv()}
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
                  )}
                </Col>
              </Row>
              <Row className="ml-1 mr-1">
              <Col></Col>
              {this.state.MasterShow && this.state.MasterShow ? (
                <Col lg="4" md="4" sm="6">
                  <SuperAdminUI
                    onDropdownChange={this.handleDropdownChange}
                    onSubmit={this.handleParentSubmit}
                  />
                </Col>
              ) : (
                <Col></Col>
              )}
              </Row>
              <CardBody style={{ marginTop: "0rem" }}>
                {this.state.rowData === null ? null : (
                  <div className="ag-theme-material w-100  ag-grid-table">
                 
                    <ContextLayout.Consumer className="ag-theme-alpine">
                      {(context) => (
                        <AgGridReact
                          id="myAgGrid"
                          gridOptions={this.gridOptions}
                          rowSelection="multiple"
                          defaultColDef={defaultColDef}
                          columnDefs={columnDefs}
                          rowData={rowData}
                          onGridReady={this.onGridReady}
                          colResizeDefault={"shift"}
                          animateRows={true}
                          floatingFilter={false}
                          // pagination={true}
                          paginationPageSize={this.state.paginationPageSize}
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
       

        <Modal
          isOpen={this.state.modal}
          toggle={this.LookupviewStart}
          className={this.props.className}
          style={{ maxWidth: "1050px" }}>
          <ModalHeader toggle={this.LookupviewStart}>Change Fileds</ModalHeader>
          <ModalBody className="modalbodyhead">
            <Row>
              <Col lg="4" md="4" sm="12" xl="4" xs="12">
                <h4>Available Columns</h4>
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
                  {/* <Button onClick={this.HandleSetVisibleField} color="primary">
                    Submit
                  </Button> */}

                  <Badge
                    style={{ cursor: "pointer" }}
                    className=""
                    color="primary"
                    onClick={this.HandleSetVisibleField}>
                    Submit
                  </Badge>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.modalone}
          toggle={this.togglemodal}
          className={this.props.className}
          style={{ maxWidth: "1050px" }}>
          <ModalHeader toggle={this.togglemodal}>
            {this.state.ShowBill ? "Bill Download" : "All Products"}
          </ModalHeader>
          <ModalBody
            className={`${this.state.ShowBill ? "p-1" : "modalbodyhead"}`}>
            <Row className="p-2">
              <Col>
                <div className="d-flex justify-content-center">
                  <h4>Sales Order List</h4>
                </div>
              </Col>
            </Row>
            {this.state.ShowBill ? (
              <>
                <StockTrxInvoice ViewOneData={this.state.ViewOneData} />
              </>
            ) : (
              <>
                {this.state.ViewOneUserView ? (
                  <>
                    <Row>
                      <Col className="d-flex">
                        <div>
                          <span>UserName:</span>
                        </div>
                        <div>
                          <h5 className="">
                            {this.state.ViewOneData &&
                              this.state.ViewOneData?.fullName}
                          </h5>
                        </div>
                      </Col>

                      <Col className="d-flex">
                        <div>
                          <span>Grand Total :</span>
                        </div>
                        <div>
                          <strong>
                            {this.state.ViewOneData &&
                              this.state.ViewOneData?.grandTotal}
                          </strong>
                          Rs/-
                        </div>
                      </Col>
                      <Col>
                        {this.state.ViewOneData?.status == "completed" ? (
                          <>
                            <div className="d-flex justify-content-center">
                              <h5>
                                Status:
                                <Badge className="mx-2" color="primary">
                                  {this.state.ViewOneData?.status}
                                </Badge>
                              </h5>
                            </div>
                          </>
                        ) : (
                          <>
                            <h5>
                              status:
                              <Badge className="mx-2" color="primary">
                                {this.state.ViewOneData?.status}
                              </Badge>
                            </h5>
                          </>
                        )}
                      </Col>
                      {/* <Col>
                        <Label>Download Invoice :</Label>
                        <div className="d-flex justify-content-center">
                          <FaDownload
                            onClick={this.handleStockTrxInvoiceShow}
                            color="#00c0e"
                            fill="#00c0e"
                            style={{ cursor: "pointer" }}
                            size={20}
                          />
                        </div>
                      </Col> */}
                    </Row>

                    <Row>
                      <Col>
                        <Table style={{ cursor: "pointer" }} responsive>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Product Name</th>
                              <th>Price</th>
                              <th>Size</th>
                              <th>Unit</th>
                              <th>HSN CODE</th>
                              <th>GST</th>
                              <th>Quantity</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.ViewOneData?.orderItems &&
                              this.state.ViewOneData?.orderItems?.map(
                                (ele, i) => (
                                  <>
                                    <tr>
                                      <th scope="row">{i + 1}</th>
                                      <td>{ele?.productId?.Product_Title}</td>
                                      <td>{ele?.productId?.Product_MRP}</td>
                                      <td>{ele?.Size}</td>
                                      <td>{ele?.unitType}</td>
                                      <td>{ele?.productId?.HSN_Code}</td>
                                      <td>{ele?.productId["GSTRate"]}</td>
                                      <td>{ele?.qty}</td>
                                      <td>
                                        {ele?.productId?.Product_MRP *
                                          ele?.Size *
                                          ele?.qty}
                                      </td>
                                    </tr>
                                  </>
                                )
                              )}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </>
                ) : null}
              </>
            )}
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default PartyWiseledgerReport;

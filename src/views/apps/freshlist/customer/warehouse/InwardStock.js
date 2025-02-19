import React from "react";
import { ImDownload } from "react-icons/im";

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
  Label,
  Table,
  CustomInput,
  Spinner,
} from "reactstrap";

import { ContextLayout } from "../../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Logo from "../../../../../assets/img/profile/pages/logomain.png";
import Papa from "papaparse";
import { Eye, ChevronDown, Edit } from "react-feather";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import "../../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../../assets/scss/pages/users.scss";

import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaDownload,
  FaFilter,
  FaInbox,
} from "react-icons/fa";
import swal from "sweetalert";
import {
  DeleteAccount,
  Stockupdate,
  _Get,
  _GetList,
} from "../../../../../ApiEndPoint/ApiCalling";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import * as XLSX from "xlsx";
import UserContext from "../../../../../context/Context";
import UpdateStockTrx from "../../accounts/UpdateStockTrx";
import StockTrxInvoice from "../../subcategory/InwardTrxInvoice";
import { CheckPermission } from "../../house/CheckPermission";
import SuperAdminUI from "../../../../SuperAdminUi/SuperAdminUI";

import {
  Create_Warehouse_List,
  Warehouse_Inward_list,
  Warehouse_ListBy_id,
} from "../../../../../ApiEndPoint/Api";
let WarehouseIncharge = false;
const SelectedColums = [];

class StockTransfer extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
    this.gridApi = null;
    this.state = {
      isOpen: false,
      ShowBill: false,
      InventorysShow: false,
      MasterShow: false,
      wareHouseViewOne: [],
      Arrindex: "",
      InsiderPermissions: {},
      rowData: [],
      setMySelectedarr: [],
      ViewOneData: {},
      BillViewData: {},
      SelectedCols: [],
      paginationPageSize: 5,
      currenPageSize: "",
      getPageSize: "",
      columnDefs: [
        {
          headerName: "S.No",
          valueGetter: "node.rowIndex + 1",
          field: "node.rowIndex + 1",
          width: 150,
          filter: true,
        },
        {
          headerName: "Actions",
          field: "sortorder",
          field: "transactions",
          width: 150,
          cellRendererFramework: (params) => {
            return (
              <div className="actions cursor-pointer">
                {this.state.InsiderPermissions &&
                  this.state.InsiderPermissions?.Edit && (
                    <Edit
                      className="mr-50"
                      title="Inward Stock Update Products"
                      size="25px"
                      color="green"
                      onClick={async (e) => {
                        this.setState({ Loading: true });

                        await _Get(Warehouse_Inward_list, params?.data?._id)
                          .then((res) => {
                            this.setState({ Loading: false });

                            console.log(res?.Warehouse);
                            let Inprocess = res?.Warehouse?.filter(
                              (ele) => ele?.transferStatus == "InProcess"
                            );
                            console.log({
                              ...params?.data,
                              inward: Inprocess,
                            });
                            this.setState({
                              ViewOneData: {
                                ...params?.data,
                                inward: Inprocess,
                              },
                              ViewOneUserView: true,
                              InventorysShow: false,
                              EditOneUserView: false,
                            });
                            this.togglemodal();
                          })
                          .catch((err) => {
                            this.setState({ Loading: false });
                            swal("No Data Found", "Error", "error");
                            console.log(err.response);
                          });
                      }}
                    />
                  )}
                {/* {this.state.InsiderPermissions &&
                  this.state.InsiderPermissions?.Edit && (
                    <FaInbox
                      title="Inward Stock Products"
                      className="mr-20"
                      size="25px"
                      color="blue"
                      onClick={async (e) => {
                        // await ViewOneWarehouseStock(
                        //   params?.data?._id,
                        //   params?.data?.database
                        // )
                        //   .then((res) => {
                        //     console.log(res?.Factory);
                        //     debugger;
                        //   })
                        //   .catch((err) => {
                        //     console.log(err);
                        //   });
                        await this.ViewStockList(
                          params?.data?._id,
                          params?.data?.database
                        );

                        this.setState({ InventorysShow: true });
                        this.setState({ ViewOneUserView: true });
                        this.setState({ EditOneUserView: false });
                        // this.setState({ EditOneUserView: true });
                        // this.setState({ ViewOneUserView: false });
                      }}
                    />
                  )} */}
              </div>
            );
          },
        },
        // {
        //   headerName: "Status",
        //   field: "transferStatus",
        //   filter: true,
        //   width: 150,
        //   cellRendererFramework: (params) => {
        //     return params.data?.transferStatus === "Completed" ? (
        //       <div className="badge badge-pill badge-success">
        //         {params.data?.transferStatus}
        //       </div>
        //     ) : params.data?.transferStatus === "InProcess" ? (
        //       <div className="badge badge-pill badge-warning">
        //         {params.data?.transferStatus}
        //       </div>
        //     ) : params.data?.transferStatus === "Hold" ? (
        //       <div className="badge badge-pill badge-danger">
        //         {params.data?.transferStatus}
        //       </div>
        //     ) : params.data?.transferStatus === "Pending" ? (
        //       <div className="badge badge-pill badge-warning">
        //         {params.data?.transferStatus}
        //       </div>
        //     ) : null;
        //   },
        // },
        {
          headerName: "Warehouse Id",
          field: "_id",
          filter: true,
          sortable: true,
          editable: true,
          width: 260,
          cellRendererFramework: (params) => {
            return (
              <>
                <div className="actions cursor-pointer">
                  <span>{params?.data?._id}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Warehouse Name",
          field: "warehouseName",
          filter: true,
          sortable: true,
          width: 260,
          cellRendererFramework: (params) => {
            return (
              <>
                <div className="actions cursor-pointer">
                  <span>{params?.data?.warehouseName}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Mobile No",
          field: "mobileNo",
          filter: true,
          sortable: true,
          width: 260,
          cellRendererFramework: (params) => {
            return (
              <>
                <div className="actions cursor-pointer">
                  <span>{params?.data?.mobileNo}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Landline Number",
          field: "landlineNumber",
          filter: true,
          sortable: true,
          cellRendererFramework: (params) => {
            return (
              <>
                <div className="actions cursor-pointer">
                  <span>{params?.data?.landlineNumber}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Address",
          field: "address",
          filter: true,
          sortable: true,
          width: 460,
          cellRendererFramework: (params) => {
            return (
              <>
                <div className="actions cursor-pointer">
                  <span>{params?.data?.address}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Created At",
          field: "createdAt",
          filter: true,
          sortable: true,
          cellRendererFramework: (params) => {
            return (
              <>
                <div className="actions cursor-pointer">
                  <span>{params?.data?.createdAt?.split("T")[0]}</span>
                </div>
              </>
            );
          },
        },

        {
          headerName: "Updated date",
          field: "updatedAt",
          filter: true,
          sortable: true,
          cellRendererFramework: (params) => {
            return (
              <>
                <div className="actions cursor-pointer">
                  <div className="actions cursor-pointer">
                    <span>{params?.data?.updatedAt?.split("T")[0]}</span>
                  </div>
                </div>
              </>
            );
          },
        },
      ],
      AllcolumnDefs: [],
      SelectedcolumnDefs: [],
      defaultColDef: {
        sortable: true,
        enablePivot: true,
        enableValue: true,
        resizable: true,
        suppressMenu: true,
      },
    };
  }
  UpdateStock = (data, e) => {
    let payload = {
      transferStatus: e.target.value,
    };
    let id = data?._id;

    swal("Warning", "Sure You Want to Update Status", {
      buttons: {
        cancel: "No",
        catch: { text: "Yes", value: "Sure" },
      },
    }).then((value) => {
      switch (value) {
        case "Sure":
          this.setState({ Loading: true });
          Stockupdate(id, payload)
            .then((res) => {
              this.setState({ Loading: false });
              console.log(res);
              swal("success", "Status Updated Successfully");
              this.togglemodal();
              this.componentDidMount();
            })
            .catch((err) => {
              this.setState({ Loading: false });
              console.log(err);
            });

          break;
        default:
      }
    });
  };
  LookupviewStart = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  togglemodal = () => {
    this.setState((prevState) => ({
      modalone: !prevState.modalone,
    }));
    this.setState({ ShowBill: false });
  };
  handleStockTrxInvoiceShow = (data) => {
    this.setState({ ShowBill: true });
    this.setState({ ViewOneUserView: true });

    this.setState({ BillViewData: data });
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

  async Apicalling(id, db, WarehouseIncharge) {
    this.setState({ Loading: true });
    let userHeading = JSON.parse(localStorage.getItem("InwardStock"));
    this.setState({ AllcolumnDefs: this.state.columnDefs });
    this.setState({ SelectedCols: this.state.columnDefs });

    if (userHeading?.length) {
      this.setState({ columnDefs: userHeading });
      // this.gridApi.setColumnDefs(userHeading);
      this.setState({ SelectedcolumnDefs: userHeading });
    } else {
      this.setState({ columnDefs: this.state.columnDefs });
      this.setState({ SelectedcolumnDefs: this.state.columnDefs });
    }
    if (WarehouseIncharge) {
      let Url = `${Warehouse_ListBy_id + id}/${db}`;
      await _GetList(Url)
        .then((res) => {
          this.setState({ Loading: false });
          let value = res?.Warehouse;
          if (value?.length) {
            this.setState({ rowData: value });
          }
        })
        .catch((err) => {
          this.setState({ Loading: false });
          this.setState({ rowData: [] });
          console.log(err);
        });
    } else {
      await _Get(Create_Warehouse_List, db)
        .then((res) => {
          this.setState({ Loading: false });
          let value = res?.Warehouse;
          if (value?.length) {
            this.setState({ rowData: value });
          }
        })
        .catch((err) => {
          this.setState({ Loading: false });
          this.setState({ rowData: [] });
          console.log(err);
        });
    }
  }
  async componentDidMount() {
    const UserInformation = this.context?.UserInformatio;
    const InsidePermissions = CheckPermission("Inward Stock");
    this.setState({ InsiderPermissions: InsidePermissions });
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    if (pageparmission?.rolename?.roleName === "MASTER") {
      this.setState({ MasterShow: true });
    }

    if (pageparmission?.rolename?.roleName === "WareHouse Incharge") {
      WarehouseIncharge = true;
    } else {
      WarehouseIncharge = false;
    }

    await this.Apicalling(
      pageparmission?._id,
      pageparmission?.database,
      WarehouseIncharge
    );
  }

  // ViewStockList = async (id, db) => {
  //   let pageparmission = JSON.parse(localStorage.getItem("userData"));
  //   let userid = pageparmission?._id;
  //   await Warehouse_Inwardlist(id)
  //     .then((res) => {
  //       console.log(res?.Warehouse);
  //       let inwardstock = res?.Warehouse?.filter(
  //         (ele, i) => ele?.transferStatus == "InProcess"
  //       );

  //       if (inwardstock?.length) {
  //         this.setState({ ViewOneData: inwardstock[0] });
  //         this.togglemodal();
  //       } else {
  //         swal("No inWard Stock Found");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // await ViewOneWarehouseStock(userid, pageparmission?.database)
  //   //   .then((res) => {
  //   //     console.log(res?.Factory);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  // };

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
          DeleteAccount(id)
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
      "InwardStock",
      JSON.stringify(this.state.SelectedcolumnDefs)
    );
    this.LookupviewStart();
  };
  handleShowWarehouse = (e) => {
    e.preventDefault();
    if (this.state.warehouse != "NA") {
      console.log(this.state.wareHouseViewOne);
      let selecteddata = this.state.wareHouseViewOne?.filter(
        (ele, i) => ele?._id == this.state.warehouse
      );
      this.setState({ Show: true });
      this.setState({ rowData: selecteddata });
    } else {
      swal("You did not select Any Warehouse");
    }
  };
  changeHandler = (e) => {
    console.log(e.target.value, this.state.warehouse);

    this.setState({ [e.target.name]: e.target.value });
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
    let SelectedCols = this.state.SelectedcolumnDefs.slice();
    let delindex = this.state.Arrindex; /* Your delete index here */

    if (SelectedCols && delindex >= 0) {
      const splicedElement = SelectedCols.splice(delindex, 1); // Remove the element

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
    this.Apicalling(id, db, WarehouseIncharge);
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

      AllcolumnDefs,
    } = this.state;
    return (
      <>
        <Row className="app-user-list">
          <Col sm="12">
            <Card>
              <Row className="mt-2 ml-2 mr-2">
                <Col lg="2" md="2">
                  <h1 className="float-left" style={{ fontWeight: "600" }}>
                    Inward Stock
                  </h1>
                </Col>
                {this.state.MasterShow && (
                  <Col>
                    <SuperAdminUI
                      onDropdownChange={this.handleDropdownChange}
                      onSubmit={this.handleParentSubmit}
                    />
                  </Col>
                )}

                <Col>
                  {this.state.InsiderPermissions &&
                    this.state.InsiderPermissions?.View && (
                      <>
                        <span className="mx-1">
                          <FaFilter
                            style={{ cursor: "pointer" }}
                            title="filter coloumn"
                            size="35px"
                            onClick={this.LookupviewStart}
                            color="#39cccc"
                            className="float-right"
                          />
                        </span>
                      </>
                    )}
                  {this.state.InsiderPermissions &&
                    this.state.InsiderPermissions?.Download && (
                      <span className="mx-1">
                        <div className="dropdown-container float-right">
                          <ImDownload
                            style={{ cursor: "pointer" }}
                            title="download file"
                            size="35px"
                            className="dropdown-button "
                            color="#39cccc"
                            onClick={this.toggleDropdown}
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
              {this.state.InsiderPermissions &&
                this.state.InsiderPermissions?.View && (
                  <CardBody style={{ marginTop: "0rem" }}>
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
                )}
            </Card>
          </Col>
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
                                            this.state.SelectedcolumnDefs.slice();
                                          const delindex =
                                            SelectedCols.findIndex(
                                              (element) =>
                                                element?.headerName ==
                                                ele?.headerName
                                            );

                                          if (SelectedCols && delindex >= 0) {
                                            const splicedElement =
                                              SelectedCols.splice(delindex, 1); // Remove the element
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
          toggle={this.togglemodal}
          backdrop={false}
          size="lg"
          fullscreen={true}
          className={this.props.className}
          style={{ maxWidth: "1200px" }}>
          <ModalHeader toggle={this.togglemodal}>
            {this.state.ShowBill ? "Bill Download" : "All Products"}
          </ModalHeader>
          <ModalBody>
            {this.state.ViewOneUserView ? (
              <>
                {this.state.ShowBill ? (
                  <>
                    <StockTrxInvoice ViewOneData={this.state.BillViewData} />
                  </>
                ) : (
                  <>
                    <Row>
                      <Col>
                        <Label>WareHouse Name :</Label>
                        <h5 className="mx-1">
                          <span>
                            {this.state.ViewOneData?.warehouseName &&
                              this.state.ViewOneData?.warehouseName}
                          </span>
                        </h5>
                      </Col>
                    </Row>
                    <Row className="p-2">
                      <Col>
                        <div className="d-flex justify-content-center">
                          <h4>Product Details</h4>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      {this.state.ViewOneData?.inward?.length > 0 && (
                        <Col>
                          <Table style={{ cursor: "pointer" }} responsive>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Update Status</th>
                                <th>Current Status</th>
                                <th>Date</th>
                                <th>WareHouse From</th>
                                <th>WareHouse To</th>
                                <th>Product-qty</th>
                                <th>Total</th>
                                <th>Bill</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.ViewOneData?.inward?.length > 0 &&
                                this.state.ViewOneData?.inward?.map(
                                  (ele, i) => (
                                    <>
                                      <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>
                                          <Col>
                                            <CustomInput
                                              onChange={(e) =>
                                                this.UpdateStock(ele, e)
                                              }
                                              type="select">
                                              <option value="NA">
                                                --Select--
                                              </option>
                                              <option value="Completed">
                                                Completed
                                              </option>
                                              <option value="Pending">
                                                Pending
                                              </option>
                                              <option value="Hold">Hold</option>
                                            </CustomInput>
                                          </Col>
                                        </td>
                                        <td>
                                          <Badge color="warning">
                                            {ele?.transferStatus}
                                          </Badge>
                                        </td>
                                        <td>{ele?.stockTransferDate}</td>
                                        <td>
                                          {ele?.warehouseFromId?.warehouseName}
                                        </td>
                                        <td>
                                          {ele?.warehouseToId?.warehouseName}
                                        </td>
                                        <td>
                                          {ele?.productItems?.map((element) => (
                                            <>
                                              {
                                                element?.productId
                                                  ?.Product_Title
                                              }
                                              -{element?.transferQty}
                                            </>
                                          ))}
                                        </td>
                                        <td>{ele?.grandTotal}</td>
                                        <td>
                                          {" "}
                                          <FaDownload
                                            onClick={() =>
                                              this.handleStockTrxInvoiceShow(
                                                ele
                                              )
                                            }
                                            color="green"
                                            style={{ cursor: "pointer" }}
                                            size={20}
                                          />
                                        </td>
                                      </tr>
                                    </>
                                  )
                                )}
                            </tbody>
                          </Table>
                        </Col>
                      )}
                    </Row>
                  </>
                )}
              </>
            ) : (
              <>
                <UpdateStockTrx ViewOne={this.state.ViewOneData} />
              </>
            )}
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default StockTransfer;

// eslint-disable-next-line
import React from "react";
import { Route } from "react-router-dom";
import { ImDownload } from "react-icons/im";
import Multiselect from "multiselect-react-dropdown";
import LeadUploadSample from "../UploadFormats/Leadgeneration.xlsx";

import {
  Label,
  Card,
  CardBody,
  Input,
  Row,
  Modal,
  Col,
  Button,
  ModalHeader,
  ModalBody,
  Badge,
  Table,
  Spinner,
  Form,
  CustomInput,
} from "reactstrap";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "jspdf-autotable";

import { IoMdRemoveCircleOutline } from "react-icons/io";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaFilter,
  FaPlus,
  FaUpload,
} from "react-icons/fa";
import swal from "sweetalert";
import {
  _BulkUpload,
  _Delete,
  _Get,
  _Post,
  _PostSave,
} from "../../../../ApiEndPoint/ApiCalling";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import UserContext from "../../../../context/Context";
import { CheckPermission } from "../house/CheckPermission";
import SuperAdminUI from "../../../SuperAdminUi/SuperAdminUI";
import {
  AssignTo_Sales_Person,
  Bulk_Upload_Lead_Customer,
  Bulk_Upload_VIEW_LEAD_PARTY,
  Create_Account_List,
} from "../../../../ApiEndPoint/Api";
import {
  convertDataCSVtoExcel,
  convertDataCsvToXml,
  exportDataToExcel,
  exportDataToPDF,
} from "../house/Downloader";

const SelectedColums = [];

class SalesLead extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
    this.gridApi = null;
    this.state = {
      isOpen: false,
      Arrindex: "",
      rowData: [],
      SalesPerSonList: [],
      SelectedPartyList: [],
      MasterShow: false,
      PrintData: {},
      PrintMainData: {},
      BulkUploads: null,
      ButtonText: "Submit",
      modal: false,
      SetData: "",
      InsiderPermissions: {},
      setMySelectedarr: [],
      SelectedCols: [],
      paginationPageSize: 10,
      currenPageSize: "",
      getPageSize: "",
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
          width: 68,
          filter: true,
        },
        // {
        //   headerName: "Actions",
        //   field: "transactions",
        //   width: 95,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="actions cursor-pointer text-center">
        //         {this.state.InsiderPermissions &&
        //           this.state.InsiderPermissions?.View && (
        //             <Eye
        //               className="mr-50"
        //               size="25px"
        //               color="green"
        //               onClick={() => {
        //                 // this.handleChangeView(params.data, "readonly");
        //                 // this.togglemodal();
        //               }}
        //             />
        //           )}
        //         {this.state.InsiderPermissions &&
        //           this.state.InsiderPermissions?.Edit && (
        //             <>
        //               {params.data?.status
        //                 ?.toLowerCase()
        //                 ?.includes("completed") ? null : (
        //                 <>
        //                   {params.data?.status == "pending" && (
        //                     <>
        //                       <Edit
        //                         className="mr-50"
        //                         size="25px"
        //                         color="blue"
        //                         onClick={() =>
        //                           this.props.history.push({
        //                             pathname: `/app/freshlist/order/editOrder/${params.data?._id}`,
        //                             state: params.data,
        //                           })
        //                         }
        //                       />
        //                     </>
        //                   )}
        //                 </>
        //               )}
        //             </>
        //           )}
        //         {this.state.InsiderPermissions &&
        //           this.state.InsiderPermissions?.Edit && (
        //             <>
        //               {params?.data?.status
        //                 ?.toLowerCase()
        //                 .includes("completed") && (
        //                 <CornerDownLeft
        //                   title="Return It"
        //                   className="mr-50"
        //                   size="25px"
        //                   color="green"
        //                   onClick={() => {
        //                     localStorage.setItem(
        //                       "OrderList",
        //                       JSON.stringify(params.data)
        //                     );
        //                     this.props.history.push({
        //                       pathname: `/app/AJGroup/order/placeOrderReturn/${params.data?._id}`,
        //                       state: params.data,
        //                     });
        //                   }}
        //                 />
        //               )}
        //             </>
        //           )}
        //         {params.data?.status == "pending" ? (
        //           <>
        //             {this.state.InsiderPermissions &&
        //               this.state.InsiderPermissions.Delete && (
        //                 <Trash2
        //                   className="mr-50"
        //                   size="25px"
        //                   color="red"
        //                   onClick={() => {
        //                     this.runthisfunction(params?.data?._id);
        //                   }}
        //                 />
        //               )}
        //           </>
        //         ) : (
        //           <span className="mr-3"></span>
        //         )}
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Status",
        //   field: "status",
        //   filter: true,
        //   width: 90,
        //   cellRendererFramework: (params) => {
        //     return params.data?.status?.toLowerCase()?.includes("completed") ? (
        //       <div className="text-center">{params.data?.status}</div>
        //     ) : params.data.status == "InProcess" ? (
        //       <div className=" text-center ">{params.data?.status}</div>
        //     ) : params.data?.status == "pending" ? (
        //       <div className="text-center">Pending</div>
        //     ) : params.data?.status == "Cancelled" ? (
        //       <div className="text-center">{params.data?.status}</div>
        //     ) : null;
        //   },
        // },

        {
          headerName: "owner Name",
          field: "ownerName",
          filter: true,
          resizable: true,
          width: 198,
          cellRendererFramework: (params) => {
            return (
              <div className="text-center cursor-pointer">
                <div>
                  <span>{params.data?.ownerName}</span>
                </div>
              </div>
            );
          },
        },
        {
          headerName: "Address",
          field: "address",
          filter: true,
          width: 220,
          cellRendererFramework: (params) => {
            return (
              <div className="text-center cursor-pointer">
                <div>
                  <span>{params.data?.address}</span>
                </div>
              </div>
            );
          },
        },

        {
          headerName: "Company Name",
          field: "CompanyName",
          filter: true,
          resizable: true,
          width: 242,
          cellRendererFramework: (params) => {
            return (
              <div className="text-center cursor-pointer">
                <div>
                  <span>{`${params?.data?.CompanyName}`}</span>
                </div>
              </div>
            );
          },
        },
        {
          headerName: "State",
          field: "State",
          filter: true,
          width: 180,
          cellRendererFramework: (params) => {
            return (
              <div className="text-center cursor-pointer">
                <div>
                  <span>{params.data?.State}</span>
                </div>
              </div>
            );
          },
        },
        {
          headerName: "City",
          field: "City",
          filter: true,
          width: 135,
          cellRendererFramework: (params) => {
            // console.log(params.data);

            return (
              <div className="text-center cursor-pointer">
                <div>{params.data?.City}</div>
              </div>
            );
          },
        },
        {
          headerName: "pincode",
          field: "pincode",
          filter: true,
          width: 140,
          cellRendererFramework: (params) => {
            return (
              <div className="text-center cursor-pointer">
                <div>{params.data?.pincode && params.data?.pincode}</div>
              </div>
            );
          },
        },
      ],
    };
  }
  runthisfunction(id) {
    // console.log(id);
    swal("Warning", "Sure You Want to Delete it", {
      buttons: {
        cancel: "cancel",
        catch: { text: "Delete ", value: "delete" },
      },
    }).then((value) => {
      switch (value) {
        case "delete":
          _Delete("/order/delete-sales-order/", id)
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

  LookupviewStart = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  async Apicalling(id, db) {
    this.setState({ Loading: true });
    let url = `${Create_Account_List + id}/`;
    await _Get(url, db)
      .then((res) => {
        this.setState({ Loading: false });
        let value = res?.adminDetails;

        if (value?.length > 0) {
          let selected = value?.filter(
            (ele) => ele?.rolename?.roleName == "Sales Person"
          );

          this.setState({ SalesPerSonList: selected });
        }
      })
      .catch((err) => {
        this.setState({ Loading: false, rowData: [] });
        console.log(err);
      });
    await _Get(Bulk_Upload_VIEW_LEAD_PARTY, db, id)
      .then((res) => {
        this.setState({ Loading: false });
        if (res?.LeadParty?.length > 0) {
          let newList = res?.LeadParty?.filter(
            (lst) => lst.status !== "Deactive"
          );
          this.setState({ rowData: newList?.reverse() });
        }
        this.setState({ AllcolumnDefs: this.state.columnDefs });
        this.setState({ SelectedCols: this.state.columnDefs });
        let userHeading = JSON.parse(localStorage.getItem("Sales Lead"));
        if (userHeading?.length) {
          this.setState({ columnDefs: userHeading });
          // this.gridApi.setColumnDefs(userHeading);
          this.setState({ SelectedcolumnDefs: userHeading });
        } else {
          this.setState({ columnDefs: this.state.columnDefs });
          this.setState({ SelectedcolumnDefs: this.state.columnDefs });
        }
      })
      .catch((err) => {
        this.setState({ rowData: [] });
        this.setState({ Loading: false });
      });
  }
  async componentDidMount() {
    const UserInformation = this.context;
    this.setState({ CompanyDetails: UserInformation?.CompanyDetails });
    const InsidePermissions = CheckPermission("Sales Lead");
    this.setState({ InsiderPermissions: InsidePermissions });

    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    if (pageparmission?.rolename?.roleName === "MASTER") {
      this.setState({ MasterShow: true });
    }
    await this.Apicalling(pageparmission?._id, pageparmission?.database);
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };
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
  exportToPDF = async () => {
    const csvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    await exportDataToPDF(csvData, "AllOrderList");
  };
  processCell = (params) => {
    return params.value;
  };
  exportToExcel = async (e) => {
    const CsvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    await exportDataToExcel(CsvData, "AllOrderList");
  };
  convertCSVtoExcel = async () => {
    const CsvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    await convertDataCSVtoExcel(CsvData, "AllOrderList");
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
  convertCsvToXml = async () => {
    const CsvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    await convertDataCsvToXml(CsvData, "AllOrderList");
  };
  HandleSetVisibleField = (e) => {
    e.preventDefault();
    this.gridApi.setColumnDefs(this.state.SelectedcolumnDefs);
    this.setState({ columnDefs: this.state.SelectedcolumnDefs });
    this.setState({ SelectedcolumnDefs: this.state.SelectedcolumnDefs });
    this.setState({ rowData: this.state.rowData });
    localStorage.setItem(
      "Sales Lead",
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
  HandleUploadLead = async (e) => {
    e.preventDefault();
    debugger;
    this.setState({ Loading: true });
    const formdata = new FormData();

    let userData = JSON.parse(localStorage.getItem("userData"));
    formdata.append("file", this.state.BulkUploads);
    // formdata.append("database", userData?.database);
    await _BulkUpload(Bulk_Upload_Lead_Customer, formdata)
      .then((res) => {
        this.setState({ Loading: false });
        this.props.history.goBack();
        swal(`${res?.message}`);
      })
      .catch((err) => {
        this.setState({ Loading: false });
        console.log(err.response);
        swal("Something Went Wrong");
      });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
  HandleSelect = (selectedList, selectedItem) => {
    this.setState({ Charges: selectedList });
    this.handleAddCharges(selectedList);
  };
  HandleRemove = (selectedList, selectedItem) => {
    this.setState({ ChargesOrDiscount: selectedList });
    this.handleAddCharges(selectedList);
  };
  HandleSelectDiscount = (selectedList, selectedItem) => {
    this.setState({ Discount: selectedList });
    this.handleAddCharges(selectedList);
  };
  HandleRemoveDiscount = (selectedList, selectedItem) => {
    this.setState({ ChargesOrDiscount: selectedList });
    this.handleAddCharges(selectedList);
  };
  handleReset = () => {
    this.setState({ Charges: [] });
    this.setState({ Discount: [] });

    this.setState({ PrintData: this.state.ViewOneData });
    this.setState({ PrintMainData: this.state.ViewOneData });
  };
  handleSelectionParty = (selectedList, selectedItem) => {
    console.log(selectedList);

    this.setState({ SelectedPartyList: selectedList });
  };
  onRemove1 = (selectedList, removedItem, index) => {
    console.log(selectedList);
    this.setState({ SelectedPartyList: selectedList });
  };
  handleAssignParty = async (e) => {
    e.preventDefault();
    this.setState({ Loading: true });
    console.log(this.state.SelectedPartyList);
    console.log(this.state.SetData);
    let list = this.state.SelectedPartyList?.map((ele) => {
      return { id: ele?._id };
    });
    let payload = {
      leadParty: list,
      salesPerson: this.state.SetData,
    };
    await _PostSave(AssignTo_Sales_Person, payload)
      .then((res) => {
        this.setState({ Loading: false });
        this.LookupviewStart();

        swal("success", `${res?.message}`, "success");
      })
      .catch((err) => {
        this.setState({ Loading: false });
        swal("error", `Error Occured Try again`, "error");
      });
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
      AllcolumnDefs,
    } = this.state;
    return (
      <>
        <div className="app-user-list">
          <Card>
            <Row className=" mt-2 mx-1 mr-1">
              {/* <iframe src="https://www.clickdimensions.com/links/TestPDFfile.pdf" /> */}
              <Col lg="2" md="3" sm="12">
                <h2 className="float-left " style={{ fontWeight: "600" }}>
                  Sales Lead
                </h2>
              </Col>
              {this.state.MasterShow ? (
                <Col lg="3" md="3" sm="12">
                  <SuperAdminUI
                    onDropdownChange={this.handleDropdownChange}
                    onSubmit={this.handleParentSubmit}
                  />
                </Col>
              ) : (
                <Col></Col>
              )}
              <Col lg="2" md="6" sm="12">
                <div>
                  <div className="table-input mb-1 cssforproductlist">
                    <Input
                      placeholder="search Item here..."
                      onChange={(e) => this.updateSearchQuery(e.target.value)}
                      value={this.state.value}
                    />
                  </div>
                  {/* <div className="mb-1 mr-1">
                    <UncontrolledDropdown className="p-1 ag-dropdown">
                      <DropdownToggle tag="div">
                        {this.gridApi
                          ? this.state.currenPageSize
                          : "" * this.state.getPageSize -
                            (this.state.getPageSize - 1)}{" "}
                        -{" "}
                        {this.state.rowData.length -
                          this.state.currenPageSize * this.state.getPageSize >
                        0
                          ? this.state.currenPageSize * this.state.getPageSize
                          : this.state.rowData.length}{" "}
                        of {this.state.rowData.length}
                        <ChevronDown className="ml-50" size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(10)}>
                          10
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
                  </div> */}
                </div>
              </Col>
              <Col lg="2" xs="8">
                {InsiderPermissions && InsiderPermissions?.Create && (
                  <span>
                    <Route
                      render={({ history }) => (
                        <Button
                          style={{
                            cursor: "pointer",
                            backgroundColor: "rgb(8, 91, 245)",
                            color: "white",
                            fontWeight: "600",
                            height: "43px",
                          }}
                          className="float-left"
                          color="#39cccc"
                          onClick={(e) => {
                            this.setState({
                              Upload: true,
                              FieldChange: false,
                              Assign: false,
                            });
                            this.LookupviewStart();
                          }}>
                          <FaPlus size={15} /> Upload
                        </Button>
                      )}
                    />
                  </span>
                )}
              </Col>
              <Col lg="1" xs="6">
                {InsiderPermissions && InsiderPermissions?.Create && (
                  <span>
                    <Route
                      render={({ history }) => (
                        <Button
                          style={{
                            cursor: "pointer",
                            backgroundColor: "rgb(8, 91, 245)",
                            color: "white",
                            fontWeight: "600",
                            height: "43px",
                          }}
                          className="float-left"
                          color="#39cccc"
                          onClick={(e) => {
                            this.setState({
                              Upload: false,
                              FieldChange: false,
                              Assign: true,
                            });
                            this.LookupviewStart();
                          }}>
                          Assign
                        </Button>
                      )}
                    />
                  </span>
                )}
              </Col>
              <Col lg="1" xs="4">
                {InsiderPermissions && InsiderPermissions?.View && (
                  <>
                    <span className="">
                      <FaFilter
                        style={{ cursor: "pointer" }}
                        title="filter coloumn"
                        size="35px"
                        onClick={(e) => {
                          this.setState({
                            Upload: false,
                            FieldChange: true,
                            Assign: false,
                          });
                          this.LookupviewStart();
                        }}
                        color="rgb(8, 91, 245)"
                        className="float-right"
                      />
                    </span>
                  </>
                )}
                {InsiderPermissions && InsiderPermissions?.Download && (
                  <span
                    onMouseEnter={this.toggleDropdown}
                    onMouseLeave={this.toggleDropdown}
                    className="">
                    <div className="dropdown-container float-right">
                      <ImDownload
                        style={{ cursor: "pointer" }}
                        title="download file"
                        size="35px"
                        className="dropdown-button "
                        color="rgb(8, 91, 245)"
                        onClick={this.toggleDropdown}
                      />
                      {isOpen && (
                        <div
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            border: "1px solid rgb(8, 91, 245)",
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
                          {InsiderPermissions &&
                            InsiderPermissions?.BulkUpload && (
                              <h5>
                                <a
                                  style={{
                                    cursor: "pointer",
                                    color: "black",
                                  }}
                                  className=" mx-1 myactive"
                                  href={LeadUploadSample}
                                  download>
                                  . Format
                                </a>
                              </h5>
                            )}
                        </div>
                      )}
                    </div>
                  </span>
                )}
              </Col>
            </Row>
            {InsiderPermissions && InsiderPermissions?.View && (
              <>
                {this.state.rowData === null ? null : (
                  <div className="ag-theme-material w-100 my-2 ag-grid-table">
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
                          // // pagination={true}
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
              </>
            )}
          </Card>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.LookupviewStart}
          className={this.props.className}
          style={{ maxWidth: "1050px" }}>
          <ModalHeader toggle={this.LookupviewStart}>
            {" "}
            {this.state.Upload ? "Upload Data" : "Update"}{" "}
          </ModalHeader>
          <ModalBody className="modalbodyhead">
            {this.state.Upload ? (
              <>
                <Form onSubmit={this.HandleUploadLead}>
                  <div className="d-flex justify-content-center mt-2">
                    <h2>Upload Your File here</h2>
                  </div>
                  <div className="parent">
                    <div className="file-upload mb-3">
                      <FaUpload color="green" size={50} />

                      <p>Click box to Upload</p>
                      <input
                        required
                        title="Click to Upload"
                        type="file"
                        name="file"
                        onChange={(e) => {
                          this.setState({ BulkUploads: e.target.files[0] });
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      disabled={this.state.Loading ? true : false}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "rgb(8, 91, 245)",
                        color: "white",
                        fontWeight: "600",
                        height: "43px",
                      }}
                      color="#39cccc"
                      type="submit">
                      {this.state.Loading ? "UpLoading..." : "Upload"}
                    </Button>
                  </div>
                </Form>
              </>
            ) : (
              <>
                {this.state.FieldChange && (
                  <>
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
                      <Col
                        lg="2"
                        md="2"
                        sm="12"
                        xl="2"
                        xs="12"
                        className="colarrowbtn">
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
                                        <div
                                          key={i}
                                          className="mycustomtag mt-1">
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

                                                  if (
                                                    SelectedCols &&
                                                    delindex >= 0
                                                  ) {
                                                    const splicedElement =
                                                      SelectedCols?.splice(
                                                        delindex,
                                                        1
                                                      ); // Remove the element
                                                    // splicedElement contains the removed element, if needed

                                                    this.setState({
                                                      SelectedcolumnDefs:
                                                        SelectedCols, // Update the state with the modified array
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
                  </>
                )}
                {this.state.Assign && (
                  <>
                    <div className="d-flex justify-content-center mb-3">
                      <h4>Assign To Sales Person</h4>
                    </div>
                    <Form onSubmit={this.handleAssignParty}>
                      <Row>
                        <Col>
                          <Label className="mb-1">Select Sales Person:</Label>
                          <CustomInput
                            onChange={(e) => {
                              this.setState({ SetData: e.target.value });
                            }}
                            type="select">
                            <option value={null}>----Select----</option>
                            {this.state.SalesPerSonList?.length > 0 && (
                              <>
                                {this.state.SalesPerSonList?.map((ele) => (
                                  <option value={ele?._id}>
                                    {ele?.firstName} {ele?.lastName}(City:
                                    {ele?.City ? ele?.City : "Not Found"})
                                  </option>
                                ))}
                              </>
                            )}
                          </CustomInput>
                        </Col>
                        <Col>
                          <Label className="mb-1">Select Customer: </Label>
                          <Multiselect
                            required
                            isObject="false"
                            options={this.state.rowData}
                            onSelect={(selectedList, selectedItem) =>
                              this.handleSelectionParty(
                                selectedList,
                                selectedItem
                              )
                            }
                            onRemove={(selectedList, selectedItem) => {
                              this.onRemove1(selectedList, selectedItem);
                            }}
                            displayValue="ownerName"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col>
                          <div className="d-flex justify-content-center">
                            <Button color="primary" type="submit">
                              Submit
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </>
                )}
              </>
            )}
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default SalesLead;

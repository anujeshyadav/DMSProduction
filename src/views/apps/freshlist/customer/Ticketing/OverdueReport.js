import React from "react";
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
  Label,
  Button,
  Spinner,
} from "reactstrap";
import { ContextLayout } from "../../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Logo from "../../../../../assets/img/profile/pages/logomain.png";
import Papa from "papaparse";
import { ChevronDown } from "react-feather";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import "../../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../../assets/scss/pages/users.scss";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaFilter,
} from "react-icons/fa";
import { _Get } from "../../../../../ApiEndPoint/ApiCalling";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import * as XLSX from "xlsx";
import UserContext from "../../../../../context/Context";
import { CheckPermission } from "../../house/CheckPermission";
import SuperAdminUI from "../../../../SuperAdminUi/SuperAdminUI";
import { ImDownload } from "react-icons/im";
import { Customer_OverDue_report_List } from "../../../../../ApiEndPoint/Api";

const SelectedColums = [];

class OverdueReport extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
    this.gridApi = null;
    this.state = {
      isOpen: false,
      MasterShow: false,
      Arrindex: "",
      rowData: [],
      rowAllData: [],
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
          width: 80,
          filter: true,
        },
        {
          headerName: "PartyName",
          field: "partyId.ownerName",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>
                  {params?.data?.partyId?.ownerName}
                  {params?.data?.partyId?.ownerName}
                </span>
              </div>
            );
          },
        },
        {
          headerName: "DueStatus",
          field: "dueStatus",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params?.data?.dueStatus}</span>
              </div>
            );
          },
        },
        {
          headerName: "Order Amount",
          field: "totalOrderAmount",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params?.data?.totalOrderAmount}</span>
              </div>
            );
          },
        },
        {
          headerName: "locking Amount",
          field: "lockingAmount",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params?.data?.lockingAmount}</span>
              </div>
            );
          },
        },
        {
          headerName: "PaidAmount",
          field: "totalPaidAmount",
          filter: true,
          width: 260,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params?.data?.totalPaidAmount}</span>
              </div>
            );
          },
        },
        {
          headerName: "Remaining Amount",
          field: "remainingAmount",
          filter: true,
          width: 260,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params?.data?.remainingAmount}</span>
              </div>
            );
          },
        },
        {
          headerName: "Date",
          field: "updatedAt",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params?.data?.updatedAt?.split("T")[0]}</span>
              </div>
            );
          },
        },
        {
          headerName: "lockingAmount",
          field: "lockingAmount",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params?.data?.lockingAmount}</span>
              </div>
            );
          },
        },
        {
          headerName: "lock Time",
          field: "lockInTime",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params?.data?.partyId?.lockInTime}</span>
              </div>
            );
          },
        },
        // {
        //   headerName: "IMAGE",
        //   field: "IMAGE",
        //   filter: true,
        //   width: 200,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div>
        //         {params?.data?.product?.Product_image && (
        //           <img
        //             height={45}
        //             width={45}
        //             src={`${Image_URL}/${params?.data?.product?.Product_image}`}
        //             alt="image"
        //           />
        //         )}
        //       </div>
        //     );
        //   },
        // },

        {
          headerName: "mobile Number",
          field: "partyId.mobileNumber",
          filter: true,
          width: 230,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params?.data?.partyId?.mobileNumber}</span>
              </div>
            );
          },
        },
        {
          headerName: "Pan Num",
          field: "partyId.panNo",
          filter: true,
          width: 230,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params?.data?.partyId?.panNo}</span>
              </div>
            );
          },
        },
      ],
    };
  }

  LookupviewStart = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  async Apicalling(id, db) {
    this.setState({ Loading: true });
    await _Get(Customer_OverDue_report_List, db)
      .then((res) => {
        let value = res?.due;

        if (value?.length > 0) {
          this.setState({ Loading: false });
          this.setState({ rowData: value });
          this.setState({ rowAllData: value });
        }
        this.setState({ AllcolumnDefs: this.state.columnDefs });
        this.setState({ SelectedCols: this.state.columnDefs });

        let userHeading = JSON.parse(localStorage.getItem("OrderReportList"));
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
        this.setState({ Loading: false });
        this.setState({ rowData: [] });
        console.log(err);
      });
  }
  async componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    const UserInformation = this.context?.UserInformatio;
    if (userInfo?.rolename?.roleName === "MASTER") {
      this.setState({ MasterShow: true });
    }
    const InsidePermissions = CheckPermission("Overdue Report");
    this.setState({ InsiderPermissions: InsidePermissions });
    await this.Apicalling(userInfo?._id, userInfo?.database);
  }

  handleStockTrxInvoiceShow = () => {
    this.setState({ ShowBill: true });
  };
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
    const filteredItems = this.state.rowAllData.filter((item) => {
      const dateList = new Date(item?.updatedAt);
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
      "OrderReportList",
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
      AllcolumnDefs,
    } = this.state;
    return (
      <>
        <div className="app-user-list">
          <Card>
            <Row className="ml-2  mr-2">
              <Col style={{marginTop:'30px'}}>
                <h3 className="float-left " style={{ fontWeight: "600" }}>
                  Over Due Report
                </h3>
              </Col>
              {this.state.MasterShow && this.state.MasterShow ? (
                <Col lg="2" md="2" xl="2" style={{marginTop:'30px'}}>
                  <SuperAdminUI
                    onDropdownChange={this.handleDropdownChange}
                    onSubmit={this.handleParentSubmit}
                  />
                </Col>
              ) : (
                <Col></Col>
              )}
              <Col style={{marginTop:'30px'}} lg='2' xl='2' md='2'><div className="table-input">
              <Input
               
                placeholder="search Item here..."
                onChange={(e) =>
                  this.updateSearchQuery(e.target.value)
                }
                value={this.state.value}
              />
            </div></Col>
              <Col xl='5' lg='5' md='5'>
             <Row>
             <Col xl='5' lg='5' md='5' style={{marginTop:'9px'}}> <div className="table-input">
             <Label>Start Date</Label>
             <Input
               type="date"
               name="startDate"
               value={this.state.startDate}
               onChange={this.handleDate}
             />
           </div></Col>
             <Col xl='5' lg='5' md='5' style={{marginTop:'9px'}}> <div className="table-input">
             <Label>End Date</Label>
             <Input
               type="date"
               name="EndDate"
               value={this.state.EndDate}
               onChange={this.handleDate}
             />
           </div></Col>
             <Col xl='2' lg='2' md='2' style={{marginTop:'30px'}}>
             <div className="table-input">
               <Button
                 type="submit"
                
                 color="primary"
                 onClick={this.handleSubmitDate}>
                 Submit
               </Button>
             </div></Col>
             </Row>
           
              </Col>

              <Col xl='1' lg='1' md='2' style={{marginTop:'30px'}}>
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
                        className="dropdown-button"
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
            <CardBody style={{ marginTop: "0rem" }}>
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
        </div>

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
      </>
    );
  }
}
export default OverdueReport;

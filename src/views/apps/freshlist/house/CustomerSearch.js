import React from "react";
import { Route } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import {
  Card,
  CardBody,
  Input,
  Row,
  Modal,
  Col,
  Button,
  ModalHeader,
  ModalBody,
  Spinner,
} from "reactstrap";
import UserForm from "../UploadFormats/Customer.pdf";
import { ImDownload } from "react-icons/im";
import CreateCustomerSample from "../UploadFormats/CreateCustomerSample.xlsx";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import EditAccount from "../accounts/EditCustomer";
import ViewAccount from "../accounts/ViewCustomer";
import "jspdf-autotable";
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
import swal from "sweetalert";
import {
  CreateCustomerList,
  DeleteCustomerList,
} from "../../../../ApiEndPoint/ApiCalling";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import UserContext from "../../../../context/Context";
import { CheckPermission } from "./CheckPermission";
import SuperAdminUI from "../../../SuperAdminUi/SuperAdminUI";
import { Image_URL } from "../../../../ApiEndPoint/Api";
import {
  convertDataCSVtoExcel,
  convertDataCsvToXml,
  exportDataToExcel,
  exportDataToPDF,
} from "./Downloader";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const SelectedColums = [];

class CustomerSearch extends React.Component {
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
      InsiderPermissions: {},
      setMySelectedarr: [],
      SelectedCols: [],
      paginationPageSize: 5,
      currenPageSize: "",
      getPageSize: "",
      columnDefs: [
        {
          headerName: "UID",
          valueGetter: "node.rowIndex + 1",
          field: "node.rowIndex + 1",
          width: 80,
          filter: true,
        },

        {
          headerName: "First Name",
          field: "firstName",
          width: 210,
          filter: true,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.firstName}</span>
                </div>
              </>
            );
          },
        },

        {
          headerName: "Last Name",
          field: "lastName",
          filter: true,
          width: 151,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.lastName}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Email",
          field: "email",
          filter: true,
          width: 235,
          sortable: true,
          editable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.email}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "GST Number",
          field: "gstNumber",
          filter: true,
          width: 175,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.gstNumber}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "User Name",
          field: "userName",
          filter: true,
          width: 200,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.userName}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Mobile Number",
          field: "mobileNumber",
          width: 152,
          filter: true,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.mobileNumber}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Owner Name",
          field: "ownerName",
          filter: true,
          width: 230,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.ownerName}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Pan No",
          field: "panNo",
          width: 140,
          filter: true,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.panNo}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Company Pan No",
          field: "comPanNo",
          width: 170,
          filter: true,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.comPanNo}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "PassPort No",
          field: "passPortNo",
          filter: true,
          width: 150,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.passPortNo}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Payment Term",
          field: "paymentTerm",
          filter: true,
          width: 150,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.paymentTerm}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Home Pincode",
          field: "personalPincode",
          filter: true,
          sortable: true,
          width: 140,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.personalPincode}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Aadhar No",
          field: "aadharNo",
          width: 140,
          filter: true,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.aadharNo}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Home city",
          field: "Pcity",
          width: 120,
          filter: true,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.Pcity}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Home State",
          field: "Pstate",
          filter: true,
          width: 180,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.Pstate}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Company Name",
          field: "CompanyName",
          filter: true,
          width: 220,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.CompanyName}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Address",
          field: "address",
          filter: true,
          width: 290,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.address}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "State",
          field: "State",
          filter: true,
          width: 190,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.State}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "City",
          field: "City",
          width: 130,
          filter: true,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.City}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Address First",
          field: "address1",
          filter: true,
          width: 250,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.address1}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Address Second",
          field: "address2",
          filter: true,
          width: 250,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.address2}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Annual Turnover",
          field: "annualTurnover",
          filter: true,
          width: 163,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.annualTurnover}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Transporter",
          field: "assignTransporter",
          filter: true,

          sortable: true,
          width: 130,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.assignTransporter?.length}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Category",
          field: "category",
          filter: true,
          width: 130,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.category?.groupName}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Company PanNo",
          field: "comPanNo",
          width: 170,
          filter: true,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.comPanNo}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Contact Number",
          field: "contactNumber",
          filter: true,
          width: 165,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.contactNumber}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Deals In",
          field: "dealsInProducts",
          width: 100,
          filter: true,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.dealsInProducts}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Due Date",
          field: "duedate",
          width: 115,
          filter: true,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.duedate}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Geo tagging",
          field: "geotagging",
          filter: true,
          width: 150,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.geotagging}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Limit",
          field: "limit",
          filter: true,
          width: 130,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.limit}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Lock Time",
          field: "lockInTime",
          width: 145,
          filter: true,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.lockInTime}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Party Type",
          field: "partyType",
          filter: true,
          sortable: true,
          width: 165,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.partyType}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Party id",
          field: "partyType",
          width: 165,
          filter: true,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.partyType}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Registration Id",
          field: "registrationType",
          filter: true,
          width: 170,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.registrationType}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Registration Type",
          field: "registrationType",
          filter: true,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer">
                  <span>{params?.data?.registrationType}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Transporter Details",
          field: "transporterDetail",
          filter: true,
          width: 187,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>
                    {params?.data?.transporterDetail == 0 ? "Local" : "Other"}
                  </span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Transporter Id",
          field: "transporterDetail",
          filter: true,
          width: 150,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.transporterDetail}</span>
                </div>
              </>
            );
          },
        },

        {
          headerName: "Pin code",
          field: "pincode",
          filter: true,
          width: 105,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.pincode}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Service Area",
          field: "serviceArea",
          filter: true,
          width: 135,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.serviceArea}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Shop Size",
          field: "shopSize",
          filter: true,
          width: 155,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.shopSize}</span>
                </div>
              </>
            );
          },
        },

        {
          headerName: "Created date",
          field: "createdAt",
          filter: true,
          width: 135,
          sortable: true,
          headingFixed: top,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
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
          width: 135,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <div className="actions cursor-pointer">
                    <span>{params?.data?.updatedAt?.split("T")[0]}</span>
                  </div>
                </div>
              </>
            );
          },
        },

        {
          headerName: "Shop Photo",
          field: "Shopphoto",
          filter: true,
          sortable: true,
          width: 143,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  {params?.data?.shopPhoto && (
                    <img
                      width={40}
                      height={40}
                      src={`${Image_URL}/Images/${params?.data?.shopPhoto[0]}`}
                      alt="Img"
                    />
                  )}
                </div>
              </>
            );
          },
        },
        {
          headerName: "Photo",
          field: "Photo",
          filter: true,
          width: 112,
          sortable: true,
          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  {params?.data?.Photo && (
                    <img
                      width={40}
                      height={40}
                      src={`${Image_URL}/Images/${params?.data?.Photo}`}
                      alt="img"
                    />
                  )}
                </div>
              </>
            );
          },
        },

        {
          headerName: "Created BY",
          field: "created_by.firstName",
          width: 125,
          filter: true,
          sortable: true,
          editable: true,

          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.created_by?.firstName}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Role Id",
          field: "rolename",
          filter: true,
          sortable: true,
          width: 230,
          editable: true,

          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?.rolename}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Id",
          field: "_id",
          filter: true,
          width: 243,
          sortable: true,
          editable: true,

          cellRendererFramework: params => {
            return (
              <>
                <div className="actions cursor-pointer text-center">
                  <span>{params?.data?._id}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "Status",
          field: "status",
          filter: true,
          width: 95,

          cellRendererFramework: params => {
            return params.data?.status === "Active" ? (
              <div className="text-center">{params.data?.status}</div>
            ) : params.data?.status === "Deactive" ? (
              <div className="text-center">{params.data?.status}</div>
            ) : null;
          },
        },
        {
          headerName: "Actions",
          field: "sortorder",
          field: "transactions",
          width: 147,
          cellRendererFramework: params => {
            return (
              <div className="actions cursor-pointer text-center">
                {this.state.InsiderPermissions &&
                  this.state.InsiderPermissions?.View && (
                    <Route
                      render={({ history }) => (
                        <span
                          style={{
                            border: "1px solid white",
                            padding: "10px",
                            borderRadius: "30px",
                            backgroundColor: "#39cccc",
                          }}
                        >
                          <Eye
                            className=""
                            size="20px"
                            color="white"
                            // onClick={() => {
                            //   this.handleChangeEdit(params.data, "readonly");
                            // }}
                            onClick={() =>
                              history.push(
                                `/app/SoftNumen/account/ViewCustomer/${params?.data?._id}`
                              )
                            }
                          />
                        </span>
                      )}
                    />
                  )}
                {this.state.InsiderPermissions &&
                  this.state.InsiderPermissions?.Edit && (
                    <Route
                      render={({ history }) => (
                        <span
                          style={{
                            border: "1px solid white",
                            padding: "10px",
                            borderRadius: "30px",
                            backgroundColor: "rgb(212, 111, 16)",
                            marginLeft: "3px",
                          }}
                        >
                          <FaPencilAlt
                            className=""
                            size="20px"
                            color="white"
                            onClick={() =>
                              history.push(
                                `/app/SoftNumen/account/CreateCustomer/${params?.data?._id}`
                              )
                            }
                            // onClick={() => {
                            //   this.handleChangeEdit(params?.data, "Editable");
                            // }}
                          />
                        </span>
                      )}
                    />
                  )}
                {this.state.InsiderPermissions &&
                  this.state.InsiderPermissions?.Delete && (
                    <Route
                      render={() => (
                        <span
                          style={{
                            border: "1px solid white",
                            padding: "10px",
                            borderRadius: "30px",
                            backgroundColor: "rgb(236, 24, 9)",
                            marginLeft: "3px",
                          }}
                        >
                          <Trash2
                            className=""
                            size="20px"
                            color="white"
                            onClick={() => {
                              this.runthisfunction(params?.data?._id);
                            }}
                          />
                        </span>
                      )}
                    />
                  )}
              </div>
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

  LookupviewStart = () => {
    this.setState(prevState => ({
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
  async Apicalling(id, db) {
    this.setState({ Loading: true });
    await CreateCustomerList(id, db)
      .then(res => {
        console.log(res?.Customer);
        this.setState({ Loading: false });
        this.setState({ AllcolumnDefs: this.state.columnDefs });
        let userHeading = JSON.parse(localStorage.getItem("CustomerSearch"));
        if (userHeading?.length) {
          this.setState({ columnDefs: userHeading });
          // this.gridApi.setColumnDefs(userHeading);
          this.setState({ SelectedcolumnDefs: userHeading });
        } else {
          this.setState({ columnDefs: this.state.columnDefs });
          this.setState({ SelectedcolumnDefs: this.state.columnDefs });
        }
        this.setState({ SelectedCols: this.state.columnDefs });
        let value = res?.Customer;
        // console.log(res?.Customer);
        if (value?.length) {
          this.setState({ rowData: value?.reverse() });
        }
      })
      .catch(err => {
        this.setState({ Loading: false });

        console.log(err);
      });
  }
  async componentDidMount() {
    const UserInformation = this.context?.UserInformatio;
    const InsidePermissions = CheckPermission("Create Customer");
    this.setState({ InsiderPermissions: InsidePermissions });

    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData?.rolename?.roleName === "MASTER") {
      this.setState({ MasterShow: true });
    }
    await this.Apicalling(userData?._id, userData?.database);
  }
  toggleDropdown = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  runthisfunction(id) {
    swal("Warning", "Sure You Want to Delete it", {
      buttons: {
        cancel: "cancel",
        catch: { text: "Delete ", value: "delete" },
      },
    }).then(value => {
      switch (value) {
        case "delete":
          DeleteCustomerList(id)
            .then(res => {
              let selectedData = this.gridApi.getSelectedRows();
              this.gridApi.updateRowData({ remove: selectedData });
            })
            .catch(err => {
              console.log(err);
            });
          break;
        default:
      }
    });
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridRef.current = params.api;

    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages(),
    });
  };

  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val);
  };

  filterSize = val => {
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
        ele => ele?.headerName === value?.headerName
      );

      SelectedColums?.splice(delindex, 1);
    }
  };

  exportToPDF = async () => {
    const csvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    await exportDataToPDF(csvData, "CustomerList");
  };
  processCell = params => {
    // console.log(params);
    // Customize cell content as needed
    return params.value;
  };

  exportToExcel = async (fileName, e) => {
    this.state.rowData?.forEach(ele => {
      delete ele?.status;
      delete ele?.Transporter;
      delete ele?.createdAt;
      delete ele?.updatedAt;
      delete ele?.userName;
      // delete ele?.id;
      delete ele?.created_by;
      delete ele?.__v;
      delete ele?._id;
      // delete ele?.warehouse;
      delete ele?.code;
      delete ele?.database;
      delete ele?.rolename;
      delete ele?.otpVerify;
      delete ele?.password;
      delete ele?.deviceStatus;
      delete ele?.updatedAt;
      delete ele?.planStatus;
      delete ele?.setRule;
      delete ele?.autoBillingStatus;
      delete ele?.Photo;
      delete ele?.shopPhoto;
      // delete ele?.branch;
      // delete ele?.shift;
    });
    const worksheet = XLSX.utils.json_to_sheet(this.state.rowData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, `${fileName}.xlsx`);
  };

  convertCSVtoExcel = async fileName => {
    this.state.rowData?.forEach(ele => {
      delete ele?.status;
      delete ele?.Transporter;
      delete ele?.createdAt;
      delete ele?.updatedAt;
      delete ele?.userName;
      delete ele?.created_by;
      delete ele?.__v;
      delete ele?._id;
      // delete ele?.warehouse;
      delete ele?.code;
      delete ele?.database;
      delete ele?.rolename;
      delete ele?.otpVerify;
      delete ele?.password;
      delete ele?.deviceStatus;
      delete ele?.updatedAt;
      delete ele?.planStatus;
      delete ele?.setRule;
      delete ele?.autoBillingStatus;
      delete ele?.Photo;
      delete ele?.shopPhoto;
      // delete ele?.branch;
      // delete ele?.shift;
    });
    const worksheet = XLSX.utils.json_to_sheet(this.state.rowData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xls",
      type: "array",
    });

    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, `${fileName}.xls`);
    // const CsvData = this.gridApi.getDataAsCsv({
    //   processCellCallback: this.processCell,
    // });
    // await convertDataCSVtoExcel(CsvData, "CustomerList");
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
    await convertDataCsvToXml(CsvData, "CustomerList");
  };

  HandleSetVisibleField = e => {
    e.preventDefault();
    this.gridApi.setColumnDefs(this.state.SelectedcolumnDefs);
    this.setState({ columnDefs: this.state.SelectedcolumnDefs });
    this.setState({ SelectedcolumnDefs: this.state.SelectedcolumnDefs });
    this.setState({ rowData: this.state.rowData });
    localStorage.setItem(
      "CustomerSearch",
      JSON.stringify(this.state.SelectedcolumnDefs)
    );
    this.LookupviewStart();
  };

  HeadingRightShift = () => {
    const updatedSelectedColumnDefs = [
      ...new Set([
        ...this.state.SelectedcolumnDefs.map(item => JSON.stringify(item)),
        ...SelectedColums.map(item => JSON.stringify(item)),
      ]),
    ].map(item => JSON.parse(item));
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
  handleParentSubmit = e => {
    e.preventDefault();
    let SuperAdmin = JSON.parse(localStorage.getItem("SuperadminIdByMaster"));
    let id = SuperAdmin.split(" ")[0];
    let db = SuperAdmin.split(" ")[1];
    this.Apicalling(id, db);
  };
  handleDropdownChange = selectedValue => {
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
          }}
        >
          <Spinner
            style={{
              height: "4rem",
              width: "4rem",
            }}
            color="primary"
          >
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
      SelectedCols,
      AllcolumnDefs,
      InsiderPermissions,
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
                    onClick={e => {
                      e.preventDefault();
                      this.setState({ EditOneUserView: false });
                      this.componentDidMount();
                    }}
                    color="danger"
                  >
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
                          onClick={e => {
                            e.preventDefault();
                            this.setState({ ViewOneUserView: false });
                          }}
                          color="danger"
                        >
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
                      <Row
                        style={{
                          marginLeft: "3px",
                          marginRight: "3px",
                          marginTop: "10px",
                        }}
                      >
                        <Col lg="2" md="2" style={{ marginTop: "10px" }}>
                          <h2
                            className="float-left"
                            style={{ fontWeight: "600" }}
                          >
                            Customer List
                          </h2>
                        </Col>

                        {this.state.MasterShow ? (
                          <Col
                            lg="3"
                            md="3"
                            sm="12"
                            style={{ marginTop: "10px" }}
                          >
                            <SuperAdminUI
                              onDropdownChange={this.handleDropdownChange}
                              onSubmit={this.handleParentSubmit}
                            />
                          </Col>
                        ) : (
                          <Col></Col>
                        )}
                        <Col lg="7" xl="7" md="7">
                          <Row>
                            <Col
                              lg="4"
                              md="4"
                              xl="4"
                              style={{ marginTop: "10px" }}
                            >
                              <div className="">
                                {/* <div className="mb-1 mr-1">
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
                          </div> */}
                                <div className="table-input ">
                                  <Input
                                    style={{ width: "100%" }}
                                    placeholder="search Item here..."
                                    onChange={e =>
                                      this.updateSearchQuery(e.target.value)
                                    }
                                    value={this.state.value}
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col
                              lg="2"
                              xl="2"
                              md="2"
                              xs="5"
                              style={{ marginTop: "10px" }}
                            >
                              {InsiderPermissions &&
                                InsiderPermissions?.Download && (
                                  <span>
                                    <a
                                      title="Create User Format Download here"
                                      target="_blank"
                                      href={UserForm}
                                      download={UserForm}
                                    >
                                      <Button
                                        style={{
                                          cursor: "pointer",
                                          backgroundColor: "rgb(8, 91, 245)",
                                          color: "white",
                                          fontWeight: "500",
                                          height: "43px",
                                        }}
                                        className="float-right"
                                        color="#39cccc"
                                      >
                                        Format
                                      </Button>
                                    </a>
                                  </span>
                                )}
                            </Col>
                            <Col
                              lg="4"
                              xl="4"
                              md="4"
                              xs="7"
                              style={{ marginTop: "10px" }}
                            >
                              {InsiderPermissions &&
                                InsiderPermissions?.Create && (
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
                                          onClick={() =>
                                            history.push(
                                              `/app/SoftNumen/account/CreateCustomer/${0}`
                                            )
                                          }
                                        >
                                          <FaPlus size={15} /> Create Customer
                                        </Button>
                                      )}
                                    />
                                  </span>
                                )}
                            </Col>
                            <Col
                              lg="2"
                              xl="2"
                              md="2"
                              style={{ marginTop: "10px" }}
                            >
                              {InsiderPermissions &&
                                InsiderPermissions?.View && (
                                  <>
                                    <span className="">
                                      <FaFilter
                                        style={{ cursor: "pointer" }}
                                        title="filter coloumn"
                                        size="35px"
                                        onClick={this.LookupviewStart}
                                        color="rgb(8, 91, 245)"
                                        className="float-right "
                                      />
                                    </span>
                                  </>
                                )}
                              {InsiderPermissions &&
                                InsiderPermissions?.Download && (
                                  <span
                                    onMouseEnter={this.toggleDropdown}
                                    onMouseLeave={this.toggleDropdown}
                                    className=""
                                  >
                                    <div className="dropdown-container float-right">
                                      <ImDownload
                                        style={{ cursor: "pointer" }}
                                        title="download file"
                                        size="35px"
                                        className="dropdown-button "
                                        color="rgb(8, 91, 245)"
                                      />
                                      {isOpen && (
                                        <div
                                          style={{
                                            position: "absolute",
                                            zIndex: "1",
                                            border: "1px solid rgb(8, 91, 245)",
                                            backgroundColor: "white",
                                            fontWeight: "500",
                                          }}
                                          className="dropdown-content dropdownmy"
                                        >
                                          <h5
                                            onClick={() => this.exportToPDF()}
                                            style={{ cursor: "pointer" }}
                                            className=" mx-1 myactive mt-1"
                                          >
                                            . PDF
                                          </h5>
                                          <h5
                                            onClick={() =>
                                              this.gridApi.exportDataAsCsv()
                                            }
                                            style={{ cursor: "pointer" }}
                                            className=" mx-1 myactive"
                                          >
                                            . CSV
                                          </h5>
                                          <h5
                                            onClick={() =>
                                              this.convertCSVtoExcel(
                                                "CustomerList"
                                              )
                                            }
                                            style={{ cursor: "pointer" }}
                                            className=" mx-1 myactive"
                                          >
                                            . XLS
                                          </h5>
                                          <h5
                                            onClick={e =>
                                              this.exportToExcel("CustomerList")
                                            }
                                            style={{ cursor: "pointer" }}
                                            className=" mx-1 myactive"
                                          >
                                            . XLSX
                                          </h5>
                                          <h5
                                            onClick={() =>
                                              this.convertCsvToXml()
                                            }
                                            style={{ cursor: "pointer" }}
                                            className=" mx-1 myactive"
                                          >
                                            . XML
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
                                                  href={CreateCustomerSample}
                                                  download
                                                >
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
                        </Col>
                      </Row>

                      {InsiderPermissions && InsiderPermissions?.View && (
                        <>
                          {this.state.rowData === null ? null : (
                            <div>
                              <div className="ag-theme-material w-100 my-2 ag-grid-table">
                                <div className="d-flex flex-wrap justify-content-between align-items-center"></div>

                                <ContextLayout.Consumer className="ag-theme-alpine">
                                  {context => (
                                    <AgGridReact
                                      id="myAgGrid"
                                      gridOptions={{
                                        enableRangeSelection: true, // Allows copying ranges of cells
                                        enableClipboard: true, // Enables clipboard functionality
                                      }}
                                      // gridOptions={this.gridOptions}
                                      rowSelection="multiple"
                                      defaultColDef={defaultColDef}
                                      columnDefs={columnDefs}
                                      rowData={rowData}
                                      onGridReady={this.onGridReady}
                                      colResizeDefault={"shift"}
                                      animateRows={true}
                                      floatingFilter={false}
                                      // // pagination={true}
                                      paginationPageSize={
                                        this.state.paginationPageSize
                                      }
                                      pivotPanelShow="always"
                                      enableRtl={
                                        context.state.direction === "rtl"
                                      }
                                      ref={this.gridRef} // Attach the ref to the grid
                                      domLayout="autoHeight" // Adjust layout as needed
                                    />
                                  )}
                                </ContextLayout.Consumer>
                              </div>
                            </div>
                          )}
                        </>
                      )}
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
          style={{ maxWidth: "1050px" }}
        >
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
                              onClick={e => this.handleChangeHeader(e, ele, i)}
                              key={i}
                              className="mycustomtag mt-1"
                            >
                              <span className="mt-1">
                                <h5
                                  style={{ cursor: "pointer" }}
                                  className="allfields"
                                >
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
                                      className="allfields"
                                    >
                                      <IoMdRemoveCircleOutline
                                        onClick={() => {
                                          const SelectedCols =
                                            this.state.SelectedcolumnDefs.slice();
                                          const delindex =
                                            SelectedCols.findIndex(
                                              element =>
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
      </>
    );
  }
}
export default CustomerSearch;

import React from "react";
import {
  Card,
  CardBody,
  Input,
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Label,
  CustomInput,
  Spinner,
} from "reactstrap";
import axiosConfig from "../../../../axiosConfig";
import axios from "axios";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { Edit, Trash2, ChevronDown } from "react-feather";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import { Route } from "react-router-dom";
import {
  AllCategoryList,
  Delete_SubCategory,
} from "../../../../ApiEndPoint/ApiCalling";
import swal from "sweetalert";
import { Image_URL } from "../../../../ApiEndPoint/Api";
import { CheckPermission } from "../house/CheckPermission";
import SuperAdminUI from "../../../SuperAdminUi/SuperAdminUI";

class SubCategoryList extends React.Component {
  state = {
    rowData: [],
    CatList: [],
    paginationPageSize: 20,
    currenPageSize: "",
    MasterShow: false,
    InsiderPermissions: {},
    category: "NA",
    Show: false,
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true,
    },
    columnDefs: [
      {
        headerName: "S.No",
        valueGetter: "node.rowIndex + 1",
        field: "node.rowIndex + 1",
        width: 100,
        filter: true,
      },
      // {
      //   headerName: "Image",
      //   field: "image",
      //   filter: true,
      //   width: 240,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <>
      //         {params.data?.image && (
      //           <img
      //             className="rounded-circle mr-50"
      //             src={`${Image_URL}/Images/${params.data?.image}`}
      //             alt="user avatar"
      //             height="40"
      //             width="40"
      //           />
      //         )}
      //       </>
      //     );
      //   },
      // },
      {
        headerName: "Category Name",
        field: "name",
        filter: true,
        width: 240,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center">
              <span>{params.data?.name}</span>
            </div>
          );
        },
      },
      {
        headerName: "SubCategory Name",
        field: "subcategory.name",
        filter: true,
        width: 240,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center">
              <span>{params.data?.subcategory?.name}</span>
            </div>
          );
        },
      },
      // {
      //   headerName: "Id",
      //   field: "_id",
      //   filter: true,
      //   width: 260,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center">
      //         <span>{params.data?._id}</span>
      //       </div>
      //     );
      //   },
      // },

      // {
      //   headerName: "description",
      //   field: "description",
      //   filter: true,
      //   width: 420,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center">
      //         <span>{params.data?.description}</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Type",
      //   field: "type",
      //   filter: true,
      //   width: 150,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center">
      //         <span>{params.data?.type}</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Feature",
      //   field: "feature",
      //   filter: true,
      //   width: 150,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center">
      //         <span>{params.data?.feature}</span>
      //       </div>
      //     );
      //   },
      // },

      {
        headerName: "Status",
        field: "status",
        filter: true,
        width: 150,
        cellRendererFramework: (params) => {
          return params.data?.status === "Active" ? (
            <div className="badge badge-pill badge-success">
              {params.data?.status}
            </div>
          ) : params.data?.status === "Inactive" ? (
            <div className="badge badge-pill badge-warning">
              {params.data.status}
            </div>
          ) : null;
        },
      },
      {
        headerName: "Actions",
        field: "sortorder",
        field: "transactions",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="actions cursor-pointer">
              {/* <Eye
                                className="mr-50"
                                size="25px"
                                color="green"
                                onClick={() =>
                                    history.push(`/app/customer/viewCustomer/${params.data._id}`)}
                            /> */}
              <Route
                render={({ history }) => (
                  <Edit
                    className="mr-50"
                    size="25px"
                    color="blue"
                    onClick={() =>
                      history.push(
                        `/app/freshlist/subcategory/editSubCategory/${params.data._id}/${params.data?.subcategory?._id}`
                      )
                    }
                  />
                )}
              />
              <Route
                render={({ history }) => (
                  <Trash2
                    className="mr-50"
                    size="25px"
                    color="red"
                    onClick={() => {
                      this.runthisfunction(params.data._id);
                    }}
                  />
                )}
              />
            </div>
          );
        },
      },
    ],
  };

  async Apicalling(id, db) {
    this.setState({ Loading: true });

    await AllCategoryList(id, db)
      .then((res) => {
        this.setState({ Loading: false });
        if (res?.Category?.length) {
          let vale = res?.Category?.flatMap((ele, index) => {
            if (ele?.subcategories?.length > 0) {
              return ele?.subcategories?.map((element, i) => {
                return { ...ele, subcategory: element };
              });
            }
          });
          this.setState({ rowData: vale });
        }
      })
      .catch((err) => {
        this.setState({ Loading: false });
        this.setState({ rowData: [] });

        console.log(err);
      });
  }

  async componentDidMount() {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));

    if (pageparmission?.rolename?.roleName === "MASTER") {
      this.setState({ MasterShow: true });
    }
    const InsidePermissions = CheckPermission("subCategory List");
    this.setState({ InsiderPermissions: InsidePermissions });
    await this.Apicalling(pageparmission?._id, pageparmission?.database);
  }
  async runthisfunction(id) {
    console.log(id);

    Delete_SubCategory(this.state.category, id)
      .then((res) => {
        let selectedData = this.gridApi.getSelectedRows();
        this.gridApi.updateRowData({ remove: selectedData });
        swal("SubCategory Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
        swal("Something went wrong");
      });
  }
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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
  handleShowSubCat = (e) => {
    e.preventDefault();
  };
  changeHandler = (e) => {
    this.setState({ Loading: true });
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value != "NA") {
      let selecteddata = this.state.CatList?.filter(
        (ele, i) => ele?._id == e.target.value
      );

      this.setState({ rowData: selecteddata[0]?.subcategories });
      this.setState({ Show: true });
      this.setState({ Loading: false });
    } else {
      swal("Select Category");
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
    const { rowData, columnDefs, defaultColDef, Show } = this.state;
    return (
      <Row className="app-user-list">
        <Col sm="12"></Col>
        <Col sm="12">
          <Card>
            <Row className="mt-2 ml-2 mr-2">
              <Col lg="3" md="3" xs="12">
                <h4 sm="6" className="float-left" style={{ fontWeight: "600" }}>
                  SubCategory List
                </h4>
              </Col>
              {this.state.MasterShow && this.state.MasterShow ? (
                <Col>
                  <SuperAdminUI
                    onDropdownChange={this.handleDropdownChange}
                    onSubmit={this.handleParentSubmit}
                  />
                </Col>
              ) : (
                <>
                  <Col></Col>
                </>
              )}

              {/* <Col lg="2" md="2" className="mb-2">
                <Label> Select Category *</Label>
                <CustomInput
                  required
                  type="select"
                  placeholder="Select Category"
                  name="category"
                  value={this.state.category}
                  onChange={this.changeHandler}>
                  <option value="NA">--Select Category--</option>
                  {this.state.CatList?.map((cat) => (
                    <option value={cat?._id} key={cat?._id}>
                      {cat?.name}
                    </option>
                  ))}
                </CustomInput>
              </Col> */}

              <Col lg="2" md="2" sm="2">
                <Route
                  render={({ history }) => (
                    <Button
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#39cccc",
                        color: "white",
                        fontWeight: "600",
                      }}
                      className="btn float-right mt-1 "
                      color="#39cccc"
                      onClick={() =>
                        history.push(
                          "/app/freshlist/subcategory/addSubCategory"
                        )
                      }>
                      + SubCategory
                    </Button>
                  )}
                />
              </Col>
            </Row>
            {/* {Show ? ( */}
            <>
              <>
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
                      <div className="d-flex flex-wrap justify-content-between mb-1">
                        <div className="table-input mr-1">
                          <Input
                            placeholder="search..."
                            onChange={(e) =>
                              this.updateSearchQuery(e.target.value)
                            }
                            value={this.state.value}
                          />
                        </div>
                        <div className="export-btn">
                          <Button.Ripple
                            color="primary"
                            onClick={() => this.gridApi.exportDataAsCsv()}>
                            Export as CSV
                          </Button.Ripple>
                        </div>
                      </div>
                    </div>
                    <ContextLayout.Consumer className="ag-theme-alpine">
                      {(context) => (
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
              </>
            </>
            {/* ) : null} */}
          </Card>
        </Col>
      </Row>
    );
  }
}
export default SubCategoryList;

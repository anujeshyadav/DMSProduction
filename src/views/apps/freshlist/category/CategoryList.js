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
  Badge,
  Spinner,
} from "reactstrap";
import axiosConfig from "../../../../axiosConfig";

import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { Edit, Trash2, ChevronDown, Eye } from "react-feather";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import { Route, Link } from "react-router-dom";
import swal from "sweetalert";
import {
  AllCategoryList,
  DeleteCategory,
} from "../../../../ApiEndPoint/ApiCalling";
import { Image_URL } from "../../../../ApiEndPoint/Api";
import { CheckPermission } from "../house/CheckPermission";
import SuperAdminUI from "../../../SuperAdminUi/SuperAdminUI";

class CategoryList extends React.Component {
  state = {
    rowData: [],
    Viewpermisson: null,
    Editpermisson: null,
    InsiderPermissions: {},
    Createpermisson: null,
    MasterShow: false,
    Deletepermisson: null,
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      // editable: true,
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
      //   width: 180,
      //   cellRendererFramework: (params) => {
      //     let base = axiosConfig();
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         {params.data?.image && params.data?.image ? (
      //           <img
      //             className="rounded-circle mr-50"
      //             src={`${Image_URL}/Images/${params.data?.image}`}
      //             alt="user avatar"
      //             height="40"
      //             width="40"
      //           />
      //         ) : (
      //           "NA"
      //         )}
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Id",
      //   field: "_id",
      //   filter: true,
      //   editable: true,
      //   width: 230,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <span>{params?.data?._id}</span>
      //       </div>
      //     );
      //   },
      // },
      {
        headerName: "Category Name",
        field: "name",
        filter: true,
        width: 230,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <span>{params?.data?.name}</span>
            </div>
          );
        },
      },
      // {
      //   headerName: "Type",
      //   field: "type",
      //   filter: true,
      //   width: 150,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <span>{params.data?.type}</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Description",
      //   field: "description",
      //   filter: true,
      //   width: 450,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <span className="" style={{ textTransform: "uppercase" }}>
      //           {params.data?.description}
      //         </span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "createdAt",
      //   field: "createdAt",
      //   filter: true,
      //   width: 250,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <span className="" style={{ textTransform: "uppercase" }}>
      //           {params.data?.createdAt}
      //         </span>
      //       </div>
      //     );
      //   },
      // },
      {
        headerName: "Status",
        field: "status",
        filter: true,
        width: 200,
        cellRendererFramework: (params) => {
          return params.data.status === "Active" ? (
            <div className="badge badge-pill badge-success">
              {params.data.status}
            </div>
          ) : params.data.status === "Deactive" ? (
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
        width: 300,
        cellRendererFramework: (params) => {
          return (
            <div className="actions cursor-pointer">
              {/* {this.state.Viewpermisson && (
                <Route
                  render={({ history }) => (
                    <>
                      <Route
                        render={({ history }) => (
                          <Eye
                            className="mr-50"
                            size="25px"
                            color="green"
                            onClick={() =>
                              history.push(
                                `/app/freshlist/category/editCategory/${params?.data?.id}`
                              )
                            }
                          />
                        )}
                      />
                    </>
                  )}
                />
              )} */}
              {/* {this.state.Editpermisson && ( */}
              <Route
                render={({ history }) => (
                  <Edit
                    className="mr-50"
                    size="25px"
                    color="blue"
                    onClick={() =>
                      history.push(
                        `/app/freshlist/category/editCategory/${params?.data?._id}`
                      )
                    }
                  />
                )}
              />
              {/* )} */}
              {/* {this.state.Deletepermisson && ( */}
              <Route
                render={({ history }) => (
                  <Trash2
                    className="mr-50"
                    size="25px"
                    color="red"
                    onClick={() => {
                      // let selectedData = this.gridApi.getSelectedRows();
                      this.runthisfunction(params?.data?._id);
                      // this.gridApi.updateRowData({ remove: selectedData });
                    }}
                  />
                )}
              />
              {/* )} */}
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

        console.log(res?.Category);
        if (res?.Category) {
          this.setState({ rowData: res?.Category });
        }
      })
      .catch((err) => {
        this.setState({ Loading: false });
        console.log(err);
        this.setState({ rowData: [] });
      });
  }
  async componentDidMount() {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    if (pageparmission?.rolename?.roleName === "MASTER") {
      this.setState({ MasterShow: true });
    }

    const InsidePermissions = CheckPermission("Category List");
    this.setState({ InsiderPermissions: InsidePermissions });
    await this.Apicalling(pageparmission?._id, pageparmission?.database);
  }

  async runthisfunction(id) {
    let selectedData = this.gridApi.getSelectedRows();

    swal("Warning", "Sure You Want to Delete it", {
      buttons: {
        cancel: "Cancel",
        catch: { text: "Delete ", value: "delete" },
      },
    }).then((value) => {
      switch (value) {
        case "delete":
          let data = new FormData();
          let pageparmission = JSON.parse(localStorage.getItem("userData"));

          DeleteCategory(id)
            .then((res) => {
              this.gridApi.updateRowData({ remove: selectedData });
              swal("Success", "Category Deleted Successfully");
            })
            .catch((err) => {
              console.log(err);
              swal("Error", `Some Error Occured`);
            });

          break;
        default:
      }
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
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      // console.log(rowData),
      <Row className="app-user-list">
        <Col sm="12"></Col>
        <Col sm="12">
          <Card>
            <Row className="mt-2 ml-2 mr-2">
              <Col>
                <h1 sm="6" className="float-left" style={{ fontWeight: "600" }}>
                  Category List
                </h1>
              </Col>
              {/*
              {this.state.MasterShow && (
                <Col>
                  <SuperAdminUI
                    onDropdownChange={this.handleDropdownChange}
                    onSubmit={this.handleParentSubmit}
                  />
                </Col>
              )}*/}
              <Col>
                <div className=" mb-1">
                  <div className="table-input mr-1">
                    <Input
                      placeholder="search..."
                      onChange={(e) => this.updateSearchQuery(e.target.value)}
                      value={this.state.value}
                    />
                  </div>
                </div>
              </Col>

              <Col>
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
                </div>
              </Col>
              <Col></Col>
              <Col>
                <div className="">
                  <Button
                    color="rgb(8, 91, 245)"
                    className="float-right"
                    style={{ backgroundColor: "rgb(8, 91, 245)" }}
                    onClick={() => this.gridApi.exportDataAsCsv()}>
                    <span style={{ color: "white" }}> Export as CSV</span>
                  </Button>
                </div>
              </Col>
              <Col>
                <Button
                  style={{ cursor: "pointer" }}
                  className="btn btn-success float-right"
                  onClick={() =>
                    this.props.history.push(
                      "/app/freshlist/category/addCategory"
                    )
                  }>
                  + Add Category
                </Button>
              </Col>
              {/* <Col>
                {this.state.Createpermisson && (
                  <Route
                    render={({ history }) => (
                      <Button
                        className="btn float-right"
                        color="primary"
                        onClick={() =>
                          history.push("/app/freshlist/category/addCategory")
                        }
                      >
                        Add Category
                      </Button>
                    )}
                  />
                )}
              </Col> */}
            </Row>
            <>
              {this.state.rowData === null ? null : (
                <div className="ag-theme-material w-100 my-2 ag-grid-table">
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
          </Card>
        </Col>
      </Row>
    );
  }
}
export default CategoryList;

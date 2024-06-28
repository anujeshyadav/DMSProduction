import React, { useEffect, useState, useContext, useRef } from "react";
import Multiselect from "multiselect-react-dropdown";

import {
  Card,
  CardBody,
  Col,
  Row,
  Input,
  Label,
  Button,
  CustomInput,
  Table,
  Spinner,
} from "reactstrap";
import { FaDownload } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import XLSX from "xlsx";
import LedgerPdf from "../house/LedgerPdf";
import "../../../../../src/layouts/assets/scss/pages/users.scss";
import { CreateCustomerList, _Get } from "../../../../ApiEndPoint/ApiCalling";
import "../../../../assets/scss/pages/users.scss";
import UserContext from "../../../../context/Context";
import { Route } from "react-router-dom";
import { View_Ledger_by_id } from "../../../../ApiEndPoint/Api";
import SuperAdminUI from "../../../SuperAdminUi/SuperAdminUI";
// import {
//   convertDataCSVtoExcel,
//   convertDataCsvToXml,
//   exportDataToExcel,
//   exportDataToPDF,
// } from "../house/Downloader";
let SecondLast = null;

const PartyLedgersView = () => {
  const [Ledger, setLedger] = useState([]);
  const [AllLedger, setAllLedger] = useState([]);
  const [PartyId, setPartyId] = useState("");
  const [Partyname, setPartyname] = useState("");
  const [Filter, setFilter] = useState({});
  const [Master, setMaster] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [PartyList, setPartyList] = useState([]);

  const Context = useContext(UserContext);

  const Apicalling = (id, db) => {
    setLoading(true);
    CreateCustomerList(id, db)
      .then(res => {
        setLoading(false);

        let value = res?.Customer;
        if (value?.length) {
          setPartyList(value);
        }
      })
      .catch(err => {
        setLoading(false);

        console.log(err);
        setPartyList([]);
      });
  };
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userData"));
    Apicalling(userId?._id, userId?.database);
    if (userId?.rolename?.roleName === "MASTER") {
      setMaster(true);
    }
  }, []);
  const handleParentSubmit = e => {
    e.preventDefault();
    let SuperAdmin = JSON.parse(localStorage.getItem("SuperadminIdByMaster"));
    let id = SuperAdmin.split(" ")[0];
    let db = SuperAdmin.split(" ")[1];
    Apicalling(id, db);
  };
  const handleDropdownChange = selectedValue => {
    localStorage.setItem("SuperadminIdByMaster", JSON.stringify(selectedValue));
  };

  const handleLedger = async e => {
    e.preventDefault();
    setLoading(true);

    await _Get(View_Ledger_by_id, PartyId)
      .then(res => {
        setLoading(false);
        SecondLast = res?.Ledger?.length - 1;
        setLedger(res?.Ledger);
        setAllLedger(res?.Ledger);
      })
      .catch(err => {
        setLoading(false);
        setLedger([]);
        setAllLedger([]);
        console.log(err);
      });
  };
  const handleChangeData = e => {
    let { name, value } = e.target;
    setFilter({ ...Filter, [name]: value });
  };

  const handleShowDateWiseLedger = e => {
    e.preventDefault();
    const filteredItems = AllLedger?.filter(item => {
      const dateList = new Date(item?.updatedAt);
      const onlyDate = dateList.toISOString().split("T")[0];
      return onlyDate >= Filter?.startDate && onlyDate <= Filter?.EndDate;
    });
    setLedger(filteredItems ? filteredItems : []);
  };
  const downloadExcel = () => {
    console.log(Ledger);
    // Extract keys from the first object to use as column headers
    const columnHeaders = Object.keys(Ledger[0]);

    // Convert each object into an array of its values
    const formattedData = Ledger.map(obj => Object.values(obj));

    // Insert column headers at the beginning of the array
    formattedData.unshift(columnHeaders);

    // formattedData now contains the data in the desired format
    console.log(formattedData);

    const ws = XLSX.utils.aoa_to_sheet(formattedData); // Assuming data is defined
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    // Trigger download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = "PartyLedgers.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const s2ab = s => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const handleSelectionParty = async (selectedList, selectedItem) => {
    setPartyId(selectedItem?._id);
    let fullName = `${selectedItem?.firstName} ${selectedItem?.lastName}`;
    setPartyname(fullName);
  };

  const onRemove1 = (selectedList, removedItem, index) => {
    console.log(selectedList);
  };
  return (
    <div>
      <div>
        {Loading && Loading ? (
          <>
            <div className="d-flex justify-content-center align-item-center">
              {" "}
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
          </>
        ) : (
          <>
            <Card>
              <Row className="mt-2">
                <Col lg="12" md="12" sm="12">
                  <div className="table-input text-center">
                    <h3>Party Ledger</h3>
                  </div>
                </Col>
              </Row>
              <Row className="ml-2 mr-2">
                <Col lg="4" md="4" sm="4">
                  <SuperAdminUI
                    onDropdownChange={handleDropdownChange}
                    onSubmit={handleParentSubmit}
                  />
                </Col>
              </Row>
              <Row className="m-2">
                <Col lg="2" md="2" sm="6" className="mt-2">
                  <Multiselect
                    required
                    selectionLimit={1}
                    isObject="false"
                    options={PartyList}
                    onSelect={(selectedList, selectedItem) =>
                      handleSelectionParty(selectedList, selectedItem)
                    }
                    onRemove={onRemove1}
                    displayValue="firstName"
                  />
                  {/* <CustomInput
                    onChange={e => {
                      const selected =
                        e.target.options[e.target.selectedIndex].getAttribute(
                          "data-name"
                        );
                      setPartyId(e.target.value);
                      setPartyname(selected);
                    }}
                    value={PartyId}
                    type="select"
                  >
                    <option value={0}>--Select Party--</option>
                    {PartyList?.length > 0 &&
                      PartyList?.map((ele, i) => {
                        return (
                          <option
                            data-name={`${ele?.firstName} ${ele?.lastName} `}
                            value={ele?._id}
                          >{`${ele?.firstName && ele?.firstName} ${
                            ele?.lastName && ele?.lastName
                          } `}</option>
                        );
                      })}
                  </CustomInput> */}
                </Col>
                <Col lg="2" md="2" sm="6" className="mt-2">
                  <div className="table-input mr-1 ">
                    <Button
                      onClick={handleLedger}
                      type="submit"
                      className=""
                      style={{
                        cursor: "pointer",
                        backgroundColor: "rgb(8, 91, 245)",
                        color: "white",
                        fontWeight: "600",
                        height: "43px",
                      }}
                      color="#39cccc"
                    >
                      Submit
                    </Button>
                  </div>
                </Col>
                <Col lg="2" md="2">
                  <div className="table-input mr-1 cssforproductlist">
                    <Label>Start Date</Label>
                    <Input
                      value={Filter.startDate}
                      onChange={handleChangeData}
                      type="date"
                      name="startDate"
                    />
                  </div>
                </Col>
                <Col lg="2" md="2">
                  <div className="table-input mr-1 cssforproductlist">
                    <Label>End Date</Label>
                    <Input
                      value={Filter.EndDate}
                      onChange={handleChangeData}
                      type="date"
                      name="EndDate"
                    />
                  </div>
                </Col>
                <Col lg="1" md="1" sm="6">
                  <div
                    className="table-input mr-1 mt-2 "
                    style={{ marginTop: "6px" }}
                  >
                    <Button
                      onClick={handleShowDateWiseLedger}
                      type="submit"
                      className=""
                      style={{
                        cursor: "pointer",
                        backgroundColor: "rgb(8, 91, 245)",
                        color: "white",
                        fontWeight: "600",
                        height: "43px",
                      }}
                      color="#39cccc"
                    >
                      Submit
                    </Button>
                  </div>
                </Col>
                {/* <Button
                  type="download"
                  className="btn"
                  onClick={downloadExcel}
                >
                  Download
                </Button> */}
                <Col lg="1" md="1" sm="6">
                  <div
                    className="table-input mr-1 mt-2 "
                    style={{ marginTop: "6px" }}
                  >
                    <Button
                      onClick={downloadExcel}
                      type="download"
                      className=""
                      style={{
                        cursor: "pointer",
                        backgroundColor: "rgb(8, 91, 245)",
                        color: "white",
                        fontWeight: "600",
                        height: "43px",
                      }}
                      color="#39cccc"
                      title="Download ExcellFile"
                    >
                      <FaDownload />
                    </Button>
                  </div>
                </Col>
                {Ledger?.length > 0 && Ledger && (
                  <Col lg="1" md="1" sm="1">
                    <div className="d-flex justify-content-center">
                      <LedgerPdf
                        downloadFileName="Ledger"
                        rootElementId="testId"
                      />
                    </div>
                  </Col>
                )}
                <Col lg="1" md="1" sm="3">
                  <div className="float-right mt-2">
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
                          color="#39cccc"
                          className="float-right"
                          onClick={() => history.goBack()}
                        >
                          Back
                        </Button>
                      )}
                    />
                  </div>
                </Col>
              </Row>

              {/* <hr /> */}

              <CardBody id="testId">
                {Ledger?.length > 0 && Ledger && (
                  <>
                    <div>
                      <div className="d-flex justify-content-center mb-1 mt-1">
                        <h3>{Partyname && Partyname} Ledger</h3>
                      </div>
                      <div className="p-4">
                        <Table bordered hover size="sm">
                          {Ledger?.length > 0 && Ledger && (
                            <thead>
                              <tr>
                                <th>
                                  <div className="d-flex justify-content-center">
                                    <h5 className="text-bold">Date</h5>
                                  </div>
                                </th>
                                {/* <th>
                                  <div className="d-flex justify-content-center">
                                    <h5 className="text-bold">Name</h5>
                                  </div>
                                </th>
                                <th>
                                  <div className="d-flex justify-content-center">
                                    <h5 className="text-bold">Particular</h5>
                                  </div>
                                </th> */}
                                <th>
                                  <div className="d-flex justify-content-center">
                                    <h5 className="text-bold">Voucher Type</h5>
                                  </div>
                                </th>
                                <th>
                                  <div className="d-flex justify-content-center">
                                    <h5 className="text-bold">Invoice No.</h5>
                                  </div>
                                </th>
                                <th>
                                  <div className="d-flex justify-content-center">
                                    <h5 className="text-bold">Debit</h5>
                                  </div>
                                </th>
                                <th>
                                  <div className="d-flex justify-content-center">
                                    <h5 className="text-bold">Credit</h5>
                                  </div>
                                </th>
                                {/* <th>
                                <div className="d-flex justify-content-center">
                                  <h5 className="text-bold">Total</h5>
                                </div>
                              </th> */}
                              </tr>
                            </thead>
                          )}
                          <tbody>
                            {Ledger &&
                              Ledger?.map((ele, index) => {
                                return (
                                  <tr key={ele?._id}>
                                    <td>
                                      <div className="d-flex justify-content-center">
                                        <div>
                                          {ele?.createdAt?.split("T")[0]}
                                        </div>
                                      </div>
                                    </td>
                                    {/* <td>
                                      <div
                                        style={{ fontWeight: "bold" }}
                                        className="d-flex justify-content-center"
                                      >
                                        <div>{ele?.partyId?.firstName}</div>
                                      </div>
                                    </td> */}
                                    {/* <td>
                                      <div
                                        style={{ fontWeight: "bold" }}
                                        className="d-flex justify-content-center"
                                      >
                                        {ele?.partyId?.ownerName}
                                      </div>
                                    </td> */}
                                    <td>
                                      <div
                                        style={{ fontWeight: "bold" }}
                                        className="d-flex justify-content-center"
                                      >
                                        {ele?.voucherType}
                                        {/* {Reason && Reason} */}
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        style={{ fontWeight: "bold" }}
                                        className="d-flex justify-content-center"
                                      >
                                        {ele?.voucherNo}
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        style={{ fontWeight: "bold" }}
                                        className="d-flex justify-content-center"
                                      >
                                        {ele?.debit}
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        style={{ fontWeight: "bold" }}
                                        className="d-flex justify-content-center"
                                      >
                                        {ele?.credit}
                                      </div>
                                    </td>
                                    {/* <td>
                                <div
                                  style={{ fontWeight: "bold" }}
                                  className="d-flex justify-content-center">
                                  {ele?.closingBalance}
                                </div>
                              </td> */}
                                  </tr>
                                );
                              })}
                            {Ledger?.length > 0 && Ledger && (
                              <>
                                <tr>
                                  <th scope="row">
                                    <div
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                      }}
                                      className="d-flex justify-content-center"
                                    >
                                      Total
                                    </div>
                                  </th>
                                  <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="d-flex justify-content-center"
                                    ></div>
                                  </td>
                                  <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="d-flex justify-content-center"
                                    ></div>
                                  </td>
                                  {/* <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="d-flex justify-content-center"
                                    ></div>
                                  </td> */}
                                  {/* <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="d-flex justify-content-center"
                                    ></div>
                                  </td> */}
                                  <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="d-flex justify-content-center"
                                    >
                                      <div style={{ fontSize: "20px" }}>
                                        <strong>
                                          {" "}
                                          {Ledger[SecondLast]?.debitBalance &&
                                            (Ledger[
                                              SecondLast
                                            ]?.debitBalance).toFixed(2)}
                                        </strong>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="d-flex justify-content-center"
                                    >
                                      <div style={{ fontSize: "20px" }}>
                                        <strong>
                                          {" "}
                                          {Ledger[SecondLast]?.creditBalance &&
                                            (Ledger[
                                              SecondLast
                                            ]?.creditBalance).toFixed(2)}
                                        </strong>
                                      </div>
                                    </div>
                                  </td>
                                  {/* <td>
                              <div
                                style={{ fontWeight: "bold" }}
                                className="d-flex justify-content-center">
                                <div style={{ fontSize: "20px" }}>
                                  <strong>
                                    {Ledger[SecondLast]?.closingBalance &&
                                      Ledger[SecondLast]?.closingBalance}
                                  </strong>
                                </div>
                              </div>
                            </td> */}
                                </tr>
                                <tr>
                                  <th scope="row">
                                    <div
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                      }}
                                      className="d-flex justify-content-center"
                                    >
                                      Closing Balance
                                    </div>
                                  </th>
                                  <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="d-flex justify-content-center"
                                    ></div>
                                  </td>
                                  <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="d-flex justify-content-center"
                                    ></div>
                                  </td>
                                  <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="d-flex justify-content-center"
                                    ></div>
                                  </td>
                                  {/* <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="d-flex justify-content-center"
                                    ></div>
                                  </td> */}
                                  {/* <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="d-flex justify-content-center"
                                    >
                                      <div style={{ fontSize: "20px" }}></div>
                                    </div>
                                  </td> */}

                                  <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="d-flex justify-content-center"
                                    >
                                      <div style={{ fontSize: "20px" }}>
                                        <strong>
                                          {Ledger[SecondLast]?.closingBalance &&
                                            (Ledger[
                                              SecondLast
                                            ]?.closingBalance).toFixed(2)}
                                        </strong>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};
export default PartyLedgersView;

import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Form,
  CardBody,
  Card,
  CardHeader,
  Alert,
} from "reactstrap";
import { Hrm_SkillGroup } from "../../../../../../ApiEndPoint/Api";
import { _PostSave } from "../../../../../../ApiEndPoint/ApiCalling";
import { useHistory } from "react-router-dom";

const MockTestForm = () => {
  const [answerType, setAnswerType] = useState("");
  const [data, setData] = useState({
    question: "",
    option: "",
    rightAnswer: "",
    desc: "",
    database: "",
  });
  const history = useHistory();
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("userData"));
    let Payload = {
      question: data?.question,
      option: data?.option,
      rightAnswer: data?.rightAnswer,
      desc: data?.desc,
      database: user?.database,
    };

    try {
      await _PostSave(Hrm_SkillGroup, Payload);
      setSuccessAlert(true);
      resetForm();
      history.push("/app/ajgroup/HRM/practiceList");
    } catch (error) {
      console.error(error);
      setErrorAlert(true);
    }
  };
  const validateForm = () => {
    return Object.values(data).every((value) => value.trim() !== "");
  };

  const resetForm = () => {
    setData({
      question: "",
      option: "",
      rightAnswer: "",
      database: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (name === "option") {
      setAnswerType(value);
    }
  };
  const handleBack = () => {
    history.goBack();
  };


  return (
    <Form onSubmit={handleSubmit}>
    <Row>
    <Col sm="12" md="7" className="mx-auto">
    <Card>
        <CardHeader >
       
        
      
        <Row style={{width:'100%'}}>
        <Col xl="6" lg="6" md="6">
        <h2> Skills Question Form</h2>
        </Col>
        <Col xl="6" lg="6" md="6">
        <Button color="danger" className="float-right " onClick={handleBack}>
        Back
      </Button>
        </Col>
        </Row>

          {successAlert && (
            <Alert color="success">Form submitted successfully!</Alert>
          )}
          {errorAlert && (
            <Alert color="danger">
              Please fill all fields before submitting the form.
            </Alert>
          )}
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Input Type Question</Label>
                <Input
                  required
                  type="text"
                  name="question"
                  id="question"
                  placeholder="Enter your question"
                  value={data?.question}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleSelect">Answer Type</Label>
                <Input
                  required
                  style={{height:'51px',borderRadius:'10px'}}
                  type="select"
                  name="option"
                  id="option"
                  value={data?.option}
                  onChange={handleInputChange}>
                  <option value="NA">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="description">Description</option>
                </Input>
              </FormGroup>
            </Col>
            {answerType === "description" && (
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleTextarea">Description</Label>
                  <Input
                    type="textarea"
                    name="desc"
                    id="desc"
                    value={data?.desc}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            )}
            <Col md={6}>
              <FormGroup>
                <Label for="exampleTextarea">Correct Answer</Label>
                <Input
                  required
                  type="textarea"
                  name="rightAnswer"
                  id="rightAnswer"
                  value={data?.rightAnswer}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
<Row>
<Col className="text-center">
<Button color="primary" >Submit</Button>
</Col>
</Row>
          
        </CardBody>
      </Card>
    </Col>
    </Row>
      
    </Form>
  );
};

export default MockTestForm;

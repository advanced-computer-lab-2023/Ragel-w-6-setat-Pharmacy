import React, { useState } from "react";
import axios from 'axios';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import AdminHeader from "components/Headers/AdminHeader.js";

const UploadDocuments = () => {
  const [nationalIdFile, setNationalIdFile] = useState(null);
  const [pharmacyDegreeFile, setPharmacyDegreeFile] = useState(null);
  const [workingLicenseFile, setWorkingLicenseFile] = useState(null);

  const [nationalIdFileName, setNationalIdFileName] = useState("");
  const [pharmacyDegreeFileName, setPharmacyDegreeFileName] = useState("");
  const [workingLicenseFileName, setWorkingLicenseFileName] = useState("");

  const handleFileChange = (event, setFileState, setFileNameState) => {
    const file = event.target.files[0];
    setFileState(file);
    setFileNameState(file.name);
  };

  const handleUpload = async (selectedFile) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('pdf', selectedFile);

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log('File uploaded:', response.data);
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
  };

  return (
    <>
      <AdminHeader />
      <Container className="mt-5" fluid>
        <Row className="justify-content-center">
          <Col lg="8">
            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Upload Documents</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">National ID</label>
                        <div className="custom-file">
                          <Input
                            type="file"
                            className="custom-file-input"
                            name="pdf"
                            accept=".pdf"
                            onChange={(event) => handleFileChange(event, setNationalIdFile, setNationalIdFileName)}
                          />
                          <label className="custom-file-label">{nationalIdFileName || 'Choose a file'}</label>
                        </div>
                        <Button onClick={() => handleUpload(nationalIdFile)} 
                       style={{ backgroundColor: "#009688" }} className="mt-2">
                          Upload PDF
                        </Button>
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">Pharmacy Degree</label>
                        <div className="custom-file">
                          <Input
                            type="file"
                            className="custom-file-input"
                            name="pdf"
                            accept=".pdf"
                            onChange={(event) => handleFileChange(event, setPharmacyDegreeFile, setPharmacyDegreeFileName)}
                          />
                          <label className="custom-file-label">{pharmacyDegreeFileName || 'Choose a file'}</label>
                        </div>
                        <Button onClick={() => handleUpload(pharmacyDegreeFile)} 
                      style={{ backgroundColor: "#009688" }}className="mt-2">
                          Upload PDF
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">Working License</label>
                        <div className="custom-file">
                          <Input
                            type="file"
                            className="custom-file-input"
                            accept=".pdf"
                            name="pdf"
                            onChange={(event) => handleFileChange(event, setWorkingLicenseFile, setWorkingLicenseFileName)}
                          />
                          <label className="custom-file-label">{workingLicenseFileName || 'Choose a file'}</label>
                        </div>
                        <Button onClick={() => handleUpload(workingLicenseFile)} 
                        style={{ backgroundColor: "#009688" }} className="mt-2">
                          Upload PDF
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UploadDocuments;

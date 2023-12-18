// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import AdminHeader from "components/Headers/AdminHeader.js";
import { useEffect, useState } from "react";

const HandlePharmReq = () => {
  const [pharmacistRequests, setPharmacistRequests] = useState(null);
  const [acceptFeedback, setAcceptFeedback] = useState('');
  const [rejectFeedback, setRejectFeedback] = useState('');

  useEffect(() => {
    const fetchPharmacistRequests = async () => {
      const response = await fetch('/api/admin/getPharmacistsRequestsInfo');
      const json = await response.json();
      if (response.ok) {
        setPharmacistRequests(json);
      }
    };

    fetchPharmacistRequests();
  }, []);

  const handleApprove = (request) => {
    setAcceptFeedback(request.name + " is being created...");

    const name = request.name;
    const username = request.username;
    const password = request.password;
    const email = request.email;
    const dateOfBirth = request.dateOfBirth;
    const hourlyRate = request.hourlyRate;
    const affiliation = request.affiliation;
    const educationalBackground = request.educationalBackground;
    const ID = request.ID;
    const workingLicense = request.workingLicense;
    const pharmacyDegree = request.pharmacyDegree;

    const newPharmacist = {
      name, username, password, email, dateOfBirth, hourlyRate, affiliation, educationalBackground, ID, workingLicense, pharmacyDegree
    };

    fetch('/api/admin/createPharmacist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPharmacist),
    }).then((response) => {
      if (response.ok) {
        setPharmacistRequests((prevRequests) =>
          prevRequests.filter((req) => req._id !== request._id)
        );
        setAcceptFeedback(`Pharmacist request with Name ${newPharmacist.name} has been approved.`);
      } else {
        setAcceptFeedback(`Error approving pharmacist request with Name ${newPharmacist.name}`);
      }
    })
      .catch((error) => {
        console.error('API request error:', error);
        setAcceptFeedback('API request error');
      })
      .finally(() => {
        fetch(`/api/admin/rejectPharmacistRequest/${request._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'true' }),
        })
          .then((response) => {
            if (response.ok) {
              setAcceptFeedback(`Pharmacist request with Name ${newPharmacist.name} has been successfully removed.`);
            }
            else {
              setAcceptFeedback(`Error removing pharmacist request with Name ${newPharmacist.name} after accepting it.`);
            }
          })
          .catch((error) => {
            console.error('API request error:', error);
            setAcceptFeedback('API request error');
          });
      });
  };

  const handleReject = (id) => {
    setRejectFeedback('Rejecting...');

    fetch(`/api/admin/rejectPharmacistRequest/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'true' }),
    })
      .then((response) => {
        if (response.ok) {
          setPharmacistRequests((prevRequests) =>
            prevRequests.filter((req) => req._id !== id));
          setRejectFeedback(`Pharmacist request with ID ${id} has been rejected.`);
        } else {
          setRejectFeedback(`Error rejecting pharmacist request with ID ${id}`);
        }
      })
      .catch((error) => {
        console.error('API request error:', error);
        setRejectFeedback('API request error');
      });
  };

  const showDocument = (documentID, request) => {
    const filename = getFilenameForDocument(documentID, request);
    if (filename) {
      window.open(`http://localhost:8000/uploads/${filename}`);
    } else {
      alert('No document available');
    }
  };

  const getFilenameForDocument = (documentID, request) => {
    switch (documentID) {
      case 'ID':
        return request.ID == null ? null : request.ID;
      case 'workingLicense':
        return request.workingLicense == null ? null : request.workingLicense;
      case 'pharmacyDegree':
        return request.pharmacyDegree == null ? null : request.pharmacyDegree;
      default:
        return null;
    }
  };

  return (
    <>
      <AdminHeader />
      <Container className="mt--7 mt-4" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 mb-4">
                <h3 className="mb-0">Handle Pharmacist Requests</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Hourly Rate</th>
                    <th scope="col">Affiliation</th>
                    <th scope="col">Educational Background</th>
                    <th scope="col">Status</th>
                    <th scope="col">ID</th>
                    <th scope="col">Working License</th>
                    <th scope="col">Pharmacy Degree</th>
                    <th scope="col">Actions</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                {pharmacistRequests !== null ? (
                  <tbody>
                    {pharmacistRequests.map((request, index) => (
                      <tr key={index}>
                        <td>{request.name}</td>
                        <td>{request.username}</td>
                        <td>{request.email}</td>
                        <td>{request.dateOfBirth}</td>
                        <td>{request.hourlyRate}</td>
                        <td>{request.affiliation}</td>
                        <td>{request.educationalBackground}</td>
                        <td>{request.status ? "Handled" : "Not Handled"}</td>
                        <td>
                          <Button
                            style={{ backgroundColor: '#009688', borderColor: '#009688', color: '#fff' }}
                            href="#pablo"
                            size="sm"
                            onClick={() => showDocument('ID', request)}
                            disabled={!getFilenameForDocument('ID', request)}
                          >
                            View ID
                          </Button>
                        </td>
                        <td>
                          <Button
                            style={{ backgroundColor: '#009688', borderColor: '#009688', color: '#fff' }}
                            href="#pablo"
                            size="sm"
                            onClick={() => showDocument('workingLicense', request)}
                            disabled={!getFilenameForDocument('workingLicense', request)}
                          >
                            View Working License
                          </Button>
                        </td>
                        <td>
                          <Button
                            style={{ backgroundColor: '#009688', borderColor: '#009688', color: '#fff' }}
                            href="#pablo"
                            size="sm"
                            onClick={() => showDocument('pharmacyDegree', request)}
                            disabled={!getFilenameForDocument('pharmacyDegree', request)}
                          >
                            View Pharmacy Degree
                          </Button>
                        </td>
                        <td>
                          <div className="d-flex">
                            <div>
                              <Button
                                style={{ backgroundColor: '#009688', borderColor: '#009688', color: '#fff' }}
                                href="#pablo"
                                size="sm"
                                onClick={() => handleApprove(request)}
                              >
                                Approve
                              </Button>
                            </div>
                            <div className="ml-2">
                              <Button
                                style={{ backgroundColor: '#c41e3a', borderColor: '#c41e3a', color: '#fff' }}
                                href="#pablo"
                                size="sm"
                                onClick={() => handleReject(request._id)}
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        </td>
                        <td>{acceptFeedback}</td>
                        <td>{rejectFeedback}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan="7">Loading data...</td>
                    </tr>
                  </tbody>
                )}
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    {/* ... (pagination components) */}
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default HandlePharmReq;

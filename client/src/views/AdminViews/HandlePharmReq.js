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

// TODO Model boxes with confirmation and result dialog boxes

const HandlePharmReq = () => {
  const [pharmacistRequests, setPharmacistRequests] = useState(null)

  useEffect(() => {
    const fetchPharmacistRequests = async () => {
      const response = await fetch('/api/admin/getPharmacistsRequestsInfo')
      const json = await response.json() //array of objects where each represents an admin
      console.log(json)
      if (response.ok) {
        setPharmacistRequests(json)
      }
    }

    fetchPharmacistRequests()

    fetch('/api/admin/getPharmacistsRequestsInfo')
      .then((response) => response.json())
      .then((data) => console.log('Received API response:', data))
      .catch((error) => console.error('API request error:', error));
  }, [])

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [educationalBackground, setEducationalBackground] = useState('')

  // FIXME make it async??
  // FIXME dialog box for each rejection and approval and remove it from table
  const [acceptFeedback, setAcceptFeedback] = useState('');
  // Function to approve a pharmacist request
  const handleApprove = (request) => {
    setAcceptFeedback(request.name + " is being created...");
    /*console.log(request + " trying to print the fucking request ffs"); */
    console.log('Request Data:', request);
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
    }

    // Call the API to create a new pharmacist
    fetch('/api/admin/createPharmacist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPharmacist),
    }).then((response) => {
      if (response.ok) {
        // Remove the approved request from the UI
        setPharmacistRequests((prevRequests) =>
          prevRequests.filter((req) => req._id !== request._id)
        );
        // Handle success (e.g., update the UI)
        setAcceptFeedback(`Pharmacist request with ID ${request.name} has been rejected.`);
      } else {
        // Handle errors
        setAcceptFeedback(`Error accepting pharmacist request with ID ${response.name}`);
      }
    })
      .catch((error) => {
        console.error('API request error:', error);
        setAcceptFeedback('API request error');
      }).
      finally(() => {
        fetch(`/api/admin/rejectPharmacistRequest/${request._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'true' }),
        })
          .then((response) => {
            if (response.ok) {

              // Handle success (e.g., update the UI)
              setAcceptFeedback(`Pharmacist request with ID ${request._id} has been successfully removed.`);
            }
            else {
              // Handle errors
              setAcceptFeedback(`Error removing pharmacist request with ID ${request._id} after accepting it.`);
            }
          })
          .catch((error) => {
            console.error('API request error:', error);
            setAcceptFeedback('API request error');
          });
      })
  };

  //FIXME remove pagination 1 2 3 4 and check it works when needed

  // handleReject(request._id) //deletes pharmacist req from table

  const [rejectFeedback, setRejectFeedback] = useState(''); // State for feedback message
  // Function to reject a pharmacist request
  const handleReject = (id) => {
    // Update the feedback message to indicate the action is in progress
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
          // Remove the rejected request from the UI
          setPharmacistRequests((prevRequests) =>
            prevRequests.filter((req) => req._id !== id));
          // Handle success (e.g., update the UI)
          setRejectFeedback(`Pharmacist request with ID ${id} has been rejected.`);
        } else {
          // Handle errors
          setRejectFeedback(`Error rejecting pharmacist request with ID ${id}`);
        }
      })
      .catch((error) => {
        console.error('API request error:', error);
        setRejectFeedback('API request error');
      });
  };
  /* const showDocument = async (path) => {
    window.open(`http://localhost:8000/uploads/` + path);
  }; */
  /*    const getFilenameForDocument = (documentID,request) => {
       // Implement logic to retrieve the filename based on the documentID
       // For example, you might have a mapping or lookup
       // Return the filename if found and not empty, otherwise return null
       // This function needs to be adapted based on your actual implementation
       switch (documentID) {
         case 'ID':
           return (
             request.ID &&
             request.ID[0] &&
             request.ID[0].filename &&
             request.ID[0].filename.trim() !== ''
               ? request.ID[0].filename
               : null
           );
         case 'workingLicense':
           return (
             request.medicalLicense &&
             request.medicalLicense[0] &&
             request.medicalLicense[0].filename &&
             request.medicalLicense[0].filename.trim() !== ''
               ? request.medicalLicense[0].filename
               : null
           );
         case 'pharmacyDegree':
           return (
             request.pharmacyDegree &&
             request.pharmacyDegree[0] &&
             request.pharmacyDegree[0].filename &&
             request.pharmacyDegree[0].filename.trim() !== ''
               ? request.pharmacyDegree[0].filename
               : null
           );
         default:
           return null;
       }
     }; */

  const showDocument = (documentID, request) => {
    const filename = getFilenameForDocument(documentID, request);
    console.log(request.workingLicense)
    if (filename) {
      window.open(`http://localhost:8000/uploads/${filename}`);
    } else {
      alert('No document available' + request.ID[0].filename);
    }
  };

  const getFilenameForDocument = (documentID, request) => {
    // Implement logic to retrieve the filename based on the documentID
    // For example, you might have a mapping or lookup
    // Return the filename if found, otherwise return null
    // This function needs to be adapted based on your actual implementation
    switch (documentID) {
      case 'ID':
        return request.ID == null ? null : request.ID
      case 'workingLicense':
        return request.workingLicense == null ? null : request.workingLicense
      case 'pharmacyDegree':
        return request.pharmacyDegree == null ? null : request.pharmacyDegree
      default:
        return null;
    }
  };

  //FIXME need to fix the calls of the function to incorporate user, and updating the status to approved from here, and also deleting user from the database

  return (
    <>
      <AdminHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
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
                    {/* Add other table headers here */}
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
                            color="info"
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
                            color="info"
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
                            color="info"
                            href="#pablo"
                            size="sm"
                            onClick={() => showDocument('pharmacyDegree', request)}
                            disabled={!getFilenameForDocument('pharmacyDegree', request)}
                          >
                            View Pharmacy Degree
                          </Button>
                        </td>
                        <td>
                          <Button
                            color="info"
                            href="#pablo"
                            size="sm"
                            onClick={() => handleApprove(request)}
                          >
                            Approve
                          </Button>
                          <Button
                            color="info"
                            href="#pablo"
                            size="sm"
                            onClick={() => handleReject(request._id)}
                          >
                            Reject
                          </Button>
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
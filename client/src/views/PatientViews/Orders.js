import React, { useEffect, useState, useContext } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    Container,
    Row,
    Button,
    Col,
    Modal, 
    ModalHeader, 
    ModalBody,
    Table
} from "reactstrap";

import AdminHeader from "components/Headers/AdminHeader.js";
import { UserContext } from "../../contexts/UserContext";

const Orders = () => {
    const { user } = useContext(UserContext);
    const [patientOrders, setPatientOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const patientId = user._id;

    const cancelOrder = async (orderId) => {
        try {
            const response = await fetch(`/api/patient/cancelOrder/${patientId}/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // If the cancellation was successful, refresh the orders
                fetchPatientOrders();
            } else {
                console.error('Failed to cancel order');
                
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };
    // useEffect(() => { 
    //     fetchPatientOrders();
    // }, []);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
      };

    const fetchPatientOrders = async () => {
        try {
            const response = await fetch(`/api/patient/viewPatientOrders/${patientId}`
            );
            const data = await response.json();
            setPatientOrders(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching patient orders:", error);
        }
    };

    const showOrderDetails = (order) => {
        setSelectedOrder(order);
        toggleModal();
      };

   

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Orders component rendered");
                const response = await fetch(`/api/patient/viewPatientOrders/${patientId}`);
                const data = await response.json();

                if (Array.isArray(data)) {
                    setPatientOrders(data);
                    setLoading(false);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                console.error("Error fetching patient orders:", error);
            }
        };

        fetchData();
    }, [patientId]);

   return (
    <>
      <AdminHeader />
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <Container>
         <div className="container mt-5">
         <h2 className="mb-4"> My Orders</h2>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4">Loading patient orders...</td>
                </tr>
              ) : !Array.isArray(patientOrders) || patientOrders.length === 0 ? (
                <tr>
                  <td colSpan="4">No orders found for this patient.</td>
                </tr>
              ) : (
                patientOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>${order.totalCost}</td>
                    <td>{order.status}</td>
                    <td>
                      <Button style={{ backgroundColor: "#009688"}} onClick={() => showOrderDetails(order)}>
                        Show Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Order Details</ModalHeader>
            <ModalBody>
              {selectedOrder && (
                <>
                  <CardText>
                    <strong>Total Quantity:</strong> {selectedOrder.totalQty}
                  </CardText>
                  <CardText>
                    <strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}
                  </CardText>
                  <CardText>
                    <strong>Items:</strong>
                    <ul>
                      {selectedOrder.items &&
                        selectedOrder.items.map((item, index) => (
                          <li key={index}>
                            {item.quantity} x {item.name || "Unknown Medicine"} - ${item.total}
                          </li>
                        ))}
                    </ul>
                  </CardText>
                  {selectedOrder.status === "pending" && (
                    <Button color="danger"
                    style={{background:"#C41E3A"}}
                    onClick={() => cancelOrder(selectedOrder.orderId)
                    .then(()=>{toggleModal();})}>   
                      Cancel Order
                    </Button>
                  )}
                </>
              )}
            </ModalBody>
          </Modal>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Orders;
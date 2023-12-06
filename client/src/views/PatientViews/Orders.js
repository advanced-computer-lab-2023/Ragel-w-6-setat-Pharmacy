import React, { useEffect, useState, useContext } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    Container,
    Row,
    Button,
} from "reactstrap";

import AdminHeader from "components/Headers/AdminHeader.js";
import { UserContext } from "../../contexts/UserContext";

const Orders = () => {
    const { user } = useContext(UserContext);

    const [patientOrders, setPatientOrders] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const fetchPatientOrders = async () => {
        try {
            const response = await fetch(
                "/api/patient/viewPatientOrders/${patientId}"
            );
            const data = await response.json();
            setPatientOrders(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching patient orders:", error);
        }
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
             <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
           

            <Container>
                <Row>
                    <div className="col">
                        {loading ? (
                            <p>Loading patient orders...</p>
                        ) : !Array.isArray(patientOrders) || patientOrders.length === 0 ? (
                            <p>No orders found for this patient.</p>
                        ) : (
                            patientOrders.map((order) => (
                                <Container key={order.orderId} className="mb-4">
                                    <Card className="shadow">
                                        <CardHeader className="border-0">
                                            <h3 className="mb-0">Order ID: {order.orderId}</h3>
                                        </CardHeader>
                                        <CardBody>
                                            <CardText>
                                                <strong>Total Quantity:</strong> {order.totalQty}
                                            </CardText>
                                            <CardText>
                                                <strong>Total Cost:</strong> {order.totalCost}
                                            </CardText>
                                            <CardText>
                                                <strong>Status:</strong> {order.status}
                                            </CardText>
                                            <CardText>
                                                <strong>Created At:</strong>{" "}
                                                {new Date(order.createdAt).toLocaleString()}
                                            </CardText>
                                            {order.items && Array.isArray(order.items) && (
                                                <CardText>
                                                    <strong>Items:</strong>
                                                    <ul>
                                                        {order.items.map((item, index) => (
                                                            <li key={index}>
                                                                {item.quantity} x{" "}
                                                                {item.name ? item.name : "Unknown Medicine"} - ${item.total}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </CardText>
                                            )}
                                            {order.status === 'pending' && (
                                                <Button color="danger" onClick={() => cancelOrder(order.orderId)}>
                                                    Cancel Order
                                                </Button>
                                            )}
                                        </CardBody>
                                    </Card>
                                </Container>
                            ))
                        )}
                    </div>
                </Row>
            </Container>
            </div>
        </>
    );
};

export default Orders;
import React, { useEffect, useState } from "react";
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

const Orders = () => {
    const [patientOrders, setPatientOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const cancelOrder = async (orderId) => {
        try {
            const response = await fetch(`/api/patient/cancelOrder/654beffcf9d0ca04d098b0e3/${orderId}`, {
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
                "/api/patient/viewPatientOrders/654beffcf9d0ca04d098b0e3"
            );
            const data = await response.json();
            setPatientOrders(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching patient orders:", error);
        }
    };

    useEffect(() => {
        console.log("Orders component rendered");
        fetchPatientOrders();
    }, []);

    return (
        <>
            <AdminHeader />
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        {loading ? (
                            <p>Loading patient orders...</p>
                        ) : patientOrders.length === 0 ? (
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
        </>
    );
};

export default Orders;
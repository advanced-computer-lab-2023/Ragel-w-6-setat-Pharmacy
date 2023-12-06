import "./Conversation.css";

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

const Conversations = () => {
    const { user } = useContext(UserContext);

    const [patientOrders, setPatientOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const patientId = user._id;

    

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
              <div className="conversation">
        <img
            className="conversation"
            src=""
            alt=""
            />
            <span className="conversationName">John Doe</span>



              </div>
            
        </>
    );
};


export default Conversations;


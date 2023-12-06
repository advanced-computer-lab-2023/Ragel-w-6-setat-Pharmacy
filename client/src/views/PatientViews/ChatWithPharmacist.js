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
import "./Chat.css";
import Conversations from "components/conversations/Conversations";

const ChatWithPharmacist = () => {
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
               <div className="messenger">
                   <div className="chatMenu">
                        <div className="chatMenuWrapper">
                             <input placeholder="Search for friends" className="chatMenuInput"/>
                             <Conversations/>
                             <Conversations/>
                             <Conversations/>

                    </div>
                </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">box </div>
         </div>   
        <div className="chatOnline">
          <div className="chatOnlineWrapper">online</div>
        </div>
      </div>
            
        </>
    );
};


export default ChatWithPharmacist;


{/* 
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
import "./Chat.css";

const ChatWithPharmacist = () => {
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
            <Container className="mt--7" fluid>
               <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
            </Container>
        </>
    );
};

export default ChatWithPharmacist;
}
*/  }
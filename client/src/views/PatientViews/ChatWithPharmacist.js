import React, { useEffect, useState, useContext, useCallback } from "react";
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
import Conversations from "components/conversations/Conversation.js";
import Message from "components/message/Message.js";
import ChatOnline from "components/chatOnline/chatOnlineAvailPharm";
import { useRef } from "react";
import io from "socket.io-client"; // Import io from socket.io-client

const ChatWithPharmacist = () => {


  // Parse user from localStorage and merge with defaultUser
  const userDataString = localStorage.getItem('user');
const user = userDataString ? JSON.parse(userDataString) : null;

if (user) {
  const { _id, username } = user;
  console.log(JSON.stringify(user) + " check user");
  const userString = JSON.stringify({ _id, username });
} else {
  // Handle the case where 'user' is null
  console.error("User data is null");
}
  
    const [conversations, setConversations] = useState();
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const[newMessage,setNewMessage]=useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [availableUsers, setAvailableUsers] = useState([]);
    // const [socket, setSocket] = useState(null);
    const socket=useRef();
    const scrollRef = useRef();
    //const [loading, setLoading] = useState(true);
    const patientId = user._id;
   // const pharmacistId = user2._id;
    console.log("Patienttt ID:", patientId);
    //console.log("Pharmacist ID:", pharmacistId);

  const [forceRerender, setForceRerender] = useState(0); // State to force re-render

  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    // Set up an interval to trigger a re-render every 0.05 seconds
    const interval = setInterval(() => {
      setForceRerender((prev) => prev + 1);
    }, 50);

    // Clear the interval and socket on component unmount
    return () => {
      clearInterval(interval);
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);




  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const response = await fetch(`/api/message/${currentChat._id}`);
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [currentChat]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [user]);






  const forceUpdate = useCallback(() => {
    setConversations((prev) => prev); // This will trigger a re-render
  }, []);


    const getConversations = async () => {
      try {
        const response = await fetch(`/api/conversation/${user._id}`);
        if (response.ok) {
          const data = await response.json();
          setConversations(data);
          forceUpdate();
        } else {
          console.log("Error fetching conversations:", response);
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      getConversations();
      forceUpdate();
    }, [user._id]);
  
    useEffect(() => {
      const fetchAndCreateConversations = async () => {
        try {
          // Fetch all pharmacists
          const pharmacistsResponse = await fetch('/api/admin/getPharmacistsInfo');
          const pharmacistsData = await pharmacistsResponse.json();

          const uniquePharmacist=new Set(pharmacistsData);
          // Filter out the pharmacists with whom the patient already has a conversation
          const pharmacistsWithoutConversation = pharmacistsData.filter((pharmacist) => {
            return !conversations.some((conversation) =>
              conversation.members.includes(patientId) &&
              conversation.members.includes(pharmacist._id)
            );
          });
  
          // Create conversations for pharmacists without existing conversations
          for (const pharmacist of pharmacistsWithoutConversation) {
            const newConversationResponse = await fetch("/api/conversation", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                senderId: patientId,
                receiverId: pharmacist._id,
              }),
            });
  
            const newConversation = await newConversationResponse.json();
  
            // Emit the new conversation event to the server
            socket.current.emit('newConversation', newConversation);
  
            setConversations((prevConversations) => [...prevConversations, newConversation]);
            forceUpdate();
          }
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchAndCreateConversations();
    }, [conversations, forceUpdate, patientId]);
  

  console.log(currentChat)

  useEffect(() => {

    const getMessages = async () => {
      try {
        const response = await fetch(`/api/message/${currentChat?._id}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };


    getMessages();

  }, [currentChat])

  console.log(messages)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: patientId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(member => member !== patientId);


    socket.current.emit("sendMessage", {
      senderId: patientId,
      receiverId,
      text: newMessage,
    });

    try {
      const response = await fetch("/api/message/", {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setMessages((prev) => [...prev, data]); // Update state properly
      setNewMessage(""); // Clear the new message input
    } catch (error) {
      console.error("Error sending message:", error);
      console.log(error);
    }

    };

    

    

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>

      <AdminHeader />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations && conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversations key={c._id} conversation={c} currentUser={user} />
              </div>
            ))}

          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ?
                <>
                  <div className="chatBoxTop">
                    {messages && messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.sender === patientId} />
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
                    <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                  </div>
                </>
                : <span className="noConversationText">Open a conversation to start a chat with a Pharmacist</span>}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              availableUsers={availableUsers}
              currentId={patientId}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>


    </>
  );
}


export default ChatWithPharmacist;


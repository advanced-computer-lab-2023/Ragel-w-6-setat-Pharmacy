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
import ChatOnlineAvailPatients from "components/chatOnline/chatOnlineAvailPatients.js";
import { useRef } from "react";
import io from "socket.io-client"; // Import io from socket.io-client

const ChatWithPatients = () => {


  // Parse user from localStorage and merge with defaultUser
  const _id = JSON.parse(localStorage.getItem('user'))._id;
  const username = JSON.parse(localStorage.getItem('user')).username;
  const user = {_id: _id,username: username };
  console.log(JSON.stringify(user) + " check user");
  const userString = JSON.stringify(user);
  
    const [conversations, setConversations] = useState();
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const[newMessage,setNewMessage]=useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const[availableUsers,setAvailableUsers]=useState([]);
   // const [socket, setSocket] = useState(null);
    const socket=useRef();
    const scrollRef = useRef();
    //const [loading, setLoading] = useState(true);
    const patientId = user._id;
   // const pharmacistId = user2._id;
    console.log("Patienttt ID:", patientId);
    //console.log("Pharmacist ID:", pharmacistId);


    useEffect(() => {
      socket.current = io("ws://localhost:8900");
      console.log("Socket:", socket.current)
      socket.current.on("getMessage", (data) => {
        console.log("Received message from server:", data);

        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
        
      });
    },[]);

  useEffect(() => {
    console.log("arrivalMessage:", arrivalMessage);

    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  },[arrivalMessage,currentChat])
    
  useEffect(() => {
    console.log("socket.current:", socket.current);

  socket.current.emit("addUser", patientId); 
  socket.current.on("getUsers", users => {
    console.log("Users:", users)
    //FIXME setAvailableUsers(users)
  })
  
  }, [user]);
    


  const forceUpdate = useCallback(() => {
    setConversations((prev) => prev); // This will trigger a re-render
  }, []);
  



    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await fetch(`/api/conversation/${patientId}`);
                console.log("Response:", response);
                const data = await response.json();
                console.log("Conversationsss:", data);
                setConversations(data); 

                
            } catch (error) {
                console.error("Error fetching patient orders:", error);
            }
        };

        getConversations();
        forceUpdate();
    }, [patientId,forceUpdate]);

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

    },[currentChat])

    console.log(messages)

    const handleSubmit = async (e) => {
      e.preventDefault();
      const message = {
        sender: patientId,
        text: newMessage,
        conversationId: currentChat._id,
      };

      const receiverId = currentChat.members.find(member=>member !== patientId);


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
        setMessages([...messages, data]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        console.log(error);
      }

    };

      

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    },[messages]);

    return (
      <>
        
            <AdminHeader />
               <div className="messenger">
                   <div className="chatMenu">
                        <div className="chatMenuWrapper">
                             <input placeholder="Search for friends" className="chatMenuInput"/>
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
            <Message message={m} own={m.sender===patientId }/>
            </div>
            ))}
             </div> 
            <div className="chatBoxBottom">
                  <textarea
                   className="chatMessageInput" 
                   placeholder="write something..."
                   onChange={(e)=>setNewMessage(e.target.value)}
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
            
            
          </div>
         </div>     
        </div>
      
        
       </>
    );
}


export default ChatWithPatients;

///FIXME ADD CHAT ONLINE COMPONENT OF AVAILABLE PHARMACISTS
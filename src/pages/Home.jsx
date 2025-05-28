import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sliderbar from "../components/Slidebar";
import ChatWindow from "../components/Chatwindow"
import { handleSentMessage, getChatData, saveChatData } from "../functions/saveDataLS";
import {categorizeChatsByDate } from "../data/getData"


export default function Home() {

  const { chatId } = useParams(); 
  const navigate = useNavigate(); 
  const ChatData = getChatData([]);
  const [currentChayHistory , setCurrentChayHistory] =useState(ChatData)
  const [currentChatId, setCurrentChatId] = useState(chatId ? chatId:null); 
  const [PendingRequest , setPendingRequest] = useState(null)
  
  useEffect(() => {
    if (chatId && chatId !== currentChatId) {
      setCurrentChatId(chatId);
    }
  }, [chatId]);
  useEffect(() => {
    if (currentChatId && currentChatId !== chatId) {
      navigate(`/chat/${currentChatId}`); // ✅ Update the URL
    }
  }, [currentChatId, chatId, navigate]);

  const handelTabclose = () =>{
    localStorage.removeItem('pendingRequest');
    console.log("Pending request has been deleted")
  };
  useEffect(()=>{
    handelTabclose
  },currentChayHistory);

  useEffect(()=>{
    
    window.addEventListener("beforeunload",handelTabclose);
    return ()=>{
      window.removeEventListener("beforeunload",handelTabclose);
    };
  },[]);
    
  function handleChatSelection(chatId) {
      setCurrentChatId(chatId); 
      }
  function findChatById(id, chats) {
    return (chats.find(chat => chat.id === id) || []);
    }

    


    const sendMessage = (message ) => {
      const req ={
        id: currentChatId,
        request:`${message}-pending`,
        recommendation: null
      }
      setPendingRequest(req)
      handleSentMessage(message, currentChatId ,setCurrentChayHistory, setCurrentChatId,setPendingRequest);
    };




    return (
        <div className="flex h-screen w-screen">
            <Sliderbar chatHistoryData={currentChayHistory}  categorizeChatHistory={categorizeChatsByDate(currentChayHistory)} currentChatId={currentChatId} setCurrentChat={handleChatSelection} />
            <ChatWindow currentChatId={currentChatId} 
                        getCurrentData={findChatById(currentChatId, currentChayHistory)}  
                        handleSentMessage={sendMessage}
                        getPendingRequest={PendingRequest} />
        </div>





    );
  }


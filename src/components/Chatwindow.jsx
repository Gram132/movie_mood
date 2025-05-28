import React, { useEffect, useRef, useState } from "react";

import sendMessageIcon from "../assets/images/message.png";
import userIcon from "../assets/images/user.png";

export default function ChatWindow(props) {
  const { currentChatId, getCurrentData, handleSentMessage, getPendingRequest } = props;
  const [message, setMessage] = useState("");

  const chatEndRef = useRef(null);

  const [videoUrl, setVideoUrl] = useState(null);

  
  const conversation = getCurrentData.conversation;
  const pendingRequest = getPendingRequest;
  const updatedConversation = conversation && pendingRequest && currentChatId === pendingRequest.id
    ? [...conversation, pendingRequest] 
    : conversation 
    ? conversation 
    : (pendingRequest && currentChatId === pendingRequest.id ? pendingRequest : null);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, updatedConversation);

  // Create a new conversation array by adding the pending request
  
  
  


  return (
    <div className="h-screen w-screen flex flex-col bg-slate-blue text-white relative">
      {/* Scrollable Chat Content */}
      <div className="flex-1 overflow-y-auto relative custom-scrollbar">
        <div className="w-full max-w-3xl mx-auto p-4">

          {updatedConversation ? (
          updatedConversation?.map((chat, index) => (
            <div key={index}>
              <div className="flex justify-end items-center mb-4 p-4 rounded-lg">
                <p className="text-y-yellow" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px" }}>
                  {chat.request}
                </p>
                <div
                  className="w-10 h-10 rounded-full ml-[10px] bg-yellow-400 flex-shrink-0"
                  style={{
                    backgroundImage: `url(${userIcon})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                />
              </div>
              {chat.recommendation ? (
                <div className="mb-4 p-4 bg-response-blue text-slate-800 rounded-lg">
                  <div className="flex justify-start items-start mb-4 p-4 rounded-lg">
                    <div className="w-10 h-10 rounded-full mr-3 bg-y-yellow flex-shrink-0" />
                    <div className="flex-1 text-y-yellow" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px" }}>
                      {chat.recommendation.text}
                    </div>
                  </div>

                  {/* Video Buttons */}
                  <div className="flex justify-around items-center">
                    {chat.recommendation.movies.map((movie ,index) => (
                      <div className="relative" key={`${movie.title}-${movie.poster}-${movie.overview}`}>
                        <div
                          className="relative w-[200px] h-[219px] rounded-[55px] overflow-hidden"
                          style={{
                            backgroundImage: `url(${movie.poster})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                          }}
                        >
                          <div
                            className="w-full h-[78px] absolute bottom-0 outline-none border-none flex flex-col justify-center px-4 overflow-hidden"
                            style={{
                              background: "linear-gradient(to bottom, rgba(18, 9, 17, 0) 0%, rgba(14, 14, 14, 0.8) 50%, #565656 100%)",
                            }}
                          >
                            <div
                              className="text-white font-medium text-ellipsis"
                              style={{ fontFamily: "'Lexend', sans-serif", fontSize: "16px", fontWeight: "light" }}
                            >
                              {movie.title}
                            </div>
                            <div
                              className="text-gray-300 text-ellipsis"
                              style={{ fontFamily: "'Lexend', sans-serif", fontSize: "14px", fontWeight: "light" }}
                            >
                              Gunna {index}
                            </div>
                          </div>
                        </div>
                        <button
                          className="flex justify-center items-center absolute w-[42px] h-[42px] top-0 right-[-10px] p-2 rounded-full"
                          style={{
                            color: "white",
                            background: "linear-gradient(to bottom, rgba(18, 9, 17, 0) 0%, rgba(14, 14, 14, 0.8) 50%, #565656 100%)",
                          }}
                          onClick={() => setVideoUrl(movie.trailerUrl)}
                        >
                          ▶
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))) : null}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className={`w-full max-w-3xl left-1/2 transform -translate-x-1/2 mx-auto p-4 border-slate-600 transition-all duration-500 ease-in-out ${
                     (!updatedConversation || updatedConversation.length === 0)
                     ? "absolute top-1/2 -translate-y-1/1"
                     : "relative bottom-0 mr-0 ml-0"}`}>
        <div className="max-w-3xl h-[147px] mx-auto">
          <form
            className="flex justify-between items-center w-full max-w-3xl h-[80px] mx-auto border-input-blue bg-input-blue rounded-lg"
            onSubmit={handleSentMessage}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); // prevent newline
                  handleSentMessage(message);
                  setMessage('');
                }
              }}
              placeholder="How can I help you? ..."
              className="w-full px-3 py-3 resize-none outline-none focus:outline-none border-none focus:ring-0 max-h-40 font-sans text-base custom-scrollbar"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px" }}
              rows={1}
            />
            <button
              className="w-[19px] mr-[25px] bg-transparent border-none outline-none p-0 cursor-pointer"
              style={{
                background: "transparent",
                outline: "none",
                boxShadow: "none",
              }}
              type="submit"
              //onClick={() => { handleSentMessage(message , getCurrentData['id'] )}} >
              onClick={() => {
                handleSentMessage(message);
                setMessage('');
              }}
            >
              <div
                className="w-[19px] h-[19px]"
                style={{
                  backgroundImage: `url(${sendMessageIcon})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  border: "none",
                }}
              />
            </button>
          </form>
          <div className="flex justify-center items-end text-icon-blue mt-[30px]">
            ©2023 PromptFolder. Privacy Policy | Terms of Service | Contact
          </div>
        </div>
      </div>

      {/*Youtube player*/}

      {videoUrl && (
  <div
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-screen border rounded-lg border-none overflow-hidden bg-black p-15"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={() => setVideoUrl(null)}
  >
    <iframe
      className="w-full h-full"
      src={
        videoUrl.includes("watch?v=")
          ? videoUrl.replace("watch?v=", "embed/")
          : videoUrl
      } // Convert standard URL to embed URL if needed
      title="YouTube video player"
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen // Added for full-screen support
    />
    <button
      className="flex justify-center items-center absolute w-[42px] h-[42px] top-0 right-0 p-2 rounded-full"
      style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0)" }}
      onClick={() => setVideoUrl(null)}
    >
      ✖
    </button>
  </div>
)}
    </div>
  );
}

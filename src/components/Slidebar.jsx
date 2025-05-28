import React, { useState } from 'react';
import  {Link} from "react-router-dom";
import Logo from "../assets/images/logo.png"
import navbar from "../assets/images/navbar.png"
import settingIcon from "../assets/images/setting.png"
import SeeMore from "../assets/images/seeplus.png"
import SeeMoreUP from "../assets/images/seeplusUp.png"
import speechIcon from "../assets/images/speechBubble.png"

export default function Sliderbar(props){
    const {chatHistoryData , categorizeChatHistory , currentChatId ,setCurrentChat} = props
    const [Isopen, setIsopen] =useState(false)
    const [isnavbarOn, setIsnavbarOn]= useState(true)
    return(
        <>
            {isnavbarOn ? (
                // Original expanded navbar
                <div className="transition-all duration-300 w-[260px] bg-h-blue text-white flex items-center justify-center translate-x-0">
                    <div className="h-screen w-full flex justify-center flex-col text-white">
                        <div className="flex h-10 p-4 justify-start items-center mt-6">
                            <div className="w-10 h-10  mb-6 bg-center cursor-pointer"
                                 style={{
                                  backgroundImage: `url(${Logo})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "contain"
                                  }}
                                  onClick={() => setIsnavbarOn(!isnavbarOn)}/>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                            <div className="w-full h-[36px] mb-[6px] flex justify-center items-center bg-h-blue border border-sel-blue hover:bg-slate-blue rounded-sm">
                                <div   className="ml-[20px] w-[15px] h-[15px] flex justify-center items-center bg-h-purple rounded-sm font-display text-lm leading-none text-center">+</div>
                                <span className="flex-1 text-center" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px",fontWeight:"lighter" }}>New Chat</span>
                            </div>

                            <div className="w-full h-[36px] mb-[6px] flex justify-center items-center bg-h-blue border border-bor-blue hover:bg-slate-blue rounded-sm" onClick={() => setIsopen(!Isopen)}>
                                <div className="ml-[20px] w-[15px] h-[15px] flex justify-center items-center bg-h-purple bg-center rounded-full"
                             style={{
                              backgroundImage: Isopen ? `url(${SeeMoreUP})`:`url(${SeeMore})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize:"cover"
                                 }} />
                                 <span className="flex-1 text-center" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px",fontWeight:"lighter" }}>Recent Chats</span>
                            </div>
                            
                            <div className={`custom-scrollbar flex-1 p-2 overflow-y-auto h-[150px] transition-all duration-300 ease-in-out ${Isopen ? 'opacity-100 max-h-[300px] translate-y-0' : 'opacity-0 max-h-0 translate-y-[10px] overflow-hidden p-[0px]'} `} >
                                {categorizeChatHistory.map((categoryObj) => (
                                    <div key={categoryObj.category}>
                                        <span className="font-poppins uppercase text-y-yellow"
                                              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: "lighter" }}>
                                                {categoryObj.category}
                                        </span>
                                        {categoryObj.chats.map((conversation, id,convIndex) => (
                                            <Link to={`/chat/${conversation.id}`} key={convIndex} className="no-underline text-white mt-[5px] flex items-center" 
                                                  onClick={() => setCurrentChat(conversation.id) }>
                                                    <div className="w-[24px] h-[19px] bg-center" 
                                                         style={{
                                                            backgroundImage: `url(${speechIcon})`,
                                                            backgroundRepeat: "no-repeat",
                                                            backgroundSize: "cover"
                                                         }}/>
                                                    <div className={`ml-[10px] w-[150px] overflow-hidden whitespace-nowrap ${currentChatId == conversation.id ? 'text-y-yellow' : 'text-white'} text-ellipsis hover:text-y-yellow`}
                                                         style={{ 
                                                         fontFamily: "'Montserrat', sans-serif", 
                                                         fontSize: "10px", 
                                                         fontWeight: "lighter" }}>
                                                            {conversation.title}
                                                    </div>
                                            </Link>
                                         ))}
                                    </div>
                                 ))}
                            </div>
                            <div className="w-full h-[36px] mb-[6px] flex justify-center items-center bg-h-blue border border-bor-blue hover:bg-slate-blue rounded-sm">
                                 <div className="ml-[20px] w-[15px] h-[15px]  flex justify-center items-center bg-h-purple bg-center rounded-full"
                                       style={{
                                        backgroundImage: `url(${SeeMore})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize:"cover"
                                       }}
                                 />
                                 <span className="flex-1 text-center">Favourite List</span>
                            </div>
                  
                        </div>
    
                        
                    </div>
                </div>
            ) : (
                // Compact navbar when isnavbarOn is false
                <div className="transition-all duration-300 fixed top-0 left-0 h-screen w-16  flex flex-col items-center py-4 z-10">
                    {/* Logo at top */}
                    <div 
                        className="w-10 h-10 mb-6 bg-center cursor-pointer"
                        style={{
                            backgroundImage: `url(${Logo})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain"
                        }}
                        onClick={() => setIsnavbarOn(!isnavbarOn)}
                    />
                    {/* Icon for new chat */}
                    <div className="w-8 h-8 mb-4 bg-h-purple flex items-center justify-center rounded-sm cursor-pointer">
                        <span className="text-white text-sm">+</span>
                    </div>
                 </div>
            )
            }
        </>
    )
}
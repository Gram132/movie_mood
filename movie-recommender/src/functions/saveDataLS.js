import {sendRequest} from "../functions/getAPI.js"


export const getChatData = (initialChatData = []) =>{
    try{
      const CurrentChatData = localStorage.getItem('chatHistory')
      return CurrentChatData ? JSON.parse(CurrentChatData) : initialChatData;
    }catch(error){
      console.log('Error reading data from LocalStorage',error)
      return initialChatData
    }
  }

export const saveChatData = (data) => {
    try {
      localStorage.setItem('chatHistory', JSON.stringify(data));
      console.log('Data saved to localStorage');
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  };


export const updatePendingRequest = (message) => {
    try {
      localStorage.setItem('pendingRequest', JSON.stringify(message));
      console.log('Request is pending and saved to localStorage');
    } catch (error) {
      console.error('Error saving Request to localStorage:', error);
    }
  };

export const getPendingRequest = (initialChatData = []) =>{
  try{
    const CurrentPendingRequest = localStorage.getItem('pendingRequest')
    return CurrentPendingRequest ? JSON.parse(CurrentPendingRequest) : initialChatData;
  }catch(error){
    console.log('Error reading data from LocalStorage',error)
    return initialChatData
  }
}



// create unique IDs Function

function generateUniqueChatId() {
    // Get the current timestamp in milliseconds
    const timestamp = Date.now();
    
    // Generate a random number to make the ID more unique
    const randomNum = Math.floor(Math.random() * 1000000);
    
    // Combine timestamp and random number to generate a unique ID
    const chatId = `chat-${timestamp}-${randomNum}`;
    
    return chatId;
}

// Function that finds a chat by ID and pushes a new chat to it
function findAndPushChat(chatId, chat) {
  const chatDataArray = getChatData();
  const chatCollection = chatDataArray.find(collection => collection.id === chatId);

  // If chat collection exists, push the new chat to it
  if (chatCollection) {
    if (!chatCollection.conversation) {
      chatCollection.conversation = [];
    }
    chatCollection.conversation.push(chat);
  } else {
    // If the chat collection does not exist, you could optionally create a new one
    chatDataArray.push({ id: chatId, conversation: [chat] });
  }

  // Return the entire updated chatDataArray
  return chatDataArray;
}


function getChatLengthById(chatId) {
  const chatDataArray = getChatData();
  const chatCollection = chatDataArray.find(collection => collection.id === chatId);

  // If the collection is found and has a conversation, return the length of the conversation
  if (chatCollection && chatCollection.conversation) {
    return chatCollection.conversation.length;
  }

  // If no collection is found or no conversation exists, return 0
  return 0;
}


export const handleSentMessage= async(message, currentChatID ,setCurrentChayHistory, setCurrentChatId,setPendingRequest) => {
    const req ={
        request: message,
        recommendation: null
      }
    
    if (currentChatID !== null) {
        req.id = `${currentChatID}-req`;
        try {
          const rslt = await sendRequest(message);
          const ChatLength = getChatLengthById(currentChatID)
          const recommendation= {
            text: rslt.prompt_data.summary,
            movies: rslt.prompt_data.movies.slice(0,3)
          }
          const chat = {
            requestId:`${currentChatID}-req-${ChatLength}`, 
            request: message,
            recommendation
        }
        const chatData = findAndPushChat(currentChatID,chat)
        
        
        saveChatData(chatData)
        setPendingRequest(null)
        setCurrentChatId(currentChatID)
        setCurrentChayHistory(chatData);
          // proceed with result...
        } catch (error) {
          console.error("Failed to send request:", error);
          // optionally update state to reflect error
        } // Update chat state
    }else{
        req.id = generateUniqueChatId();
        

        
        // Chat doesn't exist: Create new chat with default data
        const newChatID = req.id; // Generate new unique ID
        const newChat = {
          id: newChatID,
          chatType: "Movie Recommendations",
          dateCreated: new Date().toISOString(),
          title: "New Chat",
          conversation: [
            {
                requestId:`${newChatID}-req-0`,
                request: req.request,
                recommendation: null
            },
          ],
        };
        
        let chatData = getChatData();
        if (!Array.isArray(chatData)) {
          chatData = [];
        }
        chatData.push(newChat);
        setCurrentChatId(newChatID)

        saveChatData(chatData); // Save updated data
        setCurrentChayHistory(chatData); // Update chat state
        }


    
  }
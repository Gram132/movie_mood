import {ChatData } from "./chatHistory.js"

export function categorizeChatsByDate(chats) {

  console.log(chats)

  const categorizedChats = [];

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Categorize chats based on the dateCreated field
  const todayChats = [];
  const yesterdayChats = [];
  const olderChats = [];

  chats.forEach(chat => {
    const chatDate = new Date(chat.dateCreated);
    let category = "";

    // Check if the chat is from today
    if (chatDate.toDateString() === today.toDateString()) {
      todayChats.push(chat);
    }
    // Check if the chat is from yesterday
    else if (chatDate.toDateString() === yesterday.toDateString()) {
      yesterdayChats.push(chat);
    }
    // Otherwise it's from an older date
    else {
      olderChats.push(chat);
    }
  });
  
  // Add non-empty categories to the result
  if (todayChats.length > 0) {
    categorizedChats.push({ category: "Today", chats: todayChats });
  }
  if (yesterdayChats.length > 0) {
    categorizedChats.push({ category: "Yesterday", chats: yesterdayChats });
  }
  if (olderChats.length > 0) {
    categorizedChats.push({ category: "Older", chats: olderChats });
  }
  
  return categorizedChats;
  }
  

 
  
  
  
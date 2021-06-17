import { useState, useEffect, useRef } from "react";
import { getMessages, sendMessage } from "../../utils/messages-api";
<<<<<<< HEAD
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";
=======
import "./Conversation.css"
>>>>>>> ded1fc1 (polishing updates)

export default function Conversation({ post, reply, deal }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    getMessages(post._id, reply._id)
      .then(res => setMessages(res));

    const socket = socketIOClient(ENDPOINT);

    socket.on("WhatDeal", () => {
      socket.emit("WatchDeal", deal._id);
    });

    socket.on("NewMessage", socketMessages => {
      setMessages(socketMessages);
    });


    return () => socket.disconnect();
  }, []);

  function handleMessageChange(e) {
    e.preventDefault();

    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    sendMessage(post._id, reply._id, inputValue)
      .then(res => setMessages(res))
      .then(setInputValue(""));
  }

  function handleRefresh(e) {
    e.preventDefault();

    getMessages(post._id, reply._id)
      .then(res => setMessages(res));
  }

  return (
    <div>
      <div className="Conversation-chat-box">
        {messages.length ?
          messages.map
            (message =>
              <div className="Conversation-div">
                <p
                  className="Conversation-message-p"
                >
                  {message}
                </p>
              </div>
            ) : null}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          id="message"
          required="true"
          value={inputValue}
          onChange={handleMessageChange}
        />
        <button type="submit">Send</button>
        <button onClick={handleRefresh}>Refresh</button>
      </form>

    </div>
  );
}

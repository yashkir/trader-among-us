import { useState, useEffect, useRef } from "react";
import { getMessages, sendMessage } from "../../utils/messages-api";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";
import "./Conversation.css"

export default function Conversation({ post, reply, deal }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const scroll = useRef(null);

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

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
                <div
                  className=
                  {
                    post.author.name == message.slice(0, message.indexOf(':'))
                      ?
                      "Conversation-main-msg"
                      :
                      "Conversation-reply"
                  }
                >
                  {message.slice(message.indexOf(':') + 1).trim()}
                </div>
              </div>
            ) : null}
        <div ref={scroll}></div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="Message-form"
          type="text"
          name="message"
          id="message"
          required="true"
          value={inputValue}
          onChange={handleMessageChange}
        />
        <button type="submit">Send</button>
        <button className="send-btn" onClick={handleRefresh}>Refresh</button>
      </form>

    </div>
  );
}

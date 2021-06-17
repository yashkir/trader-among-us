import { useState, useEffect, useRef } from "react";
import { getMessages, sendMessage } from "../../utils/messages-api";
import { FiSend } from "react-icons/fi"
import { getUser } from "../../utils/users-service"

import socketIOClient from "socket.io-client";
import "./Conversation.css"
const ENDPOINT = "http://127.0.0.1:3001";

export default function Conversation({ post, reply, deal }) {
  const [user, setUser] = useState(getUser())

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
                    user.name == message.slice(0, message.indexOf(':'))
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
      <div className="Message-form-container">
        <form onSubmit={handleSubmit}>
          <div className="Flex-form-message">
            <input
              className="Message-form"
              type="text"
              name="message"
              id="message"
              required="true"
              value={inputValue}
              onChange={handleMessageChange}
              placeholder="Enter a message"
            />
          </div>
          <div className="Flex-buttons-message">
            <button type="submit"><FiSend className="Message-send" /></button>
          </div>
        </form>
      </div>

    </div>
  );
}

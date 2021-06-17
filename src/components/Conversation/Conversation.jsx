import { useState, useEffect } from "react";
import { getMessages, sendMessage } from "../../utils/messages-api";

export default function Conversation({ post, reply, deal }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages(post._id, reply._id)
      .then(res => setMessages(res));
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
      <div style={{
        textAlign: "left",
        height: "7rem",
        overflow: "scroll",
      }}>
        {messages.length ? messages.slice(0).reverse().map(message => <p>{message}</p>) : null}
      </div>
    </div>
  );
}

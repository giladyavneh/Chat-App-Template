import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setUser(`Guest #${Math.ceil(Math.random() * 2000)}`);
    setInterval(() => {
      fetch("/messages")
        .then((res) => res.json())
        .then((res) => setMessages(res));
    }, 1000);
  }, []);

  function postMessage(e) {
    e.preventDefault();
    const body = {
      body: inputValue,
      user,
    };
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetch("/messages", options);
    setInputValue("");
  }

  return (
    <div>
      <input
        id="changeUserInput"
        onChange={(e) => setUser(e.target.value)}
        value={user}
      />
      <div class="messagesContainer">
        <form onSubmit={postMessage}>
          <input
            id="messageInput"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <button type="submit" id="sendButton">
            Send
          </button>
        </form>

        {messages.map((message) => (
          <div
            className={message.user === user ? "my-msg msg" : "other-msg msg"}
          >
            <h4>{message.user}</h4>
            <p>{message.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

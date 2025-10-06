import React, { useEffect, useState } from "react";
import axios from "axios";

const Messages = () => {
  const [msg, setMsg] = useState("");
  const [allMsgs, setAllMsgs] = useState([]);

  const fetchMessages = async () => {
    const res = await axios.get("http://localhost:5000/api/message");
    setAllMsgs(res.data);
  };

  const submitMessage = async () => {
    if (msg.trim()) {
      await axios.post("http://localhost:5000/api/message", { text: msg });
      setMsg("");
      fetchMessages();
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Messages</h2>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={submitMessage}>Submit</button>
      <ul>
        {allMsgs.map((m, i) => (
          <li key={i}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;

import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const date = currentTime.toLocaleDateString();
  const time = currentTime.toLocaleTimeString();

  return (
    <div>
      <h1>
        <b>Welcome to CHARUSAT!!!!</b>
      </h1>
      <p>
        <b>It is {date}</b>
      </p>
      <p>
        <b>It is {time}</b>
      </p>
    </div>
  );
}

export default App;

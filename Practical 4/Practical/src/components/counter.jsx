import React, { useState } from "react";
import "./counter.css";

function Counter() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div className="container">
      <h1>Counter: {count}</h1>
      <div className="Buttons">
        <button id="btn" onClick={() => setCount(0)}>Reset</button>
        <button id="btn" onClick={() => setCount(count + 1)}>Increment</button>
        <button id="btn" onClick={() => setCount(count - 1)}>Decrement</button>
        <button id="btn" onClick={() => setCount(count + 5)}>Increment by 5</button>
      </div>

      <h1>Welcome to CHARUSAT Buddy!!!</h1>

      {/* Form Inputs */}
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/* Output */}
      <div className="output">
        <div className="output-row">
          <span className="output-label">First Name:</span>
          <span className="output-value">{firstName || "—"}</span>
        </div>
        <div className="output-row">
          <span className="output-label">Last Name:</span>
          <span className="output-value">{lastName || "—"}</span>
        </div>
      </div>
    </div>
  );
}

export default Counter;

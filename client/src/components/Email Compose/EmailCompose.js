import React, { useState } from "react";
import "./emailcompose.css";
import axios from "axios";

export default function EmailCompose() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/send-email", {
        from,
        to,
        message,
      });
      console.log("Email sent and saved successfully");
      alert("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/save-email", {
        from,
        to,
        message,
      });
      console.log("Email saved successfully");
      alert("Email saved successfully");
    } catch (error) {
      console.error("Error saving email:", error);
    }
  };
  return (
    <>
      <div className="mainContainer">
        <div className="container1">
          <form >
            <label>
              From address:
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </label>
            <label>
              To address:
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </label>
            <label>
              Message:
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleSubmit}>Send</button>
          </form>
        </div>
      </div>
    </>
  );
}

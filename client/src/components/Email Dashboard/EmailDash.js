import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

export default function EmailDash() {
  const [sentEmails, setSentEmails] = useState([]);

  useEffect(() => {
    const fetchSentEmails = async () => {
      try {
        const response = await axios.get("http://localhost:3001/sent-emails");
        setSentEmails(response.data);
      } catch (error) {
        console.error("Error fetching sent emails:", error);
      }
    };

    fetchSentEmails();
  }, []);
  return (
    <>
      <div className="container">
        <a href="/compose">Compose new mail</a>
        <a href="/draft">Mail Draft List</a>
        <div className="mailBox">
          <h2>Sent Emails</h2>
          {sentEmails.length === 0 ? (
            <p>No mails yet</p>
          ) : (
            <ul>
              {sentEmails.map((email, index) => (
                <li key={index}>
                  <strong>From:</strong> {email.from}
                  <br />
                  <strong>To:</strong> {email.to}
                  <br />
                  <strong>Message:</strong> {email.message}
                  <br />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

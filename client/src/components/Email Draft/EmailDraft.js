import React, { useEffect, useState } from "react";
import axios from "axios";
import "./emailDraft.css";

export default function EmailDraft() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedEmail, setEditedEmail] = useState({});

  useEffect(() => {
    const fetchSavedEmails = async () => {
      try {
        const response = await axios.get("http://localhost:3001/saved-emails");
        setEmails(response.data);
      } catch (error) {
        console.error("Error fetching saved emails:", error);
      }
    };

    fetchSavedEmails();
  }, []);

  const handleEditClick = (email) => {
    setSelectedEmail(email);
    setEditedEmail(email); 
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmail({ ...editedEmail, [name]: value }); 
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/save-email", {
        from: editedEmail.from,
        to: editedEmail.to,
        message: editedEmail.message,
      });
      console.log("Email saved successfully");
      closeModal(); 
    } catch (error) {
      console.error("Error saving email:", error);
    }
  };
  

  const handleSend = async (e) =>{
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/send-email", {
        from: editedEmail.from,
        to: editedEmail.to,
        message: editedEmail.message,
      });
      console.log("Email sent and saved successfully");
      closeModal(); 
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  const closeModal = () => {
    setSelectedEmail(null);
    setEditedEmail({}); 
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="saved-emails-container">
        <h2 className="saved-emails-header">Saved Emails</h2>
        <ul className="saved-emails-list">
          {emails.map((email, index) => (
            <li key={index} className="saved-email">
              <strong>From:</strong> {email.from}
              <br />
              <strong>To:</strong> {email.to}
              <br />
              <strong>Message:</strong> {email.message}
              <br />
              <div className="email-buttons">
                <button onClick={() => handleEditClick(email)}>Edit</button>
                <button>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Edit Email</h2>
            <label>
              From:
              <input
                type="text"
                name="from"
                value={editedEmail.from || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              To:
              <input
                type="text"
                name="to"
                value={editedEmail.to || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Message:
              <textarea
                name="message"
                value={editedEmail.message || ""}
                onChange={handleInputChange}
              />
            </label>
            <div className="email-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleSend}>Send</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

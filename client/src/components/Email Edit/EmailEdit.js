import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditEmail() {
  const { index } = useParams();
  const [email, setEmail] = useState({});

  useEffect(() => {
    const fetchEmailData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/saved-emails/${index}`);
        setEmail(response.data);
      } catch (error) {
        console.error("Error fetching email data:", error);
      }
    };

    fetchEmailData();
  }, [index]);

  return (
    <div>
      <h2>Edit Email</h2>
      <p>From: {email.from}</p>
      <p>To: {email.to}</p>
      <p>Message: {email.message}</p>
      <form>
        {/* Input fields for editing email data */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

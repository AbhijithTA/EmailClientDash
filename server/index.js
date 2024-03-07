const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect("mongodb://0.0.0.0:27017/email_client_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

//schema for sended emails

const EmailSchema = new mongoose.Schema({
  from: String,
  to: String,
  message: String,
});

const Email = mongoose.model("EmailSended", EmailSchema);

////

//schema for saving email

const SavedEmailSchema = new mongoose.Schema({
  from: String,
  to: String,
  message: String,
});

const SavedEmail = mongoose.model("SavedEmail", SavedEmailSchema);

app.use(bodyParser.json());

//endpoint to save email sended
app.post("/send-email", async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const newEmail = new Email({
      from,
      to,
      message,
    });
    await newEmail.save();
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
///

//endpoint for email saving

app.post("/save-email", async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const newSavedEmail = new SavedEmail({
      from,
      to,
      message,
    });
    await newSavedEmail.save();
    res.status(200).json({ message: "Email saved successfully" });
  } catch (error) {
    console.error("Error saving email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
///

//endpoint for fetching the saved mails
app.get("/saved-emails", async (req, res) => {
  try {
    const savedEmails = await SavedEmail.find();
    res.status(200).json(savedEmails);
  } catch (error) {
    console.error("Error fetching saved emails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
///

// Endpoint to fetch sent emails
app.get("/sent-emails", async (req, res) => {
    try {
      const sentEmails = await Email.find();
      res.status(200).json(sentEmails);
    } catch (error) {
      console.error("Error fetching sent emails:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  ///

  // GET endpoint to fetch specific email data by index
app.get("/saved-emails/:index", async (req, res) => {
  try {
    const index = req.params.index;
    const email = await Email.findOne({ index }); 
    if (!email) {
      return res.status(404).json({ message: "Email not found" });
    }
    res.status(200).json(email);
  } catch (error) {
    console.error("Error fetching email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import "./App.css";
import EmailCompose from "./components/Email Compose/EmailCompose";
import EmailDash from "./components/Email Dashboard/EmailDash";
import EmailDraft from "./components/Email Draft/EmailDraft";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditEmail from "./components/Email Edit/EmailEdit";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<EmailDash />} />
          <Route path="/compose" element={<EmailCompose />} />
          <Route path="/draft" element={<EmailDraft />} />
          <Route path="/edit-email/:index" element={<EditEmail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

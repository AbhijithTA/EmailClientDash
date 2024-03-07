import "./App.css";
import EmailCompose from "./components/Email Compose/EmailCompose";
import EmailDash from "./components/Email Dashboard/EmailDash";
import EmailDraft from "./components/Email Draft/EmailDraft";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<EmailDash />} />
          <Route path="/compose" element={<EmailCompose />} />
          <Route path="/draft" element={<EmailDraft />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;

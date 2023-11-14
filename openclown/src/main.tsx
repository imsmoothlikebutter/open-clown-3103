import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchComponent from "./components/SearchComponent";
import ResultComponent from "./components/ResultComponent"; // Assuming you have this component
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<SearchComponent />} />
        <Route path="/results" element={<ResultComponent />} />
      </Routes>
    </React.StrictMode>
  </Router>
);

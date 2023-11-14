import React, { useState, FormEvent } from "react";
import "./SearchComponent.css";
import ResultComponent from "./ResultComponent";
import { useNavigate } from "react-router-dom";

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [xssInputValidated, setXSSInputValidated] = useState<boolean>(false);
  const [sqlInputValidated, setSQLInputValidated] = useState<boolean>(false);

  const navigate = useNavigate();

  const encodeHTML = (str: string) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const xssValidated = (input: string) => {
    // Adjusted regex to focus on typical XSS attack vectors
    // This pattern looks for script tags or javascript: pseudo-protocol
    const forbiddenPatterns = /(<script.*?>.*?<\/script>|javascript:)/i;

    return !forbiddenPatterns.test(input);
  };

  const sqlInjectionValidated = (input: string) => {
    // Simpler regular expression to detect basic SQL injection attempts
    // This pattern looks for single quotes, double quotes, semicolons, and comments
    const forbiddenPatterns = /('|"|;|--|\b(OR|AND)\b)/i;

    return !forbiddenPatterns.test(input);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!xssValidated(searchTerm)) {
      // console.error("Invalid input: Potential XSS detected.");
      setSearchTerm(""); // Clear the input field
      return;
    }

    if (!sqlInjectionValidated(searchTerm)) {
      // console.error("Invalid input: Potential SQL Injection detected.");
      setSearchTerm(""); // Clear the input field
      return;
    }

    // If input passes both validations, encode special characters
    const sanitizedSearchTerm = encodeHTML(searchTerm);
    // Navigate to the results page with the sanitized search term
    navigate("/results", { state: { searchTerm: sanitizedSearchTerm } });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          id="searchInput"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
          className="search-input" // Add the input style
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;

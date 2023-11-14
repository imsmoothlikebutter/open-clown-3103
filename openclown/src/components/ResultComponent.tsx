import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchComponent.css"; // You might want to rename this CSS file if it's used by multiple components

const ResultComponent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the state passed from the navigate function
  const { searchTerm } = location.state as { searchTerm: string };

  const handleBackToSearch = () => {
    navigate("/"); // Assuming your SearchComponent is at the root path
  };

  return (
    <div className="container">
      <h2>Search Term: {searchTerm}</h2> {/* Display the passed search term */}
      <button onClick={handleBackToSearch} className="search-button">
        Back to Search
      </button>
    </div>
  );
};

export default ResultComponent;

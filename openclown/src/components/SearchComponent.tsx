import React, { useState, FormEvent } from "react";

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Handle the search logic here
    console.log("Search Term:", searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
        />
        <button type="submit">Search</button>
      </form>
      <h2>{searchTerm}</h2>
    </div>
  );
};

export default SearchComponent;

// src/components/SearchResults.js
import React, { useState } from "react";
import axios from "axios";

function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${searchQuery}`,
        {
          headers: {
            Authorization: "Client-ID YOUR_UNSPLASH_ACCESS_KEY",
          },
        }
      );
      setResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <input
          type="text"
          placeholder="Search by enter..."
          className="w-full p-2 border rounded focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
      <div className="container mx-auto p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {results.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;

import React, { useState } from "react";
import NavBar from "./NavBar";
import PhotoCard from "./PhotoCard";

function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with your Google API key
  const CX = "YOUR_CUSTOM_SEARCH_ENGINE_ID"; // Replace with your Custom Search Engine ID

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&key=${GOOGLE_API_KEY}&cx=${CX}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Extract image results from the data (modify this according to the API response structure)
      const imageResults = data.items.filter(
        (item) => item.pagemap && item.pagemap.cse_image
      );

      setResults(imageResults);
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
        {results.map((photo, index) => (
          <PhotoCard key={index} photo={photo} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;

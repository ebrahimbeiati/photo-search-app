import React, { useState } from "react";
import NavBar from "./NavBar";
import PhotoCard from "./PhotoCard";
import axios from "axios";

function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const GOOGLE_API_KEY = process.env.REACT_APP_API_KEY;
  const CX = process.env.REACT_APP_SEARCH_ENGINE_ID;

  const handleSearch = async () => {
    try {
      setError(null); // Clear any previous errors

      // Make the API request
      const response = await axios.get(
        "https://www.googleapis.com/customsearch/v1",
        {
          params: {
            key: GOOGLE_API_KEY,
            cx: CX,
            q: encodeURIComponent(searchQuery),
          },
        }
      );

      if (response.status === 200) {
        // Check if the response contains an 'items' array
        if (response.data.items && Array.isArray(response.data.items)) {
          // Extract image results from the data
          const imageResults = response.data.items.map((item) => ({
            src: item.pagemap.cse_image[0].src,
            alt: item.title,
          }));

          setResults(imageResults); // Update the results state with imageResults
        } else {
          throw new Error("Invalid response data format");
        }
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        "An error occurred while fetching data. Please try again later."
      );
    }
  };

  // Added this function to handle empty results
  const handleEmptyResults = () => {
    if (results.length === 0) {
      return <p className="text-gray-500">No results found.</p>;
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
      {error && <p className="text-red-500">{error}</p>}
      <div className="container mx-auto p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {results.length > 0 &&
          results.map((photo, index) => (
            <PhotoCard key={index} photo={photo} />
          ))}
        {handleEmptyResults()}
      </div>
    </div>
  );
}

export default SearchResults;

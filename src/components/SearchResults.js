import React, { useState } from "react";
import NavBar from "./NavBar";
import PhotoCard from "./PhotoCard";
import axios from "axios";

function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const GOOGLE_API_KEY = "AIzaSyBjuEER8jiiNtseBMMiRS8hth0Bfm-ziD8"; // Replace with your Google API key
  const CX = "AIzaSyCf_kFGKYYj2fvIsgiUFQ7QvNcF316AuYE"; // Replace with your Custom Search Engine ID
const handleSearch = async () => {
  try {
    setError(null); // Clear any previous errors

    // Construct the API URL and log it
    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${CX}&q=${encodeURIComponent(
      searchQuery
    )}`;
    console.log(apiUrl); // Log the API URL

    // Make the API request
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      // Check if the response contains an 'items' array
      if (response.data.items && Array.isArray(response.data.items)) {
        // Extract image results from the data (modify this according to the API response structure)
        const imageResults = response.data.items.filter(
          (item) => item.pagemap && item.pagemap.cse_image
        );

        setResults(imageResults);
      } else {
        throw new Error("Invalid response data format");
      }
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
    setError("An error occurred while fetching data. Please try again later.");
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
        {results.map((photo, index) => (
          <PhotoCard key={index} photo={photo} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;

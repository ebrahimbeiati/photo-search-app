// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" components={Home} />{" "}
        {/* Render the Home component for the root route */}
        <Route path="/search" components={SearchResults} />
      </Routes>
    </Router>
  );
}

export default App;

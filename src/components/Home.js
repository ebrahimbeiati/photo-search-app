// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen"> 
    <Link to="/search" className="mt-8 text-white text-lg underline">
      <button className="bg-red-500 text-white shadow-lg p-4 rounded-full">
        Play
      </button>
      <p className="mt-4 text-black text-lg">Tap to start</p>
      </Link>
    </div>
  );
}

export default Home;

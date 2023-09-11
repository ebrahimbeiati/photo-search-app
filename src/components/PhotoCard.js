// src/components/PhotoCard.js
import React from "react";

function PhotoCard({ photo }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <img src={photo.urls.small} alt={photo.alt_description} />
      <p className="text-gray-600 mt-2">Photo by {photo.user.name}</p>
    </div>
  );
}

export default PhotoCard;

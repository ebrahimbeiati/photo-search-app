import React from "react";

function PhotoCard({ photo }) {
  if (
    !photo ||
    !photo.pagemap ||
    !photo.pagemap.cse_image ||
    !photo.pagemap.cse_image[0] ||
    !photo.pagemap.cse_image[0].src ||
    !photo.alt
  ) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <img src={photo.pagemap.cse_image[0].src} alt={photo.alt} />
      <p className="text-gray-600 mt-2">Photo by {photo.title}</p>
    </div>
  );
}

export default PhotoCard;

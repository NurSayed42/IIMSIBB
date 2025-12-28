// src/components/admin/PhotoViewer.js
import React, { useState } from 'react';

const PhotoViewer = ({ photos, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative max-w-4xl max-h-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
        >
          ✕
        </button>

        {/* Navigation buttons */}
        {photos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ‹
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ›
            </button>
          </>
        )}

        {/* Photo */}
        <div className="flex items-center justify-center h-screen p-4">
          <img
            src={currentPhoto?.url}
            alt={currentPhoto?.name}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              console.error('Failed to load image:', currentPhoto?.url);
              e.target.src = 'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Image+Not+Found';
            }}
          />
        </div>

        {/* Photo info */}
        <div className="absolute bottom-4 left-0 right-0 text-white text-center">
          <div className="bg-black bg-opacity-50 inline-block px-4 py-2 rounded-lg">
            <div className="font-semibold">{currentPhoto?.name}</div>
            <div className="text-sm opacity-75">
              {currentIndex + 1} of {photos.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoViewer;
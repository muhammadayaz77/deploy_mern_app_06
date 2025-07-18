import React, { useState, useRef } from 'react';

// react icons
import { FcRemoveImage } from "react-icons/fc";


const SendNotification = () => {
  const [message, setMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    URL.revokeObjectURL(updatedImages[index].preview);
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('message', message);
    
    selectedImages.forEach((image, index) => {
      formData.append(`images[${index}]`, image.file);
    });

    console.log('Submitting:', { message, images: selectedImages });
    setMessage('');
    setSelectedImages([]);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-md mx-auto p-5 border border-gray-200 rounded-lg bg-gray-50 shadow-sm mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Send Notification</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your notification message here..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Images:</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            multiple
            className="hidden"
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Images
          </button>
        </div>

        {selectedImages.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img 
                  src={image.preview} 
                  alt={`Preview ${index}`} 
                  className="w-full h-full object-cover rounded-md border border-gray-200"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 focus:outline-none"
                  onClick={() => handleRemoveImage(index)}
                  title="Remove image"
                >
                  <FcRemoveImage />
                </button>
              </div>
            ))}
          </div>
        )}

        <button 
          type="submit" 
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Send Notification
        </button>
      </form>
    </div>
  );
};

export default SendNotification;
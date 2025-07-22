import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FcRemoveImage } from "react-icons/fc";
import { SEND_NOTIFICAITON_API_ENDPOINT } from '../../../../utils/constants';

const SendNotification = () => {
  const [message, setMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('message', JSON.stringify(message));
      
      if (selectedImages.length > 0) {
        formData.append('image', selectedImages[0].file);
      }
  
      const response = await axios.post(
        SEND_NOTIFICAITON_API_ENDPOINT,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );
  
      console.log(response.data);
      setMessage('');
      setSelectedImages([]);
      // window.toastify(response.data.message, 'success');
    } catch (err) {
      console.error(err);
      // window.toastify(err.response?.data?.message || 'Error sending notification', 'error');
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
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
            disabled={loading}
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
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
                  className={`absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 focus:outline-none cursor-pointer ${loading ? 'cursor-not-allowed' : ''}`}
                  onClick={() => !loading && handleRemoveImage(index)}
                  title="Remove image"
                  disabled={loading}
                >
                  <FcRemoveImage />
                </button>
              </div>
            ))}
          </div>
        )}

        <button 
          type="submit" 
          className={`w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 relative overflow-hidden cursor-pointer ${
            loading ? 'cursor-wait' : ''
          }`}
          disabled={loading}
        >
          <span className={`flex items-center justify-center transition-all duration-300 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}>
            Send Notification
          </span>
          
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="loader">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          )}
        </button>
      </form>

      <style jsx>{`
        .loader {
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default SendNotification;
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NotificationPanel = () => {
  const { notifications } = useSelector(store => store.notification);
  const navigate = useNavigate();

  // Function to calculate time difference
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const diffInSeconds = Math.floor((now - createdAt) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }
    
    return 'Just now';
  };

  // Handle click on notification - opens image in new tab
  const handleNotificationClick = (imageUrl) => {
    if (imageUrl) {
      window.open(imageUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 bg-gray-50 rounded-xl shadow-md overflow-hidden p-6 font-sans">
      <h2 className="text-2xl font-bold text-gray-800 pb-3 mb-6 border-b border-gray-200">
        Notifications
        <span className='block text-sm font-light'>Latest updates and announcements</span>
      </h2>
      
      {!notifications || notifications.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No notifications available</p>
          <p className="text-gray-400 mt-2">New notifications will appear here</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {notifications.map(notification => (
            <li 
              key={notification._id}
              className="bg-white rounded-xl shadow-sm transition-all duration-300 overflow-hidden
                hover:shadow-lg hover:-translate-y-1 hover:border-l-4 hover:border-blue-500
                active:scale-[0.98] active:shadow-md cursor-pointer"
              onClick={() => handleNotificationClick(notification.notificationImage)}
            >
              <div className="flex">
                {/* Image Section (Left Side) */}
                <div className="w-2/5 min-h-[200px] overflow-hidden">
                  <img 
                    src={notification.notificationImage || '/no-image.jpg'} 
                    alt="Notification" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/600x400/gray/white?text=Image+Error';
                    }}
                  />
                </div>
                
                {/* Text Content (Right Side) */}
                <div className="w-3/5 p-6 flex flex-col">
                  <div className="mt-auto">
                    <p className="text-gray-800 text-lg font-medium mb-2 group-hover:text-blue-600 transition-colors">
                      {notification.message || 'Image notification'}
                    </p>
                    <span className="text-sm text-gray-500">
                      {getTimeAgo(notification.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPanel;
import React from 'react';
import useGetAllNotifications from '../../../../custom-hooks/useGetAllNotifications';
import { useDispatch, useSelector } from 'react-redux';
import { setRemoveNotification } from '../../../../redux/Slices/notificationSlice';
import axios from 'axios';
import { REMOVE_NOTIFICAITON_API_ENDPOINT } from '../../../../utils/constants';

const NotificationPanel = () => {
  const notifications = useSelector(store => store.notification.notifications);
  const dispatch = useDispatch();
  useGetAllNotifications();
  console.log("Notifications manage panel : ",notifications)

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

  // Handle Delete Button

  let handleDelete = async (id) => {
    console.log('hi')
    // dispatch(setRemoveNotificationPanel(id));
    await axios.post(`${REMOVE_NOTIFICAITON_API_ENDPOINT}/${id}`,{},{
      withCredentials : true
    })
    .then(res => {
      window.toastify(res.data.message,'success')
      dispatch(setRemoveNotification(id));
    })
    .catch(err => {
      window.toastify(err.response.data.message || 'Internal server error','error')
    })
  }
  return (
    <div className="max-w-3xl mx-auto my-8 bg-gray-50 rounded-xl shadow-md overflow-hidden p-6 font-sans">
      <h2 className="text-2xl font-bold text-gray-800 pb-3 mb-6 border-b border-gray-200">
        Admin Notifications
        <span className='block text-sm font-light'>You can manage notifications</span>
      </h2>
      
      {!notifications || notifications.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No notifications available</p>
          <p className="text-gray-400 mt-2">New notifications will appear here</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {notifications.slice().reverse().map(notification => (
            <li 
              key={notification._id} 
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="flex">
                {/* Large Image (Left Side) */}
                <div className="w-2/5 min-h-[200px] overflow-hidden">
                  <img 
                    src={notification.notificationImage ? notification.notificationImage : '/no-image.jpg'} 
                    alt="Notification" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                    }}
                  />
                  
                </div>
                
                {/* Message Content (Right Side) */}
                <div className="w-3/5 p-6 flex flex-col">
                  {/* Spacer to push content down */}
                  <div className="flex-grow"></div>
                  
                  <div className="mt-auto">
                    <p className="text-gray-800 text-lg font-medium mb-2">{notification.message == '' ? '' : notification.message}</p>
                    <span className="text-sm text-gray-500">
                      {getTimeAgo(notification.createdAt)}
                    </span>
                  </div>
                </div>
                
                {/* Delete Button - Top Right */}
                <button 
                  onClick={() => handleDelete(notification._id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:bg-red-50 group/delete cursor-pointer"
                  aria-label="Delete notification"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-gray-400 group-hover/delete:text-red-500 transition-colors duration-200"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/delete:opacity-100 transition-opacity duration-200">
                    Remove
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPanel;
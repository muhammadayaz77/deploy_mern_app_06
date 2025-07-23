import React from 'react';

const NotificationUI = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">School Notifications</h1>
      
      <div className="space-y-4">
        {/* Image Notification (with constrained dimensions) */}
        <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
            <img 
              src="https://placehold.co/600x400/3b82f6/white?text=Event" 
              alt="Event"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-gray-800 truncate">Sports Day Announcement</h3>
              <span className="text-sm text-gray-500 whitespace-nowrap pl-2">Today, 10:30 AM</span>
            </div>
            <p className="text-gray-600 text-sm">
              Annual sports day will be held next Friday. All students must participate.
            </p>
          </div>
        </div>

        {/* Text-only Notification */}
        <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center">
            <span className="text-gray-400 text-2xl">📢</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-gray-800 truncate">Exam Schedule</h3>
              <span className="text-sm text-gray-500 whitespace-nowrap pl-2">May 15, 9:00 AM</span>
            </div>
            <p className="text-gray-600 text-sm">
              Mid-term exams begin next Monday. The schedule has been posted.
            </p>
          </div>
        </div>

        {/* Large Image Notification (constrained to same size) */}
        <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
            <img 
              src="https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Basketball"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-gray-800 truncate">Basketball Tournament</h3>
              <span className="text-sm text-gray-500 whitespace-nowrap pl-2">May 18, 3:00 PM</span>
            </div>
            <p className="text-gray-600 text-sm">
              Inter-school basketball competition next month. Register with sports department.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationUI;
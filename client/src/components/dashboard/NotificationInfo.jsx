"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, X } from "lucide-react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function NotificationInfo() {
  const [activeTab, setActiveTab] = useState("notification")
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { notifications } = useSelector((store) => store.notification)

  const getTimeAgo = (dateString) => {
    const now = new Date()
    const createdAt = new Date(dateString)
    const diffInSeconds = Math.floor((now - createdAt) / 1000)

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    }

    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / seconds)
      if (interval >= 1) {
        return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`
      }
    }

    return "Just now"
  }

  const handleViewAllNotifications = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate("/student/notifications")
    // This line closes the popover with smooth animation
    setIsOpen(false)
  }

  const handleBellClick = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="flex items-center justify-center max-h-screen">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-transparent"
            onClick={handleBellClick}
          >
            <Bell className="w-5 h-5 text-black" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-xs text-white font-bold">{notifications.length}</span>
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-100 p-0"
          align="end"
          // This prop was removed to allow closing when clicking outside
          // onInteractOutside={(e) => { e.preventDefault() }}
          onEscapeKeyDown={(e) => {
            // Allows closing with Escape key
            setIsOpen(false)
          }}
        >
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border">
            {/* Header with tabs */}
            <div className="flex border-b bg-gray-50">
              <button
                onClick={() => setActiveTab("notification")}
                className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-300 relative ${
                  activeTab === "notification"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:cursor-pointer"
                }`}
              >
                NOTIFICATIONS
                {activeTab === "notification" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("alert")}
                className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-300 relative ${
                  activeTab === "alert"
                    ? "bg-red-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:cursor-pointer"
                }`}
              >
                ALERT
                {activeTab === "alert" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600"></div>}
              </button>
              {/* Close button */}
              <button
                onClick={handleClose}
                className="px-3 py-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200 rounded-tr-lg hover:cursor-pointer"
                title="Close notifications"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content area */}
            <div className="relative h-80 overflow-hidden">
              {/* Notification content */}
              <div
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  activeTab === "notification" ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="p-2 h-full overflow-y-auto">
                  {notifications && notifications.length > 0 ? (
                    notifications.slice().reverse().map((notification, index) => (
                      <div
                        key={notification._id}
                        className={`flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] border-b border-gray-100 last:border-b-0 ${
                          activeTab === "notification" ? "animate-in slide-in-from-left" : ""
                        }`}
                        style={{
                          animationDelay: activeTab === "notification" ? `${index * 100}ms` : "0ms",
                        }}
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={notification.notificationImage || "/no-image.jpg"}
                            alt="notification"
                            className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200 transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 leading-relaxed mb-1">
                            {notification.message.split(/\s+/).slice(0, 10).join(" ")}
                            {notification.message.split(/\s+/).length > 10 ? "..." : ""}
                          </p>
                          <p className="text-xs text-gray-500 font-medium">{getTimeAgo(notification.createdAt)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Bell className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                      <p className="text-sm text-gray-500 text-center">
                        {"You're all caught up! No notifications at the moment."}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Alert content - Empty animated div */}
              <div
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  activeTab === "alert" ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex flex-col items-center justify-center h-full p-8">
                  <div
                    className={`w-full max-w-xs transition-all duration-700 ease-out ${
                      activeTab === "alert"
                        ? "animate-in zoom-in-50 slide-in-from-right-5"
                        : "animate-out zoom-out-50 slide-out-to-right-5"
                    }`}
                  >
                    {/* Empty animated div */}
                    <div className="w-full h-32 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg border-2 border-dashed border-red-300 flex items-center justify-center mb-4 animate-pulse">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-200 rounded-full mx-auto mb-2 animate-bounce"></div>
                        <div className="w-20 h-2 bg-red-200 rounded mx-auto mb-1"></div>
                        <div className="w-16 h-2 bg-red-200 rounded mx-auto"></div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No Alerts</h3>
                      <p className="text-sm text-gray-500">All clear! No alerts to display at the moment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 p-3">
              <Button
                variant="ghost"
                className="w-full text-sm hover:bg-gray-100 transition-colors duration-200 hover:cursor-pointer"
                onClick={activeTab === "notification" ? handleViewAllNotifications : undefined}
              >
                {activeTab === "notification" ? "View all notifications" : "View all alerts"}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

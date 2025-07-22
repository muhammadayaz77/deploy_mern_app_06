

import axios from "axios";
import { useEffect, useState } from "react";
import { GET_ALL_ADMIN_API_ENDPOINT, MANAGE_NOTIFICAITON_API_ENDPOINT } from "../utils/constants";
import { setAllAdmin } from "../redux/Slices/adminSlice";
import { useDispatch } from "react-redux";
import { setAllNotification } from "../redux/Slices/notificationSlice";

function useGetAllNotifications() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let dispatch = useDispatch()

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(MANAGE_NOTIFICAITON_API_ENDPOINT, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          signal // Add abort signal for cleanup
        });
        
        if (response.data.success) {

          console.log('notification : ',response)
          dispatch(setAllNotification(response.data.data))
          // console.log('get admins res : ',response);
        } else {
          setError(new Error(response.data.message || 'Failed to fetch admins'));
          console.log(response)
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
          console.error('Error fetching admins:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // Cleanup function to cancel the request if component unmounts
    return () => controller.abort();
  }, []); // Empty dependency array means this runs once on mount

  return { loading, error };
}

export default useGetAllNotifications;
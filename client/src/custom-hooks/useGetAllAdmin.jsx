import axios from "axios";
import { useEffect, useState } from "react";
import { GET_ALL_ADMIN_API_ENDPOINT } from "../utils/constants";

function useGetAllAdmin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const response = await axios.get(GET_ALL_ADMIN_API_ENDPOINT, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          signal // Add abort signal for cleanup
        });
        
        if (response.data.success) {
          setAdmins(response.data.data);
          console.log(response)
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

    fetchAdmins();

    // Cleanup function to cancel the request if component unmounts
    return () => controller.abort();
  }, []); // Empty dependency array means this runs once on mount

  return { admins, loading, error };
}

export default useGetAllAdmin;
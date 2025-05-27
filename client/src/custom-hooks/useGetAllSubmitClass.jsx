import axios from "axios";
import { useEffect, useState } from "react";
import { GET_SUBMIT_CLASSES_API_ENDPOINT } from "../utils/constants";
import { useDispatch } from "react-redux";
import { getAllSubmitClass } from "../redux/Slices/adminSlice";

function useGetAllSubmitClass() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let dispatch = useDispatch()

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const response = await axios.get(GET_SUBMIT_CLASSES_API_ENDPOINT, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          signal // Add abort signal for cleanup
        });
        
        if (response.data.success) {
          // dispatch(setAllAdmin(response.data.data));
          console.log("class : ",response.data.data)
          dispatch(getAllSubmitClass(response.data.data));
          // console.log('get submit class res : ',response);
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

  return { loading, error };
}

export default useGetAllSubmitClass;
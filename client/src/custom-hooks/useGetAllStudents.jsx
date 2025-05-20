import axios from "axios";
import { useEffect, useState } from "react";
import { GET_ALL_ADMIN_API_ENDPOINT, GET_CLASS_TEACHER_API_ENDPOINT, GET_STUDENT_API_ENDPOINT } from "../utils/constants";
import { setAllClasses, setAllTeachers } from "../redux/Slices/adminSlice";
import { useDispatch } from "react-redux";
import { setAllStudents } from "../redux/Slices/teacherSlice";

function useGetAllStudents() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let dispatch = useDispatch()

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(GET_STUDENT_API_ENDPOINT, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          signal // Add abort signal for cleanup
        });
        
        if (response.data.success) {
          console.log(response);

          dispatch(setAllStudents(response.data.students));
          
          // dispatch(setAllClasses(response.data.data.classes))
          console.log('get admins res : ',response.data.students);
        } else {
          setError(new Error(response.data.message || 'Failed to fetch admins'));
          console.log('err res : ',response);
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

    fetchData();

    // Cleanup function to cancel the request if component unmounts
    return () => controller.abort();
  }, []); // Empty dependency array means this runs once on mount

  return { loading, error };
}

export default useGetAllStudents;
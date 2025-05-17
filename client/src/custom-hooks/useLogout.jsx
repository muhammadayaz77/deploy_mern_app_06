import axios from 'axios';
import { LOGOUT_API_ENDPOINT } from '../utils/constants';

const useLogout = () => {
  const logout = () => {
    return axios.post(
      LOGOUT_API_ENDPOINT,
      {}, // Empty request body
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
    );
  };

  return logout;
};

export default useLogout;
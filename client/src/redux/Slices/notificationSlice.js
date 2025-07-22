// teacherSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setAllNotification: (state, action) => {
      state.notifications = action.payload;
      console.log(state.notifications)
    },
    setRemoveNotification: (state, action) => {
      console.log('slice ',state.notifications)
      // state.notifications = state.notifications.filter(item => !action.payload.includes(item._id));
    }
  },
});

export const { setAllNotification,setRemoveNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
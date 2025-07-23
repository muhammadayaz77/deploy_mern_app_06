// notificationSlice.js
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
      console.log('all notif : ',state.notifications)
    },
    setRemoveNotification: (state, action) => {
      console.log('slice remove not : ',state.notifications)
      // state.notifications.map(it => console.log(it._id))
      state.notifications = state.notifications.filter(item => !action.payload.includes(item._id));
    },
  },
});

export const { setAllNotification,setRemoveNotification,setRemoveNotificationPanel } = notificationSlice.actions;
export default notificationSlice.reducer;
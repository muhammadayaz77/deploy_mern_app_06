// teacherSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setAllNotification: (state, action) => {
      state.notification = action.payload;
    },
    // setRemoveApproveStudents: (state, action) => {
    //   state.students = state.students.filter(item => !action.payload.includes(item._id));
    // }
  },
});

export const { setAllNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
// teacherSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setAllStudents: (state, action) => {
      state.students = action.payload;
    },
    setRemoveAllStudents: (state) => {
      state.students = [];
    },
    setRemoveApproveStudents: (state, action) => {
      state.students = state.students.filter(item => !action.payload.includes(item._id));
    }
  },
});

export const { setAllStudents, setRemoveAllStudents, setRemoveApproveStudents } = teacherSlice.actions;
export default teacherSlice.reducer;
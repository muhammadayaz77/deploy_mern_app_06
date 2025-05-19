import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  student: [],
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setAllStudents : (state,action) => {
      state.students = action.payload;
    },
  },
});

export const { setAllStudents } = teacherSlice.actions;
export default teacherSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setAllStudents : (state,action) => {
      state.students = action.payload;
    },
    
    setRemoveAllStudents : (state) => {
      state.students = [];
    }
  },
});

export const { setAllStudents,setRemoveAllStudents } = teacherSlice.actions;
export default teacherSlice.reducer;
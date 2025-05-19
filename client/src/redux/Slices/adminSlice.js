import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: [],
  teachers : [],
  classes : [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAllAdmin: (state, action) => {
      state.user = action.payload;
    },
    setRemoveAdmin : (state,action) => {
      state.user = state.user.filter(item => item._id !== action.payload);

    },
    setRemoveData : (state,action) => {
      state.user = [];
    },
    setAddAdmin : (state,action) => {
      state.user.push(action.payload)
    },
    setAllTeachers : (state,action) => {
      state.teachers = action.payload;
    },
    setAllClasses : (state,action) => {
      state.classes = action.payload;
    },
  },
});

export const { setAllAdmin,setRemoveAdmin,setRemoveData,setAddAdmin,setAllTeachers,setAllClasses } = adminSlice.actions;
export default adminSlice.reducer;
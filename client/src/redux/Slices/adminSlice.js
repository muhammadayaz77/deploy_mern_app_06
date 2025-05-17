import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAllAdmin: (state, action) => {
      state.user = action.payload;
    },
    setRemoveAdmin : (state,action) => {
      state.user.filter(item => item._id == action.payload)
    },
    setRemoveData : (state,action) => {
      state.user = [];
    }
  },
});

export const { setAllAdmin,setRemoveAdmin,setRemoveData } = adminSlice.actions;
export default adminSlice.reducer;
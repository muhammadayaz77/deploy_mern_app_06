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
      state.user = state.user.filter(item => item._id !== action.payload);

    },
    setRemoveData : (state,action) => {
      state.user = [];
    },
    setAddAdmin : (state,action) => {

      state.user.push(action.payload)
    }
  },
});

export const { setAllAdmin,setRemoveAdmin,setRemoveData,setAddAdmin } = adminSlice.actions;
export default adminSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

//create the initial state for the user slice
const initialState = {
  currentUser: null,
  error: null,
loading: false,

}
//create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //set signin start logic
    signInStart: (state) => {
        state.loading = true;
        state.error = null;
    },
    //set signin success logic
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; //user data is the payload
      state.loading = false;
      state.error = null;
      
    },
    //set signin failure logic
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
//export the user slice
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
//export the user reducer
export default userSlice.reducer;
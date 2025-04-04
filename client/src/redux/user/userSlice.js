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
    //update user logic
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // delete account
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSucess:(state,action)=>{
      //when delete to remove the user completely
      state.currentUser = null;
      state.loading = false;
      state.error=null;

    },
    deleteUserFailure:(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    },
  },
});
//export the user slice
export const { signInStart, signInSuccess, signInFailure,updateStart,updateSuccess,updateFailure,deleteUserStart,deleteUserSucess,deleteUserFailure } = userSlice.actions;
//export the user reducer
export default userSlice.reducer;
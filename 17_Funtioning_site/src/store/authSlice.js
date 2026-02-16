import { createSlice } from "@reduxjs/toolkit";
import Login from "../../../13_CoxtextApi/ContextApi_Basic_Code/src/conponents/LogIn";

const initialState = {
    status: false,
    userData: null,
}

const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers:{
            Login: (action,state) => {
                state.status = true;
                state.userData = action.payload.userData;
            },
            Logout: (state) => {
                state.status = false,
                state.userData = null
            }
        }

    }
)

export default authSlice.reducer;
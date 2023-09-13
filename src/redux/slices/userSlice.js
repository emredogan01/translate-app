import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../actions/userActions";

const initialState={
    users: [],
    isLoading: true,
    isError: false,
}

const userSlice= createSlice({
    name: "users",
    initialState,
    // ! thunk aksiyonlarını yönetmek için extraReducers kullanılıcak
    extraReducers: {
        //* henüz apiden cevap gelmediyse
        [getUsers.pending]:(state)=>{
            state.isLoading= true;
        },
        //* apiden olumlu cevap geldiyse
        [getUsers.fulfilled]: (state, action)=>{
            state.isLoading= false;
            state.users= action.payload;
            state.isError= false;
        },
        //* apiden olumsuz cevap geldiyse
        [getUsers.rejected] : (state, action)=>{
            state.isLoading= false;
            state.isError = true;
        } 
    },
})

export default userSlice.reducer; 
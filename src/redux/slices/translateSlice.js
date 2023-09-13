import { createSlice } from "@reduxjs/toolkit";
import { getLanguages, translateText } from "../actions/translateActions";

const initialState={
    // diller için
    isLoading: true,
    isErorr: false,
    languages: [],

    // çevrilen yazı için
    isAnswerLoading: false,
    isAnswerErorr: false,
    answer: "",

}

const translateSlice= createSlice({
    name: "translate",
    initialState,

    reducers:{
        clearAnswer: (state)=>{
            state.answer = ""
        }
    },

    extraReducers: {
        [getLanguages.pending]:(state) => {
            state.isLoading = true
        },
        [getLanguages.fulfilled]: (state, action)=>{
            state.languages= action.payload
            state.isLoading = false
            state.isErorr = false
        },
        [getLanguages.rejected]:(state)=>{
            state.isLoading= false
            state.isErorr= true
        },

        // çeviri aksiyonu için
        [translateText.pending]: (state)=>{
            state.isAnswerLoading = true
        },
        [translateText.fulfilled]: (state, action)=>{
            state.isAnswerLoading= false
            state.answer= action.payload
        },
        [translateText.rejected]: (state)=>{
            state.isAnswerLoading= false
            state.isAnswerErorr= true
        }
    },
})

export default translateSlice.reducer;

export const clearAnswer= translateSlice.actions.clearAnswer;
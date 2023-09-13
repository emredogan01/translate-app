/*
    ! createAsyncThunk
    ? bizden iki adet paremetre ister
    > a: aksiyonun type değeri
    > b: çalışacak fonksiyon
    > > bu async fonksiyonlar veri tabanı sorgusu yapabilir


*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers= createAsyncThunk("getUsers", async()=>{
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");

    // store aktarmak istediğimiz değerler return edilir
    return res.data

    console.log(data)
})

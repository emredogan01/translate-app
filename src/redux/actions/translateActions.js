import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constatnts/constants";

export const getLanguages = createAsyncThunk("getLanguages", async () => {
    // apiye istek
    const res = await axios.request(options)
    const data = res.data.data.languages;

    /*
        * diziyi dönüp her bir objesi için
        * value ve label objesine sahip yeni obje
        * value'lara code'u
        * labal'lara name'i eşitleyeceğiz
    */

    const refinedData = data.map((item) => ({
        value: item.code,
        label: item.name,
    }))


    // oluşturduğumuz async aksiyonu slice aktaracağı veri (payload)
    return refinedData;
})

export const translateText = createAsyncThunk("translate", async (params) => {

    // istek için ayarlar
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', params.sourceLang.value);
    encodedParams.set('target_language', params.targetLang.value);
    encodedParams.set('text', params.text);

    const options = {
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'b089d3e750msh92bc4ef67efd44ep1c5421jsn20b65af3764e',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        data: encodedParams,
    };
    // isteği atma
    const res = await axios.request(options)

    // veriyi slice'a gönderme (payload)
    return res.data.data.translatedText;
})
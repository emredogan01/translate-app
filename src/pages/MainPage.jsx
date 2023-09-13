import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLanguages, translateText,} from "../redux/actions/translateActions";
import Select from 'react-select'
import { clearAnswer } from "../redux/slices/translateSlice";
const MainPage = () => {
    const dispatch = useDispatch();
    const state = useSelector((store) => store.translateSlice)

    // çevirilecek metnin state'i 
    const [text, setText] = useState("");

    // kaynak dil state'i > ilk değeri türkçe
    const [sourceLang, setSourceLang] = useState({
        value: "tr",
        label: "Turkish"
    });

    // kaynak dil state'i ilk değeri > ingilizce
    const [targetLang, setTargetLang] = useState({
        value: "en",
        label: "English"
    });

    // uygulamanın yüklenme anında çalışır
    useEffect(()=>{
        // dilleri alır ve stora aktarır
        dispatch(getLanguages())
    },[])

    const handleChange = ()=>{
        setTargetLang(sourceLang)
        setSourceLang(targetLang)

        //inputları temizleme
        setText("")

        dispatch(clearAnswer())
    }


  return (
    <div className="main-page">
        <div className="container">
            <h1>Çeviri +</h1>
            <div className="translate-area">
                    {/* sol */}
                <div className="left">
                    <Select
                    value={sourceLang} 
                    isDisabled={state.isLoading}
                    onChange={(e)=>setSourceLang(e)}
                    isLoading={state.isLoading} 
                    className="select" 
                    options={state.languages}
                    />
                    <textarea value={text} onChange={(e)=>setText(e.target.value)}></textarea>
                </div>
                    {/* orta */}
                    <button onClick={handleChange} className="change-btn">Değiş</button>
                    {/* sağ */}
                <div className="right">
                    <Select
                    value={targetLang}
                    onChange={(e)=>setTargetLang(e)}
                    isDisabled={state.isLoading}
                    isLoading={state.isLoading}  
                    className="select" 
                    options={state.languages}
                    />
                    <textarea disabled value={!state.isAnswerLoading ? state.answer : 'Loading...'}></textarea>
                </div>
            </div>
            <button onClick={()=> dispatch(translateText({sourceLang, targetLang, text}))} className="submit-btn">Çevir</button>
        </div>
    </div>
  )
}

export default MainPage
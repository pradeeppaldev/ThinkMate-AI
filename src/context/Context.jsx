import { createContext, useState } from "react";
import checkAPI from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const  delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev+nextWord)
        }, 20*index)
    }

    const loadPrompt = async (prompt) => {
    console.log(prompt);
    
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("")   //
        setLoading(true)
        setShowResult(true)

        setPrevPrompts(prev => [...prev, prompt])
        setRecentPrompt(prompt)
        const response = await checkAPI(prompt)
        
        let responseArray = (response || "").split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("<br>")
        let newResponseArray = newResponse2.split(" ")
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setLoading(false)
        setInput("")
    }

    const contextValue = {
        prevPrompts,
        setInput,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        input,
        resultData,
        newChat,
        loadPrompt
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider
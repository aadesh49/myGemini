import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const[input, setInput] = useState("");
    const[recentPrompt, setRecentPrompt] = useState("");
    const[prevPrompt, setPrevPrompt] = useState([]);
    const[showResult, setShowResult] = useState(false);
    const[loading, setLoading] = useState(false);
    const[resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {                //this will take the index and word, after every word it will wait for 75ms
        setTimeout(function(){
            setResultData(prev => prev + nextWord);         //this will give us a typing effect
        },75*index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }
    
    const onSent = async (prompt) => {
        setInput("")
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;

        if(prompt !== undefined){                   //when we type the prompt
            response = await run(prompt);
            setRecentPrompt(prompt);
        }else{                                      //when we click prompt from recent bar
            setPrevPrompt(prev => [...prev, input])
            setRecentPrompt(input)
            response = await run(input);
        }

        //whenever we get two stars it means we have to bold that word, so we spilt the response 
        let responseArray = response.split("**");     

        let newResponse = "";
        for(let i = 0; i < responseArray.length; i++){
            if(i === 0 || i % 2 === 0){         
                newResponse += responseArray[i];
            }else{
                newResponse += "<b>" + responseArray[i] + "</b>";       //now add bold tag at odd index places
            }
        }
        let newResponse2 = newResponse.split("*").join("</br> </br>");        //br tag will take text to new line as '*' refers to newline

        let newResponseArray = newResponse2.split(" ");                 //now spilt the response at spaces and use delayPara function
        for(let i = 0; i < newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false);
        setInput("");
    }


    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput, 
        newChat
    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider

import React, { useContext, useState } from "react";
import {assets} from '../../assets/assets.js'
import { Context } from "../../context/Context.jsx";

function Sidebar () {
    const [expand, setExpand] = useState(true);
    const {onSent, prevPrompt, setRecentPrompt, newChat} = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt);
    }

    return(
        <div className="min-h-screen inline-flex flex-col justify-between bg-gray-100 py-6 px-3.5">
            <div className="top">
                <img onClick={() => setExpand(!expand)} className="w-5 block ml-2.5 cursor-pointer" src={assets.menu_icon} alt="" />
                <div onClick={() => newChat()} className="mt-2.5 inline-flex items-center gap-2.5 px-3 py-2 bg-gray-200 rounded-3xl text-sm cursor-pointer">
                    <img  className="w-5" src={assets.plus_icon} alt="" />
                    {expand ? <p className="text-gray-400">New chat</p> : null}
                </div>  
                
                {expand?  <div className="flex flex-col">
                    <p className="mt-7 mb-5">Recent</p>
                    {prevPrompt.map((item, index) => {
                        return(
                            <div onClick={() => loadPrompt(item)} className="animate-fadeIn inline-flex items-center p-2.5 pr-10 rounded-3xl cursor-pointer text-black hover:bg-gray-200">
                                <img className="w-5 mr-4" src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 18)} ...</p>
                            </div>
                        )
                    })}
                </div> : null}
            </div>

            <div className="flex flex-col">
                <div className="inline-flex items-center p-2.5 pr-10 rounded-3xl cursor-pointer text-black hover:bg-gray-200">
                    <img className="w-5 mr-4" src={assets.question_icon} alt="" />
                    {expand? <p>Help</p> : null}
                </div>
                <div className="inline-flex items-center p-2.5 pr-10 rounded-3xl cursor-pointer text-black hover:bg-gray-200">
                    <img className="w-5 mr-4" src={assets.history_icon} alt="" />
                    {expand? <p>Activity</p> : null}
                </div>
                <div className="inline-flex items-center p-2.5 pr-10 rounded-3xl cursor-pointer text-black hover:bg-gray-200">
                    <img className="w-5 mr-4" src={assets.setting_icon} alt="" />
                    {expand ? <p>Setting</p> : null}
                </div>
            </div>
        </div>
    )
} 

export default Sidebar
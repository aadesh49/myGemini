import React, { useContext } from "react";

import { assets } from "../../assets/assets";
import { Context } from "../../context/context";


export default function Main() {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)
    
    return (
        <div className="flex-1 max-h-screen pb-[15vh] relative">
            <div className="flex items-center justify-between text-2xl p-5 text-gray-900">
                <p>Gemini</p>
                <img className="w-12 h-15" src={assets.user_icon} alt="" />
            </div>
            <div className="max-w-4xl m-auto">
                {!showResult
                    ? <>
                        <div className="my-6 mx-0 text-6xl font-medium p-14">
                            <p><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-600 via-45% via-red-400 via-80% to-purple-400">Hello, Aadesh!</span></p>    {/* use the name u need */}
                        </div>
                        <div className="grid grid-cols-4 gap-3.5 p-5">
                            <div onClick={() => setInput('Suggest beautiful places to visit this winter')} className="h-48 p-3.5 rounded-xl relative bg-gray-100 hover:bg-gray-200">
                                <p className="text-gray-700">Suggest beautiful places to visit this winter</p>
                                <img className="w-11 p-1.5 absolute bg-white bottom-2.5 right-2.5" src={assets.compass_icon} alt="" />
                            </div>
                            <div onClick={() => setInput('Breify summarize the concept: carbon output')} className="h-48 p-3.5 rounded-xl relative bg-gray-100 hover:bg-gray-200">
                                <p className="text-gray-700">Breify summarize the concept: carbon output</p>
                                <img className="w-11 p-1.5 absolute bg-white bottom-2.5 right-2.5" src={assets.message_icon} alt="" />
                            </div>
                            <div onClick={() => setInput('Some energy-saving hacks')} className="h-48 p-3.5 rounded-xl relative bg-gray-100 hover:bg-gray-200">
                                <p className="text-gray-700">Some energy-saving hacks</p>
                                <img className="w-11 p-1.5 absolute bg-white bottom-2.5 right-2.5" src={assets.bulb_icon} alt="" />
                            </div>
                            <div onClick={() => setInput('Optimize the code to reduce complexity')} className="h-48 p-3.5 rounded-xl relative bg-gray-100 hover:bg-gray-200">
                                <p className="text-gray-700">Optimize the code to reduce complexity</p>
                                <img className="w-11 p-1.5 absolute bg-white bottom-2.5 right-2.5" src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </> 
                    :  <div className="p-0 max-h-[70vh] overflow-y-scroll ">    {/* result */}
                            <div className="mx-0 my-10 flex items-center gap-5">
                                <img className="w-12 h-12" src={assets.user_icon} alt="" />
                                <p>{recentPrompt}</p>
                            </div>
                            <div className="flex items-start gap-5">
                                <img className="w-18 h-16" src={assets.gemini_icon} alt="" />
                                {loading ? 
                                <div className="w-full flex flex-col gap-5 loader">
                                <hr className="h-5 bg-gradient-to-r from-blue-300 via-white to-blue-300 w-full animate-gradientSlide bg-[length:200%_200%]" />
                                <hr className="h-5 bg-gradient-to-r from-blue-300 via-white to-blue-300 w-full animate-gradientSlide bg-[length:200%_200%]" />
                                <hr className="h-5 bg-gradient-to-r from-blue-300 via-white to-blue-300 w-full animate-gradientSlide bg-[length:200%_200%]" />
                              </div>
                                :
                                <p className="text-base leading-relaxed" dangerouslySetInnerHTML={{__html:resultData}}></p>
                                }
                            </div>
                        </div>
                }

                <div className="fixed bottom-0 w-full max-w-4xl py-0 px-5 m-auto">
                <div className="flex items-center justify-between gap-5 py-2 px-4 mb-5 rounded-3xl border border-gray-400">
                    <img className="w-6 cursor-pointer" src={assets.gallery_icon} alt="Gallery" />

                    <div className="relative flex-1">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        className="w-full bg-none p-2.5 text-base border-none outline-none"
                        type="text"
                        placeholder="Ask Gemini"
                        onKeyUp={(e) => {
                            if(e.key === 'Enter' && input !== ''){
                                onSent();
                            }
                        }}
                    />
                    {input === '' ? <img
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 w-6 cursor-pointer"
                        src={assets.mic_icon}
                    /> :
                    <img
                        onClick={() => onSent()}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 w-6 cursor-pointer"
                        src={assets.send_icon}
                    />
                    }
                    
                    </div>
                </div>
                </div>

            </div>
        </div>

    )
}

import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import checkAPI from '../../config/gemini'
import { Context } from '../../context/Context'

const Main = () => {

    const { onSent, setRecentPrompt, recentPrompt, showResult, loading, resultData, setInput, input, loadPrompt } = useContext(Context);

  return (
    <div className='main'>
        <div className='nav'>
            <p>ThinkMate AI</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {
                !showResult
                ?<>

                    <div className="greet">
                <p><span>Hello, Dev...</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card" onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip")}>
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card" onClick={() => onSent("Before summarize this concept: urban planning")}>
                    <p>Before summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card" onClick={() => onSent("Brainstorm team bonding activities for our work retreat")}>
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div> 
                <div className="card" onClick={() => onSent("Improve the readability of the following code")}>
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>

                </>
                :
                <div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading
                        ?<div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :
                        <p dangerouslySetInnerHTML={{__html:resultData}}></p>
}
                    </div>
                </div>
            }
            
            <div className="main-bottom">
                <div className="search-box">
                    <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => {if(e.key == "Enter") {onSent(input)}}} type="text" placeholder='Enter a prompt here' />
                    <div className="search-icons">
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={() => onSent(input)} src={assets.send_icon} alt="" />:null}
                    </div> 
                </div>
                <p className="bottom-info">
                    ThinkMate AI may display inaccurate info, including about people, so double-check its responses. Your privacy & ThinkMate Apps
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main
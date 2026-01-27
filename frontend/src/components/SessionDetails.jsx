import { useDispatch, useSelector } from "react-redux"
import { all, recent, remove, start, stop, pause } from "../state/session/sessionThunks"
import { openCreate, initiateUpdate } from "../state/ui/uiSlice"
import { useEffect, useState } from "react"

export default function SessionDetails(){
    const dispatch = useDispatch()
    const pillColors = ["bg-[#ff4107]","bg-[#00ff84]","bg-[#ffa31a]","bg-[#7d60ff]","bg-[#ff2323]","bg-[#1a5cd6]","bg-[#a1f31d]","bg-[#18e6ca]","bg-[#ff4107]","bg-[#00ff84]","bg-[#ffa31a]","bg-[#7d60ff]","bg-[#ff2323]","bg-[#1a5cd6]","bg-[#a1f31d]","bg-[#18e6ca]"]
    const { sessions, activeSession, recentSessions } = useSelector( s => s.session)
    const { theme, createForm } = useSelector( s => s.ui)
    const { profile } =useSelector( s => s.user)
    const [formattedTags, setFormattedTags] = useState([])
    
    function randomColor() {
        const idx = Math.floor(Math.random() * 14);
        return pillColors[idx]
    }

    useEffect(() => {
        setFormattedTags([])
        if(activeSession){
            for( const tag of activeSession.tags){
                const hex = randomColor();
                setFormattedTags(prev => [...prev, {text: tag, hex: hex}])
            }
        }
        
    }, [activeSession?._id])

    function handleUpdateButton(){
        dispatch(initiateUpdate())
        dispatch(openCreate())
    }

    function handleDeleteButton(){
        dispatch(remove(activeSession?._id))
        dispatch(openCreate())
    }

    function handleStartButton(){
        if (activeSession?.status === "planned") return dispatch(start(activeSession?._id));
        dispatch(stop(activeSession?._id));
    }

    return (
        <div    
            style={{ "--bg-accent": theme.accent, "--bg-accent-hover": theme.accentHover, "--fill-primary-sticker": theme.primarySticker }}
            className={`absolute inset-0 flex flex-col h-full transform-gpu transition-all duration-500
                        ease-[cubic-bezier(0.34,1.56,0.64,1)]
                        ${!createForm
                            ? "opacity-100 pointer-events-auto delay-200" 
                            : "opacity-0 pointer-events-none"}
                        `}>
            <div className='flex justify-between '>
                <h1 className='font-black w-full  text-3xl border-b-4 px-5 py-2 bg-[var(--fill-primary-sticker)]'>Session Details</h1>
            </div>
            <h1 className='px-6 font-black text-6xl mt-3 z-5'>{activeSession?.title}</h1>
            <div className='px-6 mt-3 flex gap-4 z-5'>
                {formattedTags.map( (t,i) => (
                    <p key={i} className={`outline-[3px] shadow-[4px_4px_0px_3px_black] w-fit px-2 ${t.hex} outline-black text-black/85`}>{t.text}</p>
                ))}
            </div>

            <div className='px-6 mt-8 mb-2 flex gap-10 z-5'>
                <span className='w-55 '>
                    <p>Status:</p>
                    <p className='relative pl-2 pr-2 w-fit text-4xl'>
                        {activeSession?.status}
                        {/* <span className="text-red-600 ml-2 animate-bounce">🔥</span> */}
                    </p>
                </span>
                <span className='w-55'>
                    <p>Time:</p>
                    <p className='relative pl-2 pr-4 w-fit text-4xl'>{ activeSession?.duration < 1? 0 : activeSession?.duration}mins</p>
                </span>
            </div>

            <div className='px-6 pb-2 w-full flex flex-col gap-8 mt-auto mb-8 z-5'>
                <div className='ml-auto mr-3 w-fit flex gap-5'>
                    
                    {(activeSession?.status === "active" || activeSession?.status === "paused") && 
                        <div className="group top-1 relative hover:cursor-pointer">
                            <span className="text-transparent block h-11 w-12 text-3xl font-bold text-center select-none"></span>
                            <div
                                onClick={() => {
                                    if(activeSession?.status === "paused") return dispatch(start(activeSession?._id))
                                    return dispatch(pause(activeSession?._id))
                                    }}
                                className={`absolute top-0 left-0 group-hover:bg-[var(--bg-accent-hover)] ml-auto group-hover:translate-y-1 group-hover:translate-x-1 group-hover:cursor-pointer group-hover:shadow-[6px_6px_0px_3px_black] transition-all ease-in-out duration-50 text-3xl font-bold text-center outline-[5px] shadow-[10px_10px_0px_3px_black] bg-[var(--bg-accent)]`}>
                                {activeSession?.status === "paused" && <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path fill="currentColor" d="M8 19V5l11 7z"/></svg>}
                                {activeSession?.status === "active" && <svg className="pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19h4V5H6zm8-14v14h4V5z"/></svg>}
                            </div>
                        </div>
                    }

                    {/* Update button */}
                    <div className="relative text-transparent text-3xl font-bold py-2 px-5 text-center group hover:cursor-pointer">
                        Update
                        <div 
                            onClick={handleUpdateButton}
                            className={` absolute top-1 left-1 group-hover:bg-[var(--bg-accent-hover)] text-black ml-auto group-hover:translate-y-1 group-hover:translate-x-1 group-hover:cursor-pointer group-hover:shadow-[6px_6px_0px_3px_black] transition-all ease-in-out duration-50 text-3xl font-bold py-1 px-4 text-center outline-[5px] shadow-[10px_10px_0px_3px_black] bg-[var(--bg-accent)]`}>
                            Update
                        </div>
                    </div>

                    {/* Delete button */}
                    <div className="relative text-transparent text-3xl font-bold py-2 px-5 text-center group hover:cursor-pointer">
                        Delete
                        <div 
                            onClick={handleDeleteButton}
                            className={`absolute top-1 left-1 group-hover:bg-red-600 group-hover:translate-y-1 text-black group-hover:translate-x-1 group-hover:cursor-pointer group-hover:shadow-[6px_6px_0px_3px_black] transition-all ease-in-out duration-50 text-3xl font-bold py-1 px-4 text-center outline-[5px] shadow-[10px_10px_0px_3px_black] bg-[var(--bg-accent)]`}>
                            Delete
                        </div>
                    </div>
                </div>

                {/* Start/Stop button */}
                {activeSession?.status != "completed" && 
                    <div className="ml-auto right-1 mr-3 text-nowrap relative text-transparent text-5xl font-bold py-2 px-5 text-center  group hover:cursor-pointer">
                            Start Session
                        <div
                            onClick={handleStartButton}
                            className={`absolute top-1 left-1 text-black group-hover:bg-[var(--bg-accent-hover)]  mr-3 mb-2 group-hover:translate-y-1 group-hover:translate-x-1 group-hover:cursor-pointer group-hover:shadow-[6px_6px_0px_3px_black] 
                                        transition-all ease-in-out duration-50 
                                        text-5xl font-bold py-1 px-5 text-center w-[395px]
                                        outline-[5px] shadow-[10px_10px_0px_3px_black] bg-[var(--bg-accent)]`}>
                            {activeSession?.status === "planned"? "Start Session" : "Stop Session" }
                        </div>
                    </div>}
            </div>
        </div>
    )
}
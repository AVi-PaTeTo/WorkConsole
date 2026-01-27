import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getById } from "../state/session/sessionThunks"
import { openCreate, closeCreate, endUpdate } from "../state/ui/uiSlice";

export default function SessionCategories(props){
    const dispatch = useDispatch();
    const [tabOpen, setTabOpen] = useState(null)
    const { theme, createForm } = useSelector( s => s.ui)
    const { sessions, recentSessions, activeSession } = useSelector( s => s.session)

    useEffect(()=>{

    },[sessions])

    function handleTab(e){
        if(e.target.id === tabOpen && tabOpen != null){
        setTabOpen(null)
        } else {
        setTabOpen(e.target.id)
        }
    }
    
    function openSession(id){
        if(createForm) dispatch(closeCreate());
        if(activeSession?._id === id) return;
        dispatch(getById(id))
        dispatch(closeCreate())
        dispatch(endUpdate())
    }

    return(
        <>
            <div 
                style={{ "--bg-accent": theme.accent, "--bg-accent-hover": theme.accentHover, "--bg-primary": theme.primary, "--fill-primary-sticker": theme.primarySticker }}
                className={`w-[220px] h-[330px] outline-[5px] shadow-[8px_8px_0px_3px_black] bg-[var(--bg-primary)]  relative`}>
              <h1 className='font-black text-2xl py-2 px-5 border-b-4 bg-[var(--fill-primary-sticker)] '>Sessions</h1>
              <ul className='mt-3 px-5'>
                    
                    {/* Active Tab */}
                    <li className='group transition-all duration-200 mb-2 outline-3'>
                        <span 
                        id='active' 
                        onClick={(e) => handleTab(e)}
                        className='flex px-1 outline-3 bg-[var(--fill-primary-sticker)]/70 hover:cursor-pointer'>
                        Active
                        <svg className={`pointer-events-none shrink-0 h-6 w-6 rotate-90 ml-auto transition-all ease-in-out duration-200 ${tabOpen === "active"? "" : "scale-x-[-1]"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16 19L5 12l11-7z"/></svg>
                        </span>
                    <ul className={`${tabOpen === "active"? "h-40":"h-0"} flex flex-col w-full transition-all duration-200 overflow-y-scroll hide-scrollbar stripes`}>
                        {sessions && sessions.active.map(s => ( 
                            <li key={s._id}
                                onClick={() => openSession(s._id)} 
                                className='pl-3 py-1 bg-[var(--fill-primary-sticker)]/20 hover:cursor-pointer transition-all hover:scale-105'>
                                    {s.title}
                            </li>
                        ))}
                    </ul>
                    </li>

                    {/* Planned Tab */}
                    <li className='group transition-all duration-200 mb-2 outline-3'>
                        <span 
                        id='planned' 
                        onClick={(e) => handleTab(e)}
                        className='flex px-1 outline-3 bg-[var(--fill-primary-sticker)]/70 hover:cursor-pointer'>
                        Planned
                        <svg className={`pointer-events-none shrink-0 h-6 w-6 rotate-90 ml-auto transition-all ease-in-out duration-200 ${tabOpen === "planned"? "" : "scale-x-[-1]"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16 19L5 12l11-7z"/></svg>
                        </span>
                    <ul className={`${tabOpen === "planned"? "h-40":"h-0"} flex flex-col w-full transition-all duration-200 overflow-y-scroll hide-scrollbar stripes`}>
                        {sessions && sessions.planned.map(s => ( 
                            <li key={s._id}
                                onClick={() => openSession(s._id)} 
                                className='pl-3 py-1 bg-[var(--fill-primary-sticker)]/20 hover:cursor-pointer transition-all hover:scale-105'>
                                    {s.title}
                            </li>
                        ))}
                    </ul>
                    </li>

                    {/* Completed Tab */}
                    <li className='group transition-all duration-200 mb-2 outline-3'>
                        <span 
                            id='completed' 
                            onClick={(e) => handleTab(e)}
                            className='flex px-1 outline-3 bg-[var(--fill-primary-sticker)]/70 hover:cursor-pointer'>
                            Completed
                            <svg className={`pointer-events-none shrink-0 h-6 w-6 rotate-90 ml-auto transition-all ease-in-out duration-200 ${tabOpen === "completed"? "" : "scale-x-[-1]"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16 19L5 12l11-7z"/></svg>
                        </span>

                        <ul className={`${tabOpen === "completed"? "h-40 ":"h-0"} flex flex-col w-full transition-all duration-200 overflow-y-scroll hide-scrollbar stripes`}>
                            {sessions && sessions.completed.map(s => ( 
                                <li key={s._id}
                                    onClick={() => openSession(s._id)} 
                                    className='pl-3 py-1 bg-[var(--fill-primary-sticker)]/20 hover:cursor-pointer transition-all hover:scale-105'>
                                        {s.title}
                            </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>

            {/* Create Session Button */}
            <div
                inert={createForm}
                onClick={() => dispatch(openCreate())}
                className={`${!createForm? "opacity-100": "scale-0 pointer-events-none"} ease-[cubic-bezier(0.34,1.40,0.54,1)] transition-all group relative hover:cursor-pointer mt-12 z-5`}>
                <span className="block text-transparent outline py-1 text-2xl font-bold text-center select-none w-[220px]">Create Session</span>
                <div 
                    onClick={() => dispatch(openCreate())}
                    className={`absolute top-0 left-0 bg-[var(--bg-accent)] text-2xl font-bold py-1 text-center w-[220px]  translate-x-0 translate-y-0 shadow-[10px_10px_0px_3px_black] outline-5
                    group-hover:bg-[var(--bg-accent-hover)] group-hover:translate-y-1 group-hover:translate-x-1 group-hover:cursor-pointer group-hover:shadow-[6px_6px_0px_3px_black] group-hover:cursor-pointer transition-all ease-in-out duration-100`}>
                    Create Session
                </div>
            </div>       
        </>
    )
}
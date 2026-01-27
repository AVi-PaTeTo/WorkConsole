import { useSelector, useDispatch } from 'react-redux'
import { getById } from '../state/session/sessionThunks';
import { closeCreate, endUpdate } from '../state/ui/uiSlice';


export default function PreviousSessions(){
    const dispatch = useDispatch();
    const { theme, createForm } = useSelector( s => s.ui)
    const { recentSessions, activeSession } = useSelector( s => s.session)
    
    function openSession(id){
        if(createForm) dispatch(closeCreate());
        if(activeSession?._id === id) return;
        dispatch(getById(id))
        dispatch(closeCreate())
        dispatch(endUpdate())
    }

    return(
        <div 
            style={{ "--bg-accent": theme.accent, "--bg-accent-hover": theme.accentHover, "--bg-primary": theme.primary, "--fill-primary-sticker": theme.primarySticker }}
            className={`overflow-hidden relative h-full bg-[var(--bg-primary)] outline-[5px] shadow-[8px_8px_0px_3px_black]`}>
            <svg className={`fill-[var(--fill-primary-sticker)] absolute -bottom-7 -right-27 rotate-180 h-40 w-40 z-1`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path></svg>
            <svg className={`fill-[var(--fill-primary-sticker)] absolute bottom-18 right-0 h-40 w-40 z-1`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path></svg>
            <svg className={`fill-[var(--fill-primary-sticker)] absolute bottom-43 -right-27 rotate-180 h-40 w-40 z-1`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path></svg>
            
            <h1 className='py-3 px-5 font-black text-xl bg-[var(--fill-primary-sticker)] border-b-4'>Previous Sessions</h1>
            <ul className='w-full h-full relative overflow-y-auto hide-scrollbar z-5 pb-14 stripes'>
                {recentSessions && recentSessions.map( s => (
                    <li 
                        onClick={() => openSession(s._id)}
                        key={s._id} 
                        className='relative py-2 w-full font-semibold z-10 bg-[var(--fill-primary-sticker)]/20 hover:cursor-pointer transition-all hover:scale-110'>
                        <span className='px-6 block'>
                            {s.title}
                        </span>
                    </li>
            ))}
            </ul>
        </div>
    )
}
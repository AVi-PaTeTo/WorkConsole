import { ThemeModalSwitch } from "../state/ui/uiSlice";
import { useSelector, useDispatch } from 'react-redux'
import { ThemeModal } from "./ThemeModal";
import { logout } from "../state/user/userThunks";

export default function TopSection(){
    const dispatch = useDispatch();
    const { profile } = useSelector( s => s.user)
    const { theme, modalOpen } = useSelector( s => s.ui)
    return(
        <>  
            {modalOpen && <div onClick={() => dispatch(ThemeModalSwitch())} className="absolute opacity-10  w-screen h-screen z-10 right-1/2 translate-x-1/2 -top-29"></div>}
            <div 
                style={{ "--bg-accent": theme.accent, "--bg-accent-hover": theme.accentHover, "--bg-primary": theme.primary, "--fill-primary-sticker": theme.primarySticker }}
                className='relative outline-black aspect-square transition-all w-[85px] [@media(min-height:765px)]:w-[220px] flex outline-[5px] shadow-[9px_8px_0px_3px_black]'>
                <img className='object-center w-full object-cover' src="https://i.pinimg.com/736x/8f/9e/d8/8f9ed8172ca01dc49e6c6b556a513cb7.jpg" alt="" />
                <div className={`absolute bg-[var(--bg-accent)] text-nowrap -bottom-[2px] transition-all -right-[66px] [@media(min-height:765px)]:bottom-[33px] [@media(min-height:765px)]:right-0 translate-x-[70%] text-3xl px-8 py-2 font-black  outline-[5px] shadow-[7px_7px_0px_2px_black]`}> Hi {profile?profile.username : "User"}</div>
                <div className="absolute text-nowrap bg-white -z-1 -bottom-4 -right-[65px] [@media(min-height:765px)]:bottom-[18px] [@media(min-height:765px)]:right-0  translate-x-[70%] text-3xl px-8 py-2 text-white font-black transition-all">. Hi {profile?profile.username : "User"}</div>
                <div className='absolute -z-1 top-4 left-[18px] bg-white aspect-square transition-all w-[85px] [@media(min-height:765px)]:w-[220px] flex'></div>
            </div>

            <div 
                style={{ "--bg-accent": theme.accent, "--bg-accent-hover": theme.accentHover, "--bg-primary": theme.primary, "--fill-primary-sticker": theme.primarySticker }}
                className='flex flex-col gap-5 relative'>
                <div className="absolute right-0 w-8 h-8 hover:cursor-pointer group">
                    <svg 
                        onClick={() => dispatch(logout())}
                        className={`bg-[var(--bg-accent)] h-8 w-8 group-hover:bg-[var(--bg-accent-hover)] relative group-hover:translate-y-1 group-hover:translate-x-1 group-hover:cursor-pointer group-hover:shadow-[2px_2px_0px_1px_black] transition-discrete ease-in-out duration-50 p-1 shrink-0 outline-3 shadow-[4px_4px_0px_3px_black]`}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M13.5 3a1.5 1.5 0 0 0-3 0v10a1.5 1.5 0 0 0 3 0zM7.854 5.75a1.5 1.5 0 1 0-1.661-2.5A10.49 10.49 0 0 0 1.5 12c0 5.799 4.701 10.5 10.5 10.5S22.5 17.799 22.5 12c0-3.654-1.867-6.87-4.693-8.75a1.5 1.5 0 0 0-1.66 2.5a7.5 7.5 0 1 1-8.292 0Z"/></g>
                    </svg>

                </div>
                 <div 
                    style={{ "--bg-accent": theme.accent, "--bg-accent-hover": theme.accentHover }}
                    className="top-13 right-0 absolute w-8 h-8 hover:cursor-pointer group z-30">   
                    <svg 
                        onClick={() => dispatch(ThemeModalSwitch())}
                        className={`relative bg-[var(--bg-accent)] h-fit group-hover:bg-[var(--bg-accent-hover)] group-hover:translate-y-1 group-hover:translate-x-1 group-hover:cursor-pointer group-hover:shadow-[2px_2px_0px_1px_black] transition-discrete ease-in-out duration-50 p-1 shrink-0 outline-3 shadow-[3px_4px_0px_3px_black] z-25`} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#000000" fillRule="evenodd" d="M5 0h18v8.5H5V5.556A2.25 2.25 0 0 0 5.5 10h9.75v4H18v10h-8V14h2.75v-1.5H5.5A4.75 4.75 0 0 1 5 3.026zm2.5 2.5V6h13V2.5z" clipRule="evenodd"/>
                    </svg>
                </div>
                <ThemeModal />
            </div>
        </>
    )
}
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { ThemeModalSwitch } from "../state/UI/uiSlice";

export default function ThemeButton(){
    const dispatch = useDispatch();
    const { theme, modalOpen } = useSelector( s => s.ui)

    return createPortal(
        <div 
            style={{ "--bg-accent": theme.accent, "--bg-accent-hover": theme.accentHover }}
            className="top-13 right-0 absolute w-8 h-8 hover:cursor-pointer group z-30">   
            <svg 
                onClick={() => dispatch(ThemeModalSwitch())}
                className={`relative bg-[var(--bg-accent)] h-fit group-hover:bg-[var(--bg-accent-hover)] group-hover:translate-y-1 group-hover:translate-x-1 group-hover:cursor-pointer group-hover:shadow-[2px_2px_0px_1px_black] transition-discrete ease-in-out duration-50 p-1 shrink-0 outline-3 shadow-[3px_4px_0px_3px_black] z-25`} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#000000" fillRule="evenodd" d="M5 0h18v8.5H5V5.556A2.25 2.25 0 0 0 5.5 10h9.75v4H18v10h-8V14h2.75v-1.5H5.5A4.75 4.75 0 0 1 5 3.026zm2.5 2.5V6h13V2.5z" clipRule="evenodd"/>
            </svg>
        </div>,

        document.getElementById("portal-root")
    )
}
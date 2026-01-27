import { useSelector } from "react-redux"

export default function Background(){
    const { theme } = useSelector( s => s.ui)    
    return(
        <>
            <div className='absolute h-screen inset-0 -z-1 dotted-background-light'></div>
            <div 
                style={{ "--bg-color": theme.background, "--fill-color": theme.backgroundSticker}}
                className={`absolute inset-0 -z-3 bg-[var(--bg-color)]  h-screen overflow-hidden`}>
                <svg className={`fill-[var(--fill-color)] rotate-180 absolute top-5 right-85 h-70 w-70`} 
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path>
                </svg>

                <svg className={`fill-[var(--fill-color)] rotate-180 absolute top-5 right-30 h-70 w-70`} 
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path>
                </svg>

                <svg className={`fill-[var(--fill-color)] rotate-180 absolute top-5 -right-25 h-70 w-70 `} 
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path>
                </svg>

                <svg className={`fill-[var(--fill-color)] absolute bottom-0 left-0 h-90 w-90`} 
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><g><path d="M0 0v120a360 360 0 0 1 360 360h120A480 480 0 0 0 0 0Z"></path><path d="M0 240v120a120 120 0 0 1 120 120h120A240 240 0 0 0 0 240Z"></path></g>
                </svg>
            </div>
        </>
    )
}
import { useDispatch, useSelector } from "react-redux"
import { update } from "../state/ui/uiSlice"
import { useEffect, useState } from "react"

export const ThemeModal = () => {
    const themeSet = {
        defaultNeo  : {background: "#99d4eb", backgroundSticker: "#56a1be", primary: "#fda5d5", primarySticker: "#c43779", accent: "#fcc800", accentHover: "#dc9200"},
        deepSea     : {background: "#16203a", backgroundSticker: "#0b152e", primary: "#9DAAF2", primarySticker: "#2a3780", accent: "#FF6A3D", accentHover: "#d4552e"},
        cyberMint   : {background: "#1f1f1f", backgroundSticker: "#0e0e0e", primary: "#7FFFD4", primarySticker: "#18946a", accent: "#fa3397", accentHover: "#c51f72"},
        retroSlate  : {background: "#4A5568", backgroundSticker: "#39404b", primary: "#EDF2F7", primarySticker: "#8b8f92", accent: "#48BB78", accentHover: "#328f5d"},
        toxicSunset : {background: "#2D1B33", backgroundSticker: "#200f25", primary: "#FFD0A1", primarySticker: "#cc8d4e", accent: "#00F5FF", accentHover: "#01b5be"},
        safetyHigh  : {background: "#E2E8F0", backgroundSticker: "#a1a5aa", primary: "#F6AD55", primarySticker: "#c97a1a", accent: "#3182CE", accentHover: "#255c97"}
    }
    const dispatch = useDispatch();
    const { themeName, modalOpen } = useSelector( s => s.ui)

    const [anim, setAnim] = useState(null)
                                            

    useEffect(() => {
        if (modalOpen) {
            setAnim("animate-drop");
        } else if (anim === "animate-drop") { 
            // ONLY set rise if it was already open!
            setAnim("animate-rise");
        }
    }, [modalOpen]);

    return(
        <>
            <div className={`absolute top-[54px] -right-1 bg-white z-20 ${anim}`}>
                <div className={`flex p-4 flex-col w-full h-full transition-all overflow-hidden ${modalOpen? "delay-700 opacity-100": "opacity-0"}`}>
                    
                    {anim != null && 
                        <div className='w-full h-full grid grid-cols-2 grid-rows-3 gap-5'>
                            
                            <div className="flex flex-col gap-1">
                                <span
                                    key="defaultNeo"
                                    onClick={() => dispatch(update({name: "defaultNeo", theme: themeSet["defaultNeo"] }))}
                                    style={{ '--bg-color': themeSet.defaultNeo.primary, '--bg-accent': themeSet.defaultNeo.accent }}
                                    className={`relative flex justify-center items-center text-xl text-black/80 overflow-hidden h-full
                                                bg-[var(--bg-color)] outline-black outline-3 transition-all hover:cursor-pointer
                                                ${themeName === "defaultNeo"? 
                                                    "shadow-[1px_1px_0px_1px_black] translate-x-1 translate-y-1" : 
                                                    "shadow-[5px_5px_0px_2px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_1px_black] " }`}>
                                    {themeName === "defaultNeo"? "Selected" : "" }
                                    <span className="absolute h-30 w-20 rotate-45 -right-5 -top-5 outline-4 outline-black bg-[var(--bg-accent)]"></span>
                                </span>
                                <p className="text-center tracking-wide">Default Neo</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span
                                    key="deepSea"
                                    onClick={() => dispatch(update({name: "deepSea", theme: themeSet["deepSea"] }))}
                                    style={{ '--bg-color': themeSet.deepSea.primary, '--bg-accent': themeSet.deepSea.accent }}
                                    className={`relative flex justify-center items-center text-xl text-black/80 overflow-hidden h-full
                                                bg-[var(--bg-color)] outline-black outline-3 transition-all hover:cursor-pointer
                                                ${themeName === "deepSea"? 
                                                    "shadow-[1px_1px_0px_1px_black] translate-x-1 translate-y-1" : 
                                                    "shadow-[5px_5px_0px_2px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_1px_black] " }`}>
                                    {themeName === "deepSea"? "Selected" : "" }
                                    <span className="absolute h-30 w-20 rotate-45 -right-5 -top-5 outline-4 outline-black bg-[var(--bg-accent)]"></span>
                                </span>
                                <p className="text-center tracking-wide">Deep Sea</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span
                                    key="cyberMint"
                                    onClick={() => dispatch(update({name: "cyberMint", theme: themeSet["cyberMint"] }))}
                                    style={{ '--bg-color': themeSet.cyberMint.primary, '--bg-accent': themeSet.cyberMint.accent }}
                                    className={`relative flex justify-center items-center text-xl text-black/80 overflow-hidden h-full
                                                bg-[var(--bg-color)] outline-black outline-3 transition-all hover:cursor-pointer
                                                ${themeName === "cyberMint"? 
                                                    "shadow-[1px_1px_0px_1px_black] translate-x-1 translate-y-1" : 
                                                    "shadow-[5px_5px_0px_2px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_1px_black] " }`}>
                                    {themeName === "cyberMint"? "Selected" : "" }
                                    <span className="absolute h-30 w-20 rotate-45 -right-5 -top-5 outline-4 outline-black bg-[var(--bg-accent)]"></span>
                                </span>
                                <p className="text-center tracking-wide">Cyber Mint</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span
                                    key="retroSlate"
                                    onClick={() => dispatch(update({name: "retroSlate", theme: themeSet["retroSlate"] }))}
                                    style={{ '--bg-color': themeSet.retroSlate.primary, '--bg-accent': themeSet.retroSlate.accent }}
                                    className={`relative flex justify-center items-center text-xl text-black/80 overflow-hidden h-full
                                                bg-[var(--bg-color)] outline-black outline-3 transition-all hover:cursor-pointer
                                                ${themeName === "retroSlate"? 
                                                    "shadow-[1px_1px_0px_1px_black] translate-x-1 translate-y-1" : 
                                                    "shadow-[5px_5px_0px_2px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_1px_black] " }`}>
                                    {themeName === "retroSlate"? "Selected" : "" }
                                    <span className="absolute h-30 w-20 rotate-45 -right-5 -top-5 outline-4 outline-black bg-[var(--bg-accent)]"></span>
                                </span>
                                <p className="text-center tracking-wide">Retro Slate</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span
                                    key="toxicSunset"
                                    onClick={() => dispatch(update({name: "toxicSunset", theme: themeSet["toxicSunset"] }))}
                                    style={{ '--bg-color': themeSet.toxicSunset.primary, '--bg-accent': themeSet.toxicSunset.accent }}
                                    className={`relative flex justify-center items-center text-xl text-black/80 overflow-hidden h-full
                                                bg-[var(--bg-color)] outline-black outline-3 transition-all hover:cursor-pointer
                                                ${themeName === "toxicSunset"? 
                                                    "shadow-[1px_1px_0px_1px_black] translate-x-1 translate-y-1" : 
                                                    "shadow-[5px_5px_0px_2px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_1px_black] " }`}>
                                    {themeName === "toxicSunset"? "Selected" : "" }
                                    <span className="absolute h-30 w-20 rotate-45 -right-5 -top-5 outline-4 outline-black bg-[var(--bg-accent)]"></span>
                                </span>
                                <p className="text-center tracking-wide">Toxic Sunset</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span
                                    key="safetyHigh"
                                    onClick={() => dispatch(update({name: "safetyHigh", theme: themeSet["safetyHigh"] }))}
                                    style={{ '--bg-color': themeSet.safetyHigh.primary, '--bg-accent': themeSet.safetyHigh.accent }}
                                    className={`relative flex justify-center items-center text-xl text-black/80 overflow-hidden h-full
                                                bg-[var(--bg-color)] outline-3 outline-black transition-all hover:cursor-pointer
                                                ${themeName === "safetyHigh"? 
                                                    "textshadow-[1px_1px_0px_1px_black] translate-x-1 translate-y-1" : 
                                                    "shadow-[5px_5px_0px_2px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_1px_black] " }`}>
                                    {themeName === "safetyHigh"? "Selected" : "" }
                                    <span className="absolute h-30 w-20 rotate-45 -right-5 -top-5 outline-4 outline-black bg-[var(--bg-accent)]"></span>            
                                </span>
                                <p className="text-center tracking-wide">Safety High</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
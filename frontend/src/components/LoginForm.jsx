
import { useEffect, useState } from "react";
import { login, register } from "../state/user/userThunks";
import { useDispatch, useSelector } from "react-redux";

export default function LoginForm(){
    const { profile, status, error, isAuthenticated } = useSelector( s => s.user)
    const { theme } = useSelector( s => s.ui )
    const dispatch = useDispatch();
    const [registering, setRegistering] = useState(false)
    const isBooting = status === "idle" || status === "loading";
    const [formData, setFormData] = useState({ name:"", email:"", password: "" })
    
    useEffect(()=>{
        setFormData({ name:"", email:"", password: "" })
    },[profile])
    
    function handleChange(e){
        if(!registering && e.target.id === "name"){
            return
        }
        setFormData(prev => ({...prev, [e.target.id]: e.target.value}))
    }
    
    function handleSubmit(){

        if(registering){
            if(formData['name'].length < 6) return;
            dispatch(register(formData))
            return;
        }
        dispatch(login({email:formData["email"], password: formData["password"]}))
    }

    if(isBooting){
        return (
            <div
                style={{ "--bg-accent": theme.accent }} 
                className=" flex items-center justify-center pb-4 w-full h-full">
                <span className="loader w-full h-full"></span>
            </div>
        )
    }

    if(!isAuthenticated){
    return(
        <div 
            style={{ "--bg-accent": theme.accent, "--bg-accent-hover": theme.accentHover, "--fill-primary-sticker": theme.primarySticker }}
            className="relative flex flex-col h-full transition-all duration-200">
            <div  className="transition-all h-full transition-discrete">
                <h1 className={`${registering?"text-4xl":"text-5xl"} px-4 py-2 border-b-4 mb-4 bg-[var(--fill-primary-sticker)]`}>{registering?"Create Account":"Log In"}</h1>

                {error && <p className="text-center text-xl bg-black text-red-500 tracking-wide p-1">{error.message}</p>}
                
                <div className="fixed w-full h-fit overflow-hidden px-8 pb-10">
                    <form id="authForm" onSubmit={handleSubmit} className={`${registering? "translate-y-0": "-translate-y-20"} ease-[cubic-bezier(0.34,1.70,0.54,1)] duration-200 transition-all`}>
                        <span 
                            inert={!registering}
                            className={`flex flex-col mb-3 ${registering?"pointer-events-auto" : "pointer-events-none"}`}>
                            <label className="text-2xl" htmlFor="name">Name</label>
                            <input 
                            className="bg-white/90 h-fit mt-1 px-2 py-1 outline-[5px] shadow-[8px_8px_0px_3px_black]"
                            type="text"
                            id="name"
                            required={registering}
                            value={formData["name"]}
                            onChange={(e) => handleChange(e)} 
                            />
                        </span>

                        <span className="flex flex-col mb-3">
                            <label className="text-2xl" htmlFor="email">Email</label>
                            <input 
                            className="bg-white/90 h-fit mt-1 px-2 py-1 outline-[5px] shadow-[8px_8px_0px_3px_black]"
                            type="text"
                            id="email"
                            required={true}
                            value={formData["email"]}
                            onChange={(e) => handleChange(e)} 
                            />
                        </span>
                        
                        <span className="flex flex-col">
                            <label className="text-2xl" htmlFor="password">Password</label>
                            <input 
                            className="bg-white/90 h-fit mt-1 px-2 py-1 outline-[5px] shadow-[8px_8px_0px_3px_black]"
                            type="password" 
                            id="password"
                            required={true}
                            value={formData["password"]}
                            onChange={(e) => handleChange(e)}
                            />
                        </span>
                    </form>
                </div>
            </div>
            
            <div className="mt-17 mb-30 text-center z-10">
                {registering?"Already have an account?": "Don't have an account?"} 
                <span 
                    onClick={() => setRegistering(prev => !prev)}
                    className="ml-2 hover:cursor-pointer text-[var(--fill-primary-sticker)]">
                    {registering?"Log In":"Register"}
                </span>
            </div>
            
            <div className="absolute bottom-5 -left-1/2 h-25 w-[800px] overflow-hidden">
                <div className={` ${profile? "animate-slide-out" : "animate-slide-in"} group w-fit h-fit bottom-6 relative hover:cursor-pointer mt-12 ml-auto left-100 `}>
                    <span className="block text-transparent text-5xl font-bold py-1 px-4 text-center w-[205px]">Log In</span>
                    <button 
                        form="authForm"
                        className={`group-hover:bg-[var(--bg-accent-hover)] ml-auto mr-6 mb-2 group-hover:translate-y-1 group-hover:translate-x-1 group-hover:cursor-pointer group-hover:shadow-[6px_6px_0px_3px_black] 
                                    transition-all duration-50 absolute top-0
                                    text-5xl font-bold py-1 px-4 text-center w-[205px]
                                    outline-[5px] outline-black shadow-[10px_10px_0px_3px_black] bg-[var(--bg-accent)]`}
                        >
                        {registering?"Create":"Log In"}
                    </button>
                </div>
            </div>
        </div>
    )
}}
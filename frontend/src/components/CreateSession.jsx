import { useState, useRef, useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { create, patch } from "../state/session/sessionThunks"
import { closeCreate, endUpdate } from "../state/ui/uiSlice"


export default function CreateSession(){
    const pillColors = ["bg-[#ff4107]","bg-[#00ff84]","bg-[#ffa31a]","bg-[#7d60ff]","bg-[#ff2323]","bg-[#1a5cd6]","bg-[#a1f31d]","bg-[#18e6ca]",]
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState([])
    const [tagInput, setTagInput] = useState("")
    const inputRef = useRef(null)
    const dispatch = useDispatch();
    const { theme, createForm, updatingSession } = useSelector( s => s.ui)
    const { activeSession } = useSelector( s => s.session)

    function addTag(e){
        e.preventDefault()
        if(tagInput){
            if (tags.length === 6){
                alert("max 6 tags allowed")
                return
            }
            const hex = randomColor()
            const text = tagInput
            setTags(prev => [...prev, {text, hex}])
            setTagInput("")
        }
    }

    function removeTag(index){
        setTags(prev => prev.filter((x,i) => i != index))
    }

    function randomColor() {
        const idx = Math.floor(Math.random() * 7);
        return pillColors[idx]
    }

    function handleSave(){
        if(tags.length < 1 || title.length < 6) return;
        const tagText = tags.map( t => t.text)

        if(updatingSession){
            dispatch(patch({Id:activeSession._id, updateData:{title: title, tags: tagText}}))
            dispatch(endUpdate())
        } else {
            dispatch(create({title: title, tags: tagText}))
        }

        dispatch(closeCreate());
    }

    useEffect(()=>{
        if(updatingSession){
            setTitle(activeSession.title)
            setTags(activeSession.tags.map( t => {
                const hex = randomColor()
                return({text:t,hex})
            }))
        } else {
            setTitle("")
            setTags([])
        }
    },[updatingSession])

    return(
        <div 
            style={{ "--bg-accent": theme.accent, "--bg-accent-hover": theme.accentHover , "--fill-primary-sticker": theme.primarySticker}}
            className={`absolute inset-0 flex flex-col h-full transform-gpu transition-all duration-500
                            ease-[cubic-bezier(0.34,1.56,0.64,1)]
                            ${createForm
                                ? "opacity-100  pointer-events-auto delay-200" 
                                : "opacity-0  pointer-events-none"}
                            `}>
            <h1 className='font-black text-3xl border-b-4 px-5 py-2 bg-[var(--fill-primary-sticker)]'>{updatingSession?"Update" : "Create"} Session</h1>
            <div className='pb-4 px-6 mt-3 flex flex-col h-full gap-5 z-5'>
                <span className='mt-1'>
                    <label className='text-2xl' htmlFor="title">Title</label><br></br>
                    <input 
                        className="bg-white/90 h-fit  w-[500px]  mt-1 px-2 py-3 text-xl outline-[5px] shadow-[8px_8px_0px_3px_black]" 
                        type="text" 
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                </span>
                <div className=''>
                <h1 className='text-2xl' htmlFor="tags">Tags</h1>
                <form
                    onClick={() => inputRef.current?.focus()}
                    onSubmit={addTag}
                    className='hover:cursor-text flex flex-wrap items-center w-[500px] mt-2 gap-2 px-2 py-2 bg-white/90  outline-[5px] shadow-[8px_8px_0px_3px_black]'>
                        {tags.map( (t, i) => (
                            <div
                                key={i} 
                                className={`flex items-center gap-1 mr-2 mb-2 h-fit outline-[3px] shadow-[4px_4px_0px_3px_black] w-fit pl-2 ${t.hex} outline-black text-black/85 hover:cursor-default`}>
                                {t.text}
                                <svg onClick={() => removeTag(i)} className="hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" stroke-width="2" d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07"/></svg>
                            </div>
                        ))}
                        <div className="w-fit relative items-center flex my-1">
                            <input 
                                ref = {inputRef}
                                className="absolute inset-0 outline-none py-1 text-xl " 
                                maxLength={12} 
                                type="text" 
                                name='tags' 
                                value={tagInput} 
                                onChange={(e) => setTagInput(e.target.value)}/>  
                            <span className="invisible whitespace-pre text-xl px-2">{tagInput? tagInput:"tags"}</span>
                        </div>
                </form>
                </div>
                <div className='w-full flex flex-col gap-10 mt-auto mb-8 z-5'>
                    <div className='ml-auto mr-6 w-fit flex gap-10'>
                        <div className="group relative hover:cursor-pointer">
                            <span className="text-transparent text-3xl font-bold py-1 px-4 text-center select-none">Save</span>
                            <div
                                onClick={handleSave}
                                className={`absolute top-0 left-0 group-hover:bg-[var(--bg-accent-hover)] ml-auto group-hover:translate-y-1 group-hover:translate-x-1 group-hover:cursor-pointer group-hover:shadow-[6px_6px_0px_3px_black] transition-all ease-in-out duration-50 text-3xl font-bold py-1 px-4 text-center outline-[5px] shadow-[10px_10px_0px_3px_black] bg-[var(--bg-accent)]`}>
                                Save
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
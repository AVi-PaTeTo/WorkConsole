export default function TagPill(props){
    return(
        <>
            <div key={props.id} className={`flex items-center gap-1 mr-2 mb-2 h-fit outline-[3px] shadow-[4px_4px_0px_3px_black] w-fit pl-2 ${props.hex} outline-black text-black/85 hover:cursor-default`}>
                {props.text}
                <svg className="hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07"/></svg>
            </div>
        </>
    )
}
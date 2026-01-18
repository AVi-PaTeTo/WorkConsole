
import './App.css'

function App() {


  return (
    <>
      {/* <div className='h-50 w-50 brutalist-star absolute '></div> */}
              <div className='absolute top-5 right-85 h-70 w-70 -z-1'>
                <svg className='fill-sky-900/60 rotate-180' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path></svg>
              </div>
              <div className='absolute top-5 right-30 h-70 w-70 -z-1'>
                <svg className='fill-sky-900/60 rotate-180' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path></svg>
              </div>
              <div className='absolute top-5 -right-25 h-70 w-70 -z-1'>
                <svg className='fill-sky-900/60 rotate-180' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path></svg>
              </div>
              <div className='absolute bottom-0 left-0 h-90 w-90 -z-1'>
                <svg className='fill-sky-900/60' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><g><path d="M0 0v120a360 360 0 0 1 360 360h120A480 480 0 0 0 0 0Z"></path><path d="M0 240v120a120 120 0 0 1 120 120h120A240 240 0 0 0 0 240Z"></path></g></svg>
              </div>
      <div className='w-screen max-w-[1480px] mx-auto flex flex-col h-screen p-15 font-archivo'>
        <div className='w-full  flex justify-between'>
          <div className='relative outline-black aspect-square w-[220px] flex outline-[5px] shadow-[8px_8px_0px_3px_black]'>
            <img className='object-bottom w-full object-cover' src="https://i.pinimg.com/736x/82/98/0c/82980c23897622b410f286f9256c2a0b.jpg" alt="" />
            <div className="absolute bg-yellow-500 bottom-8  right-0 translate-x-[70%] text-3xl px-8 py-2 font-black  outline-[5px] shadow-[8px_8px_0px_2px_black]"> Hi Katie</div>
            <div className="absolute bg-white -z-1 bottom-4 -right-4 translate-x-[70%] text-3xl px-8 py-2 font-black">Hi Katie</div>
            {/* <svg className='fill-sky-800/60 absolute -top-0 -right-[50%] h-40 w-40 -z-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M480 120 360 0 240 120 120 0 0 120l120 120L0 360l120 120 120-120 120 120 120-120-120-120 120-120z"></path></svg> */}
          <div className='absolute -z-1 top-4 left-4 bg-white aspect-square w-[220px] flex'>
            
          </div>
          </div>
          
          {/* <div className='relative outline-black aspect-square w-[220px] flex'>
            <img className='object-bottom w-full object-cover rounded-2xl' src="https://i.pinimg.com/736x/82/98/0c/82980c23897622b410f286f9256c2a0b.jpg" alt="" />
            <div className="absolute bottom-0 right-0 translate-x-[70%] text-3xl px-8 py-2 font-black font-mono"> Hi User</div>
          </div> */}
          <div className='flex flex-col gap-5'>
            <svg className=' bg-yellow-400 h-fit hover:bg-yellow-600 hover:translate-y-1 hover:translate-x-1 hover:cursor-pointer hover:shadow-[2px_2px_0px_1px_black] transition-discrete ease-in-out duration-50 p-1 shrink-0 outline-3 shadow-[4px_4px_0px_3px_black]' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M13 3h-2v10h2zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7A6.995 6.995 0 0 1 7.58 6.58L6.17 5.17A8.93 8.93 0 0 0 3 12a9 9 0 0 0 18 0c0-2.74-1.23-5.18-3.17-6.83"/></svg>
            <svg className='bg-yellow-400 h-fit hover:bg-yellow-600 hover:translate-y-1 hover:translate-x-1 hover:cursor-pointer hover:shadow-[2px_2px_0px_1px_black] transition-discrete ease-in-out duration-50 p-1 shrink-0 outline-3 shadow-[4px_4px_0px_3px_black]' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#000000" fill-rule="evenodd" d="M5 0h18v8.5H5V5.556A2.25 2.25 0 0 0 5.5 10h9.75v4H18v10h-8V14h2.75v-1.5H5.5A4.75 4.75 0 0 1 5 3.026zm2.5 2.5V6h13V2.5z" clip-rule="evenodd"/></svg>
          </div>
        </div>
        <div className='flex w-full mt-12 h-full'>
          <div>
            <div className='pt-4 px-6 w-[220px] h-[330px] outline-[5px] shadow-[8px_8px_0px_3px_black] bg-pink-300'>
              <h1 className='font-black text-2xl'>Sessions</h1>
              <p className='font-semibold mt-3'>▶ Active</p>
              <p className='font-semibold  mt-2 '>▶ Planned</p>
              <p className='font-semibold mt-2 '>▼ Completed</p>
              <div className='pl-8 mt-1'>
                <p className='font-semibold text-sm mt-1'>Algebra</p>
                <p className='font-semibold text-sm mt-1'>JWT Auth</p>
                <p className='font-semibold text-sm mt-1'>Flex Box</p>
                <p className='font-semibold text-sm leading-4 mt-1'>Implement Payment API</p>
              </div>
            </div>

            <div className='hover:bg-yellow-600 hover:translate-y-1 hover:translate-x-1 hover:cursor-pointer hover:shadow-[6px_6px_0px_3px_black] transition-discrete ease-in-out duration-50 text-2xl font-bold py-1 text-center w-[220px] mt-12 outline-[5px] shadow-[10px_10px_0px_3px_black] bg-yellow-400'>
              Create Session
            </div>
          </div>
          <div className='w-full'>
            <div className='overflow-hidden relative flex flex-col h-full h-full pt-4 px-6 bg-pink-300 outline-[5px] shadow-[8px_8px_0px_3px_black] ml-12'>
              <div className=''>
                <svg className='fill-pink-800/60 absolute -top-20 -right-25 h-90 w-90 z-1' xmlns="http://www.w3.org/2000/svg" viewBox="-20 0 510 510"><path d="M450 210c-26.9 0-36.4-35.6-13.1-49a30 30 0 1 0-30-52c-23.3 13.5-49.3-12.6-36-35.9a30 30 0 0 0-52-30h.1c-13.4 23.3-49 13.8-49-13a30 30 0 1 0-60 0c0 26.8-35.6 36.3-49 13a30 30 0 1 0-52 30c13.5 23.3-12.6 49.4-35.9 36a30 30 0 0 0-30 52c23.3 13.3 13.8 48.9-13 48.9a30 30 0 1 0 0 60c26.8 0 36.3 35.6 13 49a30 30 0 1 0 30 52c23.3-13.5 49.4 12.6 36 35.9a30 30 0 0 0 52 30h-.1c13.4-23.3 49-13.8 49 13a30 30 0 1 0 60 0c0-26.8 35.6-36.3 49-13a30 30 0 1 0 52-30c-13.4-23.3 12.6-49.4 35.9-36a30 30 0 0 0 30-52c-23.3-13.3-13.8-48.9 13.1-48.9a30 30 0 1 0 0-60Z"></path></svg>
                {/* <svg className='fill-pink-800/60 absolute -bottom-20 right-60 h-70 w-70 z-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M480 240a240 240 0 0 0-240 240 240 240 0 0 0 240-240ZM240 0A240 240 0 0 0 0 240 240 240 0 0 0 240 0ZM480 240A240 240 0 0 0 240 0a240 240 0 0 0 240 240ZM240 480A240 240 0 0 0 0 240a240 240 0 0 0 240 240Z"></path></svg> */}
                <svg className='fill-pink-800/60 absolute -bottom-35 left-10 h-60 w-60 z-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M120 120h120v120H120zM0 240h120v120H0zM120 360h120v120H120zM0 0h120v120H0zM360 120h120v120H360zM240 240h120v120H240zM360 360h120v120H360zM240 0h120v120H240z"></path></svg>

                {/* <svg className='fill-pink-800/60 absolute -bottom-20 right-60 h-70 w-70 z-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M480 120 360 0 240 120 120 0 0 120l120 120L0 360l120 120 120-120 120 120 120-120-120-120 120-120z"></path></svg> */}
              </div>
              <div className='flex justify-between'>
                <h1 className='font-black text-2xl z-5'>Session Details</h1>
                {/* <span className='flex gap-5 z-5'>
                  
                  <svg  className='bg-yellow-400 h-fit hover:bg-yellow-600 hover:translate-y-1 hover:translate-x-1 hover:cursor-pointer hover:shadow-[2px_2px_0px_1px_black] transition-discrete ease-in-out duration-50 p-1 shrink-0 outline-3 shadow-[4px_4px_0px_3px_black]' 
                        xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#000000" d="M3 21V3h10.925l-2 2H5v14h14v-6.95l2-2V21zm6-6v-4.25L19.625.125L23.8 4.4L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"/></svg>
                  <svg  className='bg-yellow-400 h-fit hover:bg-yellow-600 hover:translate-y-1 hover:translate-x-1 hover:cursor-pointer hover:shadow-[2px_2px_0px_1px_black] transition-discrete ease-in-out duration-50 p-1 shrink-0 outline-3 shadow-[4px_4px_0px_3px_black]' 
                        xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#000000" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"/></svg>
                </span> */}
              </div>
              <h1 className='font-black text-6xl mt-3 z-5'>Build auth UI</h1>
              <div className='mt-3 pl-2 flex gap-4 z-5'>
                <p className='outline-[3px] shadow-[4px_4px_0px_3px_black] w-fit px-2 bg-[#266bff] outline-black text-black/85'>Frontend</p>
                <p className='outline-[3px] shadow-[4px_4px_0px_3px_black] w-fit px-2 bg-[#A855F7] outline-black text-black/85'>UI</p>
                <p className='outline-[3px] shadow-[4px_4px_0px_3px_black] w-fit px-2 bg-[#00D1FF] outline-black text-black/85'>React</p>
                <p className='outline-[3px] shadow-[4px_4px_0px_3px_black] w-fit px-2 bg-[#ADFF2F] outline-black text-black/85'>Redux</p>
              </div>

              <div className='mt-10 flex gap-10 z-5'>
                <span className='w-55'>
                  <p>Status:</p>
                  <p className='text-4xl text-lime-400 text-black-white text-shadow-[3px_3px_0px_black]'>Active</p>
                </span>
                <span className='w-55'>
                  <p>Time:</p>
                <p className='text-4xl'>45mins</p>
                </span>
              </div>

              <div className='w-full flex flex-col gap-10 mt-auto mb-8 z-5'>
                <div className='ml-auto mr-6 w-fit flex gap-10'>
                  <div className='hover:bg-yellow-600 ml-auto hover:translate-y-1 hover:translate-x-1 hover:cursor-pointer hover:shadow-[6px_6px_0px_3px_black] transition-discrete ease-in-out duration-50 text-3xl font-bold py-1 px-4 text-center outline-[5px] shadow-[10px_10px_0px_3px_black] bg-yellow-400'>
                  Update
                </div>
                <div className='hover:bg-red-600 hover:translate-y-1 hover:translate-x-1 hover:cursor-pointer hover:shadow-[6px_6px_0px_3px_black] transition-discrete ease-in-out duration-50 text-3xl font-bold py-1 px-4 text-center outline-[5px] shadow-[10px_10px_0px_3px_black] bg-yellow-400'>
                  Delete
                </div>
                </div>
                <div className='hover:bg-yellow-600 ml-auto mr-6 mb-2 hover:translate-y-1 hover:translate-x-1 hover:cursor-pointer hover:shadow-[6px_6px_0px_3px_black] transition-discrete ease-in-out duration-50 text-5xl font-bold py-1 px-4 text-center outline-[5px] shadow-[10px_10px_0px_3px_black] bg-yellow-400'>
                  Start Session
                </div>
                
              </div>
            </div>
          </div>
          <div className='overflow-hidden relative ml-12 w-[260px] pt-4 px-6 shrink-0 h-full bg-pink-300 outline-[5px] shadow-[8px_8px_0px_3px_black]'>
            <svg className='fill-pink-800/60 absolute -bottom-7 -left-25 h-40 w-40 z-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path></svg>
            <svg className='fill-pink-800/60 absolute bottom-18 left-2 rotate-180 h-40 w-40 z-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path></svg>
            <svg className='fill-pink-800/60 absolute bottom-43 -left-25  h-40 w-40 z-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path></svg>
            
            <h1 className='font-black text-[21px]'>Previous Sessions</h1>
            <p className='font-semibold mt-3'>● Algebra</p>
              <p className='font-semibold  mt-2 '>● JWT Auth</p>
              <p className='font-semibold mt-2 '>● Payment API</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

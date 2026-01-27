
import './App.css'
import SessionDetails from './components/SessionDetails'
import CreateSession from './components/CreateSession'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeModal } from './components/ThemeModal'
import SessionCategories from './components/SessionCategories'
import Background from './components/Background'
import TopSection from './components/TopSection'
import PreviousSessions from './components/PreviousSessions'
import { authCheck } from './state/user/userThunks'
import { all, recent } from './state/session/sessionThunks'
import LoginForm from './components/LoginForm'

function App() {
  const dispatch = useDispatch();
  const [create, setCreate] = useState(true)
  const { theme, modalOpen } = useSelector( s => s.ui )
  const { recentSessions } = useSelector( s => s.session )
  const { profile, status, error, isAuthenticated } = useSelector( s => s.user )

  useEffect(() => {
      dispatch(authCheck());
      if(isAuthenticated){

        dispatch(all());
        dispatch(recent());
      }
    }, [isAuthenticated]);

  return (
    <>
      <Background />
      
      {/* {modalOpen && <div className="absolute w-screen bg-black/30 h-screen top-0 left-0 z-25"></div>} */}
      <div 
        style={{ "--bg-accent": theme.accent, "--bg-accent-hover": theme.accentHover, "--bg-primary": theme.primary, "--fill-primary-sticker": theme.primarySticker }}
        className='max-w-[1480px] h-screen mx-auto flex flex-col justify-center p-10 font-archivo relative'>
        
        {/* Pfp and ui tools */}
        <div className={`w-full z-20 flex justify-between ${profile? "delay-400 translate-y-0 opacity-100" : "-translate-y-[200%] opacity-0 pointer-events-none" } transition-all transform-gpu ease-[cubic-bezier(0.34,1.80,0.54,1)] duration-400`}>
          <TopSection />
        </div>

        {/* Main Section */}
        <div className='flex justify-center w-full mt-12 h-full max-h-[520px]'>

          {/* Sessions categorized by status */}
          <div
            inert={!profile}
            className={`w-[220px] h-full shrink-0 ${profile? "delay-800 translate-x-0 opacity-100" : "-translate-x-[400%] opacity-0 pointer-events-none" } transition-all transform-gpu ease-[cubic-bezier(0.34,1.40,0.54,1)] duration-400`}>
            <SessionCategories setCreate={setCreate}/>
          </div>

          {/* Main Window */}
          <div className={` ${profile? "w-full min-w-[600px]" : "w-[450px] min-w-[450px] -translate-y-[20%] min-h-[525px] max-h-[530px]"} relative transition-all duration-600 ml-12`}>
            <div className={` relative flex flex-col h-full w-full  bg-[var(--bg-primary)] outline-[5px] shadow-[8px_8px_0px_3px_black]`}>
              <div className='top-0 left-0 pointer-events-none overflow-hidden absolute w-full h-full z-0'>
                <svg className={`fill-[var(--fill-primary-sticker)] absolute -bottom-40 -left-15 h-90 w-90 z-1`} xmlns="http://www.w3.org/2000/svg" viewBox="-20 0 510 510"><path d="M450 210c-26.9 0-36.4-35.6-13.1-49a30 30 0 1 0-30-52c-23.3 13.5-49.3-12.6-36-35.9a30 30 0 0 0-52-30h.1c-13.4 23.3-49 13.8-49-13a30 30 0 1 0-60 0c0 26.8-35.6 36.3-49 13a30 30 0 1 0-52 30c13.5 23.3-12.6 49.4-35.9 36a30 30 0 0 0-30 52c23.3 13.3 13.8 48.9-13 48.9a30 30 0 1 0 0 60c26.8 0 36.3 35.6 13 49a30 30 0 1 0 30 52c23.3-13.5 49.4 12.6 36 35.9a30 30 0 0 0 52 30h-.1c13.4-23.3 49-13.8 49 13a30 30 0 1 0 60 0c0-26.8 35.6-36.3 49-13a30 30 0 1 0 52-30c-13.4-23.3 12.6-49.4 35.9-36a30 30 0 0 0 30-52c-23.3-13.3-13.8-48.9 13.1-48.9a30 30 0 1 0 0-60Z"></path></svg>
                <svg className={`fill-[var(--fill-primary-sticker)] absolute top-20 -right-20 h-60 w-60 z-1`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M120 120h120v120H120zM0 240h120v120H0zM120 360h120v120H120zM0 0h120v120H0zM360 120h120v120H360zM240 240h120v120H240zM360 360h120v120H360zM240 0h120v120H240z"></path></svg>
              </div>
              <div className="relative h-full w-full">
                  {/* View/Create View */}
                  <div className={`
                    transition-all duration-500 absolute inset-0
                    ${profile ? "delay-300 opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
                  `}>
                    <div></div>
                    {profile && <SessionDetails />}
                    {profile && <CreateSession />}
                  </div>

                  {/* Login View */}
                  <div className={`
                    transition-all duration-500 absolute inset-0 z-20
                    ${!profile ? "opacity-100 scale-100 pointer-events-auto delay-400" : "opacity-0 scale-90 pointer-events-none"}
                  `}> 

                    <LoginForm />
                  </div>
              </div>
            </div>
          </div>

          {/* Previous Session Window */}
          <div className={` ${profile? "delay-600 translate-x-0 opacity-100" : "translate-y-[200%] opacity-0 pointer-events-none" } relative transition-all transform-gpu ease-[cubic-bezier(0.34,1.40,0.54,1)] duration-400 ml-12 w-[260px] h-full shrink-0`}>
              <PreviousSessions />
          </div>
        </div>
      </div>
    </>
  )
}

export default App

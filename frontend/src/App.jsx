import './App.css';
import SessionDetails from './components/SessionDetails';
import CreateSession from './components/CreateSession';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeModal } from './components/ThemeModal';
import SessionCategories from './components/SessionCategories';
import Background from './components/Background';
import TopSection from './components/TopSection';
import PreviousSessions from './components/PreviousSessions';
import { authCheck } from './state/user/userThunks';
import { all, recent } from './state/session/sessionThunks';
import LoginForm from './components/LoginForm';

function App() {
    const dispatch = useDispatch();
    const [create, setCreate] = useState(true);
    const { theme } = useSelector((s) => s.ui);
    // const { recentSessions } = useSelector((s) => s.session);
    const { profile, status, isAuthenticated } = useSelector((s) => s.user);

    const isBooting = status === 'idle' || status === 'loading';
    useEffect(() => {
        dispatch(authCheck());
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(all());
            dispatch(recent());
        }
    }, [isAuthenticated, dispatch]);

    return (
        <>
            <Background />
            {isBooting && (
                <div
                    style={{ '--bg-accent': theme.accent }}
                    className="absolute z-60 flex h-screen w-screen items-center justify-center bg-black/40 pb-4"
                >
                    <span className="loader h-full w-full"></span>
                </div>
            )}
            {/* {modalOpen && <div className="absolute w-screen bg-black/30 h-screen top-0 left-0 z-25"></div>} */}
            <div
                style={{
                    '--bg-accent': theme.accent,
                    '--bg-accent-hover': theme.accentHover,
                    '--bg-primary': theme.primary,
                    '--fill-primary-sticker': theme.primarySticker,
                }}
                className="font-archivo relative mx-auto flex h-screen max-w-[1480px] flex-col justify-center p-10"
            >
                {/* Pfp and ui tools */}
                <div
                    className={`z-20 flex w-full justify-between ${profile ? 'translate-y-0 opacity-100 delay-400' : 'pointer-events-none -translate-y-[200%] opacity-0'} transform-gpu transition-all duration-400 ease-[cubic-bezier(0.34,1.80,0.54,1)]`}
                >
                    <TopSection />
                </div>

                {/* Main Section */}
                <div className="mt-12 flex h-full max-h-[520px] w-full justify-center">
                    {/* Sessions categorized by status */}
                    <div
                        inert={!profile}
                        className={`h-full w-[220px] shrink-0 ${profile ? 'translate-x-0 opacity-100 delay-800' : 'pointer-events-none -translate-x-[400%] opacity-0'} transform-gpu transition-all duration-400 ease-[cubic-bezier(0.34,1.40,0.54,1)]`}
                    >
                        <SessionCategories setCreate={setCreate} />
                    </div>

                    {/* Main Window */}
                    <div
                        className={` ${profile ? 'w-full min-w-[600px]' : 'max-h-[530px] min-h-[525px] w-[450px] min-w-[450px] -translate-y-[20%]'} relative ml-12 transition-all duration-600`}
                    >
                        <div
                            className={`relative flex h-full w-full flex-col bg-[var(--bg-primary)] shadow-[8px_8px_0px_3px_black] outline-[5px]`}
                        >
                            <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-hidden">
                                <svg
                                    className={`absolute -bottom-40 -left-15 z-1 h-90 w-90 fill-[var(--fill-primary-sticker)]`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="-20 0 510 510"
                                >
                                    <path d="M450 210c-26.9 0-36.4-35.6-13.1-49a30 30 0 1 0-30-52c-23.3 13.5-49.3-12.6-36-35.9a30 30 0 0 0-52-30h.1c-13.4 23.3-49 13.8-49-13a30 30 0 1 0-60 0c0 26.8-35.6 36.3-49 13a30 30 0 1 0-52 30c13.5 23.3-12.6 49.4-35.9 36a30 30 0 0 0-30 52c23.3 13.3 13.8 48.9-13 48.9a30 30 0 1 0 0 60c26.8 0 36.3 35.6 13 49a30 30 0 1 0 30 52c23.3-13.5 49.4 12.6 36 35.9a30 30 0 0 0 52 30h-.1c13.4-23.3 49-13.8 49 13a30 30 0 1 0 60 0c0-26.8 35.6-36.3 49-13a30 30 0 1 0 52-30c-13.4-23.3 12.6-49.4 35.9-36a30 30 0 0 0 30-52c-23.3-13.3-13.8-48.9 13.1-48.9a30 30 0 1 0 0-60Z"></path>
                                </svg>
                                <svg
                                    className={`absolute top-20 -right-20 z-1 h-60 w-60 fill-[var(--fill-primary-sticker)]`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 480 480"
                                >
                                    <path d="M120 120h120v120H120zM0 240h120v120H0zM120 360h120v120H120zM0 0h120v120H0zM360 120h120v120H360zM240 240h120v120H240zM360 360h120v120H360zM240 0h120v120H240z"></path>
                                </svg>
                            </div>
                            <div className="relative h-full w-full">
                                {/* View/Create View */}
                                <div
                                    className={`absolute inset-0 transition-all duration-500 ${profile ? 'pointer-events-auto scale-100 opacity-100 delay-300' : 'pointer-events-none scale-95 opacity-0'} `}
                                >
                                    <div></div>
                                    {profile && <SessionDetails />}
                                    {profile && <CreateSession />}
                                </div>

                                {/* Login View */}
                                <div
                                    className={`absolute inset-0 z-20 transition-all duration-500 ${!profile ? 'pointer-events-auto scale-100 opacity-100 delay-400' : 'pointer-events-none scale-90 opacity-0'} `}
                                >
                                    <LoginForm />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Previous Session Window */}
                    <div
                        className={` ${profile ? 'translate-x-0 opacity-100 delay-600' : 'pointer-events-none translate-y-[200%] opacity-0'} relative ml-12 h-full w-[260px] shrink-0 transform-gpu transition-all duration-400 ease-[cubic-bezier(0.34,1.40,0.54,1)]`}
                    >
                        <PreviousSessions />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;

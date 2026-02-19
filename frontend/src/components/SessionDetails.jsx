import { useDispatch, useSelector } from 'react-redux';
import {
    all,
    recent,
    remove,
    start,
    stop,
    pause,
} from '../state/session/sessionThunks';
import { openCreate, initiateUpdate } from '../state/ui/uiSlice';
import { useEffect, useState } from 'react';

export default function SessionDetails() {
    const dispatch = useDispatch();
    const pillColors = [
        'bg-[#ff4107]',
        'bg-[#00ff84]',
        'bg-[#ffa31a]',
        'bg-[#7d60ff]',
        'bg-[#ff2323]',
        'bg-[#1a5cd6]',
        'bg-[#a1f31d]',
        'bg-[#18e6ca]',
        'bg-[#ff4107]',
        'bg-[#00ff84]',
        'bg-[#ffa31a]',
        'bg-[#7d60ff]',
        'bg-[#ff2323]',
        'bg-[#1a5cd6]',
        'bg-[#a1f31d]',
        'bg-[#18e6ca]',
    ];
    const { sessions, activeSession, recentSessions } = useSelector(
        (s) => s.session
    );
    const { theme, createForm } = useSelector((s) => s.ui);
    const { profile } = useSelector((s) => s.user);
    const [formattedTags, setFormattedTags] = useState([]);

    function randomColor() {
        const idx = Math.floor(Math.random() * 14);
        return pillColors[idx];
    }

    useEffect(() => {
        setFormattedTags([]);
        if (activeSession) {
            for (const tag of activeSession.tags) {
                const hex = randomColor();
                setFormattedTags((prev) => [...prev, { text: tag, hex: hex }]);
            }
        }
    }, [activeSession?._id]);

    function handleUpdateButton() {
        dispatch(initiateUpdate());
        dispatch(openCreate());
    }

    function handleDeleteButton() {
        dispatch(remove(activeSession?._id));
        dispatch(openCreate());
    }

    function handleStartButton() {
        if (activeSession?.status === 'planned')
            return dispatch(start(activeSession?._id));
        dispatch(stop(activeSession?._id));
    }

    return (
        <div
            style={{
                '--bg-accent': theme.accent,
                '--bg-accent-hover': theme.accentHover,
                '--fill-primary-sticker': theme.primarySticker,
            }}
            className={`absolute inset-0 flex h-full transform-gpu flex-col transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                !createForm
                    ? 'pointer-events-auto opacity-100 delay-200'
                    : 'pointer-events-none opacity-0'
            } `}
        >
            <div className="flex justify-between">
                <h1 className="w-full border-b-4 bg-[var(--fill-primary-sticker)] px-5 py-2 text-3xl font-black">
                    Session Details
                </h1>
            </div>
            <h1
                title={activeSession?.title}
                className="z-5 mt-3 line-clamp-2 h-fit px-6 text-6xl font-black"
            >
                {activeSession?.title}
            </h1>
            <div className="z-5 mt-3 flex gap-4 px-6">
                {formattedTags.map((t, i) => (
                    <p
                        key={i}
                        className={`w-fit px-2 shadow-[4px_4px_0px_3px_black] outline-[3px] ${t.hex} text-black/85 outline-black`}
                    >
                        {t.text}
                    </p>
                ))}
            </div>

            <div className="z-5 mt-8 mb-2 flex gap-10 px-6">
                <span className="w-55">
                    <p>Status:</p>
                    <p className="relative w-fit pr-2 pl-2 text-4xl">
                        {activeSession?.status}
                        {/* <span className="text-red-600 ml-2 animate-bounce">🔥</span> */}
                    </p>
                </span>
                <span className="w-55">
                    <p>Time:</p>
                    <p className="relative w-fit pr-4 pl-2 text-4xl">
                        {activeSession?.duration < 1
                            ? 0
                            : activeSession?.duration}
                        mins
                    </p>
                </span>
            </div>

            <div className="z-5 mt-auto mb-8 flex w-full flex-col gap-8 px-6 pb-2">
                <div className="mr-3 ml-auto flex w-fit gap-5">
                    {(activeSession?.status === 'active' ||
                        activeSession?.status === 'paused') && (
                        <div className="group relative top-1 hover:cursor-pointer">
                            <span className="block h-11 w-12 text-center text-3xl font-bold text-transparent select-none"></span>
                            <div
                                onClick={() => {
                                    if (activeSession?.status === 'paused')
                                        return dispatch(
                                            start(activeSession?._id)
                                        );
                                    return dispatch(pause(activeSession?._id));
                                }}
                                className={`absolute top-0 left-0 ml-auto bg-[var(--bg-accent)] text-center text-3xl font-bold shadow-[10px_10px_0px_3px_black] outline-[5px] transition-all duration-50 ease-in-out group-hover:translate-x-1 group-hover:translate-y-1 group-hover:cursor-pointer group-hover:bg-[var(--bg-accent-hover)] group-hover:shadow-[6px_6px_0px_3px_black]`}
                            >
                                {activeSession?.status === 'paused' && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="44"
                                        height="44"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M8 19V5l11 7z"
                                        />
                                    </svg>
                                )}
                                {activeSession?.status === 'active' && (
                                    <svg
                                        className="pointer-events-none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="44"
                                        height="44"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M6 19h4V5H6zm8-14v14h4V5z"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Update button */}
                    <div className="group relative px-5 py-2 text-center text-3xl font-bold text-transparent hover:cursor-pointer">
                        Update
                        <div
                            onClick={handleUpdateButton}
                            className={`absolute top-1 left-1 ml-auto bg-[var(--bg-accent)] px-4 py-1 text-center text-3xl font-bold text-black shadow-[10px_10px_0px_3px_black] outline-[5px] transition-all duration-50 ease-in-out group-hover:translate-x-1 group-hover:translate-y-1 group-hover:cursor-pointer group-hover:bg-[var(--bg-accent-hover)] group-hover:shadow-[6px_6px_0px_3px_black]`}
                        >
                            Update
                        </div>
                    </div>

                    {/* Delete button */}
                    <div className="group relative px-5 py-2 text-center text-3xl font-bold text-transparent hover:cursor-pointer">
                        Delete
                        <div
                            onClick={handleDeleteButton}
                            className={`absolute top-1 left-1 bg-[var(--bg-accent)] px-4 py-1 text-center text-3xl font-bold text-black shadow-[10px_10px_0px_3px_black] outline-[5px] transition-all duration-50 ease-in-out group-hover:translate-x-1 group-hover:translate-y-1 group-hover:cursor-pointer group-hover:bg-red-600 group-hover:shadow-[6px_6px_0px_3px_black]`}
                        >
                            Delete
                        </div>
                    </div>
                </div>

                {/* Start/Stop button */}
                {activeSession?.status != 'completed' && (
                    <div className="group relative right-1 mr-3 ml-auto px-5 py-2 text-center text-5xl font-bold text-nowrap text-transparent hover:cursor-pointer">
                        Start Session
                        <div
                            onClick={handleStartButton}
                            className={`absolute top-1 left-1 mr-3 mb-2 w-[395px] bg-[var(--bg-accent)] px-5 py-1 text-center text-5xl font-bold text-black shadow-[10px_10px_0px_3px_black] outline-[5px] transition-all duration-50 ease-in-out group-hover:translate-x-1 group-hover:translate-y-1 group-hover:cursor-pointer group-hover:bg-[var(--bg-accent-hover)] group-hover:shadow-[6px_6px_0px_3px_black]`}
                        >
                            {activeSession?.status === 'planned'
                                ? 'Start Session'
                                : 'Stop Session'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

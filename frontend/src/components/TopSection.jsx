import {
    openProfileModal,
    ThemeModalSwitch,
    closeProfileModal,
} from '../state/ui/uiSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeModal } from './ThemeModal';
import { ProfileUpdateModal } from './ProfileUpdateModal';
import { logout } from '../state/user/userThunks';
import pfp from '../assets/pfp.jpg';

export default function TopSection() {
    const dispatch = useDispatch();
    const { profile } = useSelector((s) => s.user);
    const { theme, modalOpen, profileModal } = useSelector((s) => s.ui);
    const hasPicture = profile?.picture && profile.picture.trim() !== '';

    // useEffect(() => {
    //     console.log('profile changed');
    // }, [profile]);

    function handleModals() {
        if (modalOpen) {
            dispatch(ThemeModalSwitch());
        }
        if (profileModal) {
            dispatch(closeProfileModal());
        }
    }

    return (
        <>
            {(modalOpen || profileModal) && (
                <div
                    onClick={handleModals}
                    className="absolute -top-16 right-1/2 z-10 h-screen w-screen translate-x-1/2"
                ></div>
            )}
            <div
                style={{
                    '--bg-accent': theme.accent,
                    '--bg-accent-hover': theme.accentHover,
                    '--bg-primary': theme.primary,
                    '--fill-primary-sticker': theme.primarySticker,
                }}
                className="relative flex aspect-square w-[85px] shadow-[9px_8px_0px_3px_black] outline-[5px] outline-black transition-all [@media(min-height:765px)]:w-[220px]"
            >
                <img
                    className="w-full object-cover object-center text-white"
                    src={hasPicture ? profile.picture : `${pfp}`}
                    alt="profile picture"
                />

                <div className="absolute top-4 left-[18px] -z-1 flex aspect-square w-[85px] bg-white transition-all [@media(min-height:765px)]:w-[220px]"></div>
                <div className="group relative hover:cursor-pointer">
                    <div
                        onClick={() => dispatch(openProfileModal())}
                        className={`absolute top-[35px] z-0 bg-[var(--bg-accent)] px-8 py-2 text-3xl font-black text-nowrap shadow-[7px_7px_0px_2px_black] outline-[5px] transition-all group-hover:bg-amber-50 [@media(min-height:765px)]:top-[135px] [@media(min-height:765px)]:-left-12`}
                    >
                        Hi {profile ? profile.name : 'User'}
                    </div>

                    {/* ghost div for sizing */}
                    <div className="pointer-events-none absolute top-[35px] -z-1 bg-white px-8 py-2 text-3xl font-black text-nowrap text-transparent transition-all [@media(min-height:765px)]:top-[149px] [@media(min-height:765px)]:-left-[34px]">
                        Hi {profile ? profile.name : 'User'}
                    </div>
                    <ProfileUpdateModal />
                </div>
            </div>

            <div
                style={{
                    '--bg-accent': theme.accent,
                    '--bg-accent-hover': theme.accentHover,
                    '--bg-primary': theme.primary,
                    '--fill-primary-sticker': theme.primarySticker,
                }}
                className="relative flex flex-col gap-5"
            >
                <div className="group absolute right-0 h-8 w-8 hover:cursor-pointer">
                    <svg
                        onClick={() => dispatch(logout())}
                        className={`relative h-8 w-8 shrink-0 bg-[var(--bg-accent)] p-1 shadow-[4px_4px_0px_3px_black] outline-3 transition-discrete duration-50 ease-in-out group-hover:translate-x-1 group-hover:translate-y-1 group-hover:cursor-pointer group-hover:bg-[var(--bg-accent-hover)] group-hover:shadow-[2px_2px_0px_1px_black]`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g fill="none" fillRule="evenodd">
                            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                            <path
                                fill="currentColor"
                                d="M13.5 3a1.5 1.5 0 0 0-3 0v10a1.5 1.5 0 0 0 3 0zM7.854 5.75a1.5 1.5 0 1 0-1.661-2.5A10.49 10.49 0 0 0 1.5 12c0 5.799 4.701 10.5 10.5 10.5S22.5 17.799 22.5 12c0-3.654-1.867-6.87-4.693-8.75a1.5 1.5 0 0 0-1.66 2.5a7.5 7.5 0 1 1-8.292 0Z"
                            />
                        </g>
                    </svg>
                </div>
                <div
                    style={{
                        '--bg-accent': theme.accent,
                        '--bg-accent-hover': theme.accentHover,
                    }}
                    className="group absolute top-13 right-0 z-30 h-8 w-8 hover:cursor-pointer"
                >
                    <svg
                        onClick={() => dispatch(ThemeModalSwitch())}
                        className={`relative z-25 h-fit shrink-0 bg-[var(--bg-accent)] p-1 shadow-[3px_4px_0px_3px_black] outline-3 transition-discrete duration-50 ease-in-out group-hover:translate-x-1 group-hover:translate-y-1 group-hover:cursor-pointer group-hover:bg-[var(--bg-accent-hover)] group-hover:shadow-[2px_2px_0px_1px_black]`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#000000"
                            fillRule="evenodd"
                            d="M5 0h18v8.5H5V5.556A2.25 2.25 0 0 0 5.5 10h9.75v4H18v10h-8V14h2.75v-1.5H5.5A4.75 4.75 0 0 1 5 3.026zm2.5 2.5V6h13V2.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <ThemeModal />
            </div>
        </>
    );
}

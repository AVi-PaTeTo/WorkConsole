import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../state/user/userThunks';
import { closeProfileModal, openProfileModal } from '../state/ui/uiSlice';
import { useEffect, useState } from 'react';
export const ProfileUpdateModal = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        profilePic: '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
    });

    const { profileModal, theme } = useSelector((s) => s.ui);
    const dispatch = useDispatch();
    const [anim, setAnim] = useState(null);

    useEffect(() => {
        if (profileModal) {
            setAnim('animate-open-edit');
        } else if (anim === 'animate-open-edit') {
            setAnim('animate-close-edit');
        }
    }, [profileModal]);

    function handleUserDataUpdate(e) {
        e.preventDefault();
        const filteredData = Object.fromEntries(
            Object.entries(userData).filter(([_, value]) => value !== '')
        );
        dispatch(updateProfile(filteredData));
    }

    function handlePasswordUpdate(e) {
        e.preventDefault();
        dispatch(updateProfile(passwordData));
    }

    return (
        <div
            style={{
                '--bg-accent': theme.accent,
                '--bg-accent-hover': theme.accentHover,
                '--bg-primary': theme.primary,
                '--fill-primary-sticker': theme.primarySticker,
            }}
            className={`${anim} absolute top-[135px] -left-12 z-21 h-0 w-0 overflow-hidden bg-[var(--bg-accent)] transition-all`}
        >
            <span
                className={`${profileModal ? 'opacity-100 delay-500' : 'opacity-0'} transition-all`}
            >
                <span
                    onClick={() => dispatch(closeProfileModal())}
                    className="absolute top-0 right-0 z-10 mt-2 mr-3 bg-red-600 p-1 shadow-[4px_4px_0px_2px_black] outline-3 hover:cursor-pointer hover:bg-red-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        className="pointer-events-none"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="3"
                            d="M20 20L4 4m16 0L4 20"
                        />
                    </svg>
                </span>
                <div className="flex h-[420px] w-[620px] flex-col gap-8 px-5 py-3">
                    <form
                        onSubmit={handleUserDataUpdate}
                        className="flex flex-col gap-2"
                        action=""
                    >
                        <span>
                            <label htmlFor="">Name</label>
                            <br />
                            <input
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        name: e.target.value,
                                    })
                                }
                                value={userData.name}
                                placeholder="your name"
                                className="w-[70%] bg-white px-2 py-1 shadow-[4px_4px_0px_1px_black] outline-3"
                                type="text"
                            />
                        </span>
                        <span>
                            <label htmlFor="">Email</label>
                            <br />
                            <input
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        email: e.target.value,
                                    })
                                }
                                value={userData.email}
                                placeholder="your@email.com"
                                className="w-[70%] bg-white px-2 py-1 shadow-[4px_4px_0px_1px_black] outline-3"
                                type="text"
                            />
                        </span>
                        <span>
                            <label htmlFor="">Profile Picture</label>
                            <br />
                            <input
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        profilePic: e.target.value,
                                    })
                                }
                                value={userData.profilePic}
                                placeholder="paste the url of an image"
                                className="w-full bg-white px-2 py-1 shadow-[4px_4px_0px_1px_black] outline-3"
                                type="text"
                            />
                        </span>
                        <div className="group/userData relative mt-4 ml-auto">
                            {/* ghost span for sizing */}
                            <span className="pointer-events-none block w-fit px-3 text-transparent">
                                Save Changes
                            </span>
                            <button
                                onClick={handleUserDataUpdate}
                                className="absolute top-0 h-fit w-fit bg-white px-3 shadow-[4px_4px_0px_2px_black] outline-3 transition-discrete duration-50 ease-in-out group-hover/userData:translate-x-1 group-hover/userData:translate-y-1 group-hover/userData:cursor-pointer group-hover/userData:shadow-[1px_1px_0px_0px_black]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                    <form
                        onSubmit={handlePasswordUpdate}
                        className="flex flex-col justify-between px-6 pt-2 pb-4 outline-3"
                        action=""
                    >
                        <span className="flex justify-between gap-5">
                            <span>
                                <label htmlFor="">Current Password</label>
                                <br />
                                <input
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            currentPassword: e.target.value,
                                        })
                                    }
                                    value={passwordData.currentPassword}
                                    className="bg-white px-2 py-1 shadow-[4px_4px_0px_1px] outline-3"
                                    type="password"
                                />
                            </span>
                            <span>
                                <label htmlFor="">New Password</label>
                                <br />
                                <input
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            newPassword: e.target.value,
                                        })
                                    }
                                    value={passwordData.newPassword}
                                    className="bg-white px-2 py-1 shadow-[4px_4px_0px_1px] outline-3"
                                    type="password"
                                />
                            </span>
                        </span>
                        <div className="group/password relative mt-5 ml-auto">
                            {/* ghost span for sizing */}
                            <span className="pointer-events-none block w-fit px-3 text-transparent">
                                Update password
                            </span>
                            <button
                                onClick={handlePasswordUpdate}
                                className="absolute top-0 h-fit w-fit bg-white px-3 shadow-[4px_4px_0px_2px_black] outline-3 transition-discrete duration-50 ease-in-out group-hover/password:translate-x-1 group-hover/password:translate-y-1 group-hover/password:cursor-pointer group-hover/password:shadow-[1px_1px_0px_0px_black]"
                            >
                                Update password
                            </button>
                        </div>
                    </form>
                </div>
            </span>
        </div>
    );
};

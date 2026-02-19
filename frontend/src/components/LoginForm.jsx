import { useEffect, useState } from 'react';
import { login, register } from '../state/user/userThunks';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginForm() {
    const { profile, status, error, isAuthenticated } = useSelector(
        (s) => s.user
    );
    const { theme } = useSelector((s) => s.ui);
    const dispatch = useDispatch();
    const [registering, setRegistering] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        setFormData({ name: '', email: '', password: '' });
    }, [profile]);

    function handleChange(e) {
        if (!registering && e.target.id === 'name') {
            return;
        }
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (registering) {
            // if (formData['name'].length < 6) return;

            dispatch(
                register({
                    name: formData['name'],
                    email: formData['email'],
                    password: formData['password'],
                })
            );
            return;
        }
        dispatch(
            login({ email: formData['email'], password: formData['password'] })
        );
    }

    console.log(registering);
    if (!isAuthenticated) {
        return (
            <>
                <div
                    style={{
                        '--bg-accent': theme.accent,
                        '--bg-accent-hover': theme.accentHover,
                        '--fill-primary-sticker': theme.primarySticker,
                    }}
                    className="relative flex h-full flex-col transition-all duration-200"
                >
                    <div className="h-full transition-all transition-discrete">
                        <h1
                            className={`${registering ? 'text-4xl' : 'text-5xl'} mb-4 border-b-4 bg-[var(--fill-primary-sticker)] px-4 py-2`}
                        >
                            {registering ? 'Create Account' : 'Log In'}
                        </h1>

                        {error && (
                            <p className="bg-black p-1 text-center text-xl tracking-wide text-red-500">
                                {error.message}
                            </p>
                        )}

                        <div className="fixed h-fit w-full overflow-hidden px-8 pb-10">
                            <form
                                id="authForm"
                                onSubmit={handleSubmit}
                                className={`${registering ? 'translate-y-0' : '-translate-y-20'} transition-all duration-200 ease-[cubic-bezier(0.34,1.70,0.54,1)]`}
                            >
                                <span
                                    inert={!registering}
                                    className={`mb-3 flex flex-col ${registering ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                >
                                    <label className="text-2xl" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        className="mt-1 h-fit bg-white/90 px-2 py-1 shadow-[8px_8px_0px_3px_black] outline-[5px]"
                                        type="text"
                                        id="name"
                                        required={registering}
                                        value={formData['name']}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </span>

                                <span className="mb-3 flex flex-col">
                                    <label className="text-2xl" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="mt-1 h-fit bg-white/90 px-2 py-1 shadow-[8px_8px_0px_3px_black] outline-[5px]"
                                        type="text"
                                        id="email"
                                        required={true}
                                        value={formData['email']}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </span>

                                <span className="flex flex-col">
                                    <label
                                        className="text-2xl"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        className="mt-1 h-fit bg-white/90 px-2 py-1 shadow-[8px_8px_0px_3px_black] outline-[5px]"
                                        type="password"
                                        id="password"
                                        required={true}
                                        value={formData['password']}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </span>
                            </form>
                        </div>
                    </div>

                    <div className="z-10 mt-17 mb-30 text-center">
                        {registering
                            ? 'Already have an account?'
                            : "Don't have an account?"}
                        <span
                            onClick={() => setRegistering((prev) => !prev)}
                            className="ml-2 text-[var(--fill-primary-sticker)] hover:cursor-pointer"
                        >
                            {registering ? 'Log In' : 'Register'}
                        </span>
                    </div>

                    <div className="absolute bottom-5 -left-1/2 h-25 w-[800px] overflow-hidden">
                        <div
                            className={` ${profile ? 'animate-slide-out' : 'animate-slide-in'} group relative bottom-6 left-100 mt-12 ml-auto h-fit w-fit hover:cursor-pointer`}
                        >
                            <span className="block w-[205px] px-4 py-1 text-center text-5xl font-bold text-transparent">
                                Log In
                            </span>
                            <button
                                type="submit"
                                form="authForm"
                                disabled={status === 'loading'}
                                className={`absolute top-0 mr-6 mb-2 ml-auto w-[205px] bg-[var(--bg-accent)] px-4 py-1 text-center text-5xl font-bold shadow-[10px_10px_0px_3px_black] outline-[5px] outline-black transition-all duration-50 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:cursor-pointer group-hover:bg-[var(--bg-accent-hover)] group-hover:shadow-[6px_6px_0px_3px_black]`}
                            >
                                {registering ? 'Create' : 'Log In'}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

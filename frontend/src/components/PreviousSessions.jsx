import { useSelector, useDispatch } from 'react-redux';
import { getById } from '../state/session/sessionThunks';
import { closeCreate, endUpdate } from '../state/ui/uiSlice';

export default function PreviousSessions() {
  const dispatch = useDispatch();
  const { theme, createForm } = useSelector((s) => s.ui);
  const { recentSessions, activeSession } = useSelector((s) => s.session);

  function openSession(id) {
    if (createForm) dispatch(closeCreate());
    if (activeSession?._id === id) return;
    dispatch(getById(id));
    dispatch(closeCreate());
    dispatch(endUpdate());
  }

  return (
    <div
      style={{
        '--bg-accent': theme.accent,
        '--bg-accent-hover': theme.accentHover,
        '--bg-primary': theme.primary,
        '--fill-primary-sticker': theme.primarySticker,
      }}
      className={`relative h-full overflow-hidden bg-[var(--bg-primary)] shadow-[8px_8px_0px_3px_black] outline-[5px]`}
    >
      <svg
        className={`absolute -right-27 -bottom-7 z-1 h-40 w-40 rotate-180 fill-[var(--fill-primary-sticker)]`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 480 480"
      >
        <path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path>
      </svg>
      <svg
        className={`absolute right-0 bottom-18 z-1 h-40 w-40 fill-[var(--fill-primary-sticker)]`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 480 480"
      >
        <path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path>
      </svg>
      <svg
        className={`absolute -right-27 bottom-43 z-1 h-40 w-40 rotate-180 fill-[var(--fill-primary-sticker)]`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 480 480"
      >
        <path d="M240 0 120 120l120 120-120 120 120 120 240-240L240 0z"></path>
      </svg>

      <div className="relative z-10 flex h-full flex-col">
        <h1 className="border-b-4 bg-[var(--fill-primary-sticker)] px-5 py-3 text-xl font-black">
          Recent Sessions
        </h1>
        <ul className="hide-scrollbar stripes relative z-5 h-full w-full overflow-y-auto">
          {recentSessions && recentSessions.length < 1 ? (
            <li className="w-full px-6 py-2 text-center text-black/50">
              No recent sessions
            </li>
          ) : (
            recentSessions.map((s) => (
              <li
                onClick={() => openSession(s._id)}
                key={s._id}
                className="relative z-10 w-full bg-[var(--fill-primary-sticker)]/20 py-2 font-semibold transition-all hover:scale-110 hover:cursor-pointer"
              >
                <span className="block px-6">{s.title}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

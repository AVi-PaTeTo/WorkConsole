import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getById } from '../state/session/sessionThunks';
import { openCreate, closeCreate, endUpdate } from '../state/ui/uiSlice';

export default function SessionCategories(props) {
  const dispatch = useDispatch();
  const [tabOpen, setTabOpen] = useState(null);
  const { theme, createForm } = useSelector((s) => s.ui);
  const { sessions, recentSessions, activeSession } = useSelector(
    (s) => s.session
  );

  useEffect(() => {}, [sessions]);

  function handleTab(e) {
    if (e.target.id === tabOpen && tabOpen != null) {
      setTabOpen(null);
    } else {
      setTabOpen(e.target.id);
    }
  }

  function openSession(id) {
    if (createForm) dispatch(closeCreate());
    if (activeSession?._id === id) return;
    dispatch(getById(id));
    dispatch(closeCreate());
    dispatch(endUpdate());
  }

  return (
    <>
      <div
        style={{
          '--bg-accent': theme.accent,
          '--bg-accent-hover': theme.accentHover,
          '--bg-primary': theme.primary,
          '--fill-primary-sticker': theme.primarySticker,
        }}
        className={`relative h-[330px] w-[220px] bg-[var(--bg-primary)] shadow-[8px_8px_0px_3px_black] outline-[5px]`}
      >
        <h1 className="border-b-4 bg-[var(--fill-primary-sticker)] px-5 py-2 text-2xl font-black">
          Sessions
        </h1>
        <ul className="mt-3 px-5">
          {/* Active Tab */}
          <li className="group mb-2 outline-3 transition-all duration-200">
            <span
              id="active"
              onClick={(e) => handleTab(e)}
              className="flex bg-[var(--fill-primary-sticker)]/70 px-1 outline-3 hover:cursor-pointer"
            >
              Active
              <svg
                className={`pointer-events-none ml-auto h-6 w-6 shrink-0 rotate-90 transition-all duration-200 ease-in-out ${tabOpen === 'active' ? '' : 'scale-x-[-1]'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="M16 19L5 12l11-7z" />
              </svg>
            </span>
            {sessions && sessions.active.length === 0 ? (
              <div
                className={`${tabOpen === 'active' ? 'h-40' : 'h-0'} flex justify-center overflow-hidden transition-all duration-200`}
              >
                <p className="flex h-40 items-center text-black/50">
                  No active sessions
                </p>
              </div>
            ) : (
              <ul
                className={`${tabOpen === 'active' ? 'h-40' : 'h-0'} hide-scrollbar stripes flex w-full flex-col overflow-y-scroll transition-all duration-200`}
              >
                {sessions &&
                  sessions.active.map((s) => (
                    <li
                      key={s._id}
                      onClick={() => openSession(s._id)}
                      className="bg-[var(--fill-primary-sticker)]/20 py-1 pl-3 transition-all hover:scale-105 hover:cursor-pointer"
                    >
                      {s.title}
                    </li>
                  ))}
              </ul>
            )}
          </li>

          {/* Planned Tab */}
          <li className="group mb-2 outline-3 transition-all duration-200">
            <span
              id="planned"
              onClick={(e) => handleTab(e)}
              className="flex bg-[var(--fill-primary-sticker)]/70 px-1 outline-3 hover:cursor-pointer"
            >
              Planned
              <svg
                className={`pointer-events-none ml-auto h-6 w-6 shrink-0 rotate-90 transition-all duration-200 ease-in-out ${tabOpen === 'planned' ? '' : 'scale-x-[-1]'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="M16 19L5 12l11-7z" />
              </svg>
            </span>
            <ul
              className={`${tabOpen === 'planned' ? 'h-40' : 'h-0'} hide-scrollbar stripes flex w-full flex-col overflow-y-scroll transition-all duration-200`}
            >
              {sessions && sessions.planned.length === 0 ? (
                <div
                  className={`${tabOpen === 'planned' ? 'h-40' : 'h-0'} flex justify-center overflow-hidden transition-all duration-200`}
                >
                  <p className="flex h-40 items-center text-center text-black/50">
                    No planned sessions
                  </p>
                </div>
              ) : (
                sessions &&
                sessions.planned.map((s) => (
                  <li
                    key={s._id}
                    onClick={() => openSession(s._id)}
                    className="bg-[var(--fill-primary-sticker)]/20 py-1 pl-3 transition-all hover:scale-105 hover:cursor-pointer"
                  >
                    {s.title}
                  </li>
                ))
              )}
            </ul>
          </li>

          {/* Completed Tab */}
          <li className="group mb-2 outline-3 transition-all duration-200">
            <span
              id="completed"
              onClick={(e) => handleTab(e)}
              className="flex bg-[var(--fill-primary-sticker)]/70 px-1 outline-3 hover:cursor-pointer"
            >
              Completed
              <svg
                className={`pointer-events-none ml-auto h-6 w-6 shrink-0 rotate-90 transition-all duration-200 ease-in-out ${tabOpen === 'completed' ? '' : 'scale-x-[-1]'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="M16 19L5 12l11-7z" />
              </svg>
            </span>

            <ul
              className={`${tabOpen === 'completed' ? 'h-40 ' : 'h-0'} hide-scrollbar stripes flex w-full flex-col overflow-y-scroll transition-all duration-200`}
            >
              {sessions && sessions.completed.length === 0 ? (
                <div
                  className={`${tabOpen === 'completed' ? 'h-40' : 'h-0'} flex justify-center overflow-hidden transition-all duration-200`}
                >
                  <p className="flex h-40 items-center text-center text-black/50">
                    No completed sessions
                  </p>
                </div>
              ) : (
                sessions &&
                sessions.completed.map((s) => (
                  <li
                    key={s._id}
                    onClick={() => openSession(s._id)}
                    className="bg-[var(--fill-primary-sticker)]/20 py-1 pl-3 transition-all hover:scale-105 hover:cursor-pointer"
                  >
                    {s.title}
                  </li>
                ))
              )}
            </ul>
          </li>
        </ul>
      </div>

      {/* Create Session Button */}
      <div
        inert={createForm}
        onClick={() => dispatch(openCreate())}
        className={`${!createForm ? 'opacity-100' : 'pointer-events-none scale-0'} group relative z-5 mt-12 transition-all ease-[cubic-bezier(0.34,1.40,0.54,1)] hover:cursor-pointer`}
      >
        <span className="block w-[220px] py-1 text-center text-2xl font-bold text-transparent outline select-none">
          Create Session
        </span>
        <div
          onClick={() => dispatch(openCreate())}
          className={`absolute top-0 left-0 w-[220px] translate-x-0 translate-y-0 bg-[var(--bg-accent)] py-1 text-center text-2xl font-bold shadow-[10px_10px_0px_3px_black] outline-5 transition-all duration-100 ease-in-out group-hover:translate-x-1 group-hover:translate-y-1 group-hover:cursor-pointer group-hover:bg-[var(--bg-accent-hover)] group-hover:shadow-[6px_6px_0px_3px_black]`}
        >
          Create Session
        </div>
      </div>
    </>
  );
}

import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create, patch } from '../state/session/sessionThunks';
import { closeCreate, endUpdate } from '../state/ui/uiSlice';

export default function CreateSession() {
  const pillColors = [
    'bg-[#ff4107]',
    'bg-[#00ff84]',
    'bg-[#ffa31a]',
    'bg-[#7d60ff]',
    'bg-[#ff2323]',
    'bg-[#1a5cd6]',
    'bg-[#a1f31d]',
    'bg-[#18e6ca]',
  ];
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { theme, createForm, updatingSession } = useSelector((s) => s.ui);
  const { activeSession } = useSelector((s) => s.session);

  function addTag(e) {
    e.preventDefault();
    if (tagInput) {
      if (tags.length === 6) {
        alert('max 6 tags allowed');
        return;
      }
      const hex = randomColor();
      const text = tagInput;
      setTags((prev) => [...prev, { text, hex }]);
      setTagInput('');
    }
  }

  function removeTag(index) {
    setTags((prev) => prev.filter((x, i) => i != index));
  }

  function randomColor() {
    const idx = Math.floor(Math.random() * 7);
    return pillColors[idx];
  }

  function handleSave() {
    if (tags.length < 1 || title.length < 6) return;
    const tagText = tags.map((t) => t.text);

    if (updatingSession) {
      dispatch(
        patch({
          Id: activeSession._id,
          updateData: { title: title, tags: tagText },
        })
      );
      dispatch(endUpdate());
    } else {
      dispatch(create({ title: title, tags: tagText }));
    }

    dispatch(closeCreate());
  }

  useEffect(() => {
    if (updatingSession) {
      setTitle(activeSession.title);
      setTags(
        activeSession.tags.map((t) => {
          const hex = randomColor();
          return { text: t, hex };
        })
      );
    } else {
      setTitle('');
      setTags([]);
    }
  }, [updatingSession]);

  return (
    <div
      style={{
        '--bg-accent': theme.accent,
        '--bg-accent-hover': theme.accentHover,
        '--fill-primary-sticker': theme.primarySticker,
      }}
      className={`absolute inset-0 flex h-full transform-gpu flex-col transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        createForm
          ? 'pointer-events-auto opacity-100 delay-200'
          : 'pointer-events-none opacity-0'
      } `}
    >
      <h1 className="border-b-4 bg-[var(--fill-primary-sticker)] px-5 py-2 text-3xl font-black">
        {updatingSession ? 'Update' : 'Create'} Session
      </h1>
      <div className="z-5 mt-3 flex h-full flex-col gap-5 px-6 pb-4">
        <span className="mt-1">
          <label className="text-2xl" htmlFor="title">
            Title
          </label>
          <br></br>
          <input
            className="mt-1 h-fit w-[500px] bg-white/90 px-2 py-3 text-xl shadow-[8px_8px_0px_3px_black] outline-[5px]"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </span>
        <div className="">
          <span className="flex items-baseline gap-2">
            <h1 className="text-2xl" htmlFor="tags">
              Tags
            </h1>
            <p className="text-sm text-black/60">
              (press enter to register a tag)
            </p>
          </span>
          <form
            onClick={() => inputRef.current?.focus()}
            onSubmit={addTag}
            className="mt-2 flex w-[500px] flex-wrap items-center gap-2 bg-white/90 px-2 py-2 shadow-[8px_8px_0px_3px_black] outline-[5px] hover:cursor-text"
          >
            {tags.map((t, i) => (
              <div
                key={i}
                className={`mr-2 mb-2 flex h-fit w-fit items-center gap-1 pl-2 shadow-[4px_4px_0px_3px_black] outline-[3px] ${t.hex} text-black/85 outline-black hover:cursor-default`}
              >
                {t.text}
                <svg
                  onClick={() => removeTag(i)}
                  className="hover:cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    stroke-width="2"
                    d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07"
                  />
                </svg>
              </div>
            ))}
            <div className="relative my-1 flex w-fit items-center">
              <input
                ref={inputRef}
                className="absolute inset-0 py-1 text-xl outline-none"
                maxLength={12}
                type="text"
                name="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <span className="invisible px-2 text-xl whitespace-pre">
                {tagInput ? tagInput : 'tags'}
              </span>
            </div>
          </form>
        </div>
        <div className="z-5 mt-auto mb-8 flex w-full flex-col gap-10">
          <div className="mr-6 ml-auto flex w-fit gap-10">
            <div className="group relative hover:cursor-pointer">
              <span className="px-4 py-1 text-center text-3xl font-bold text-transparent select-none">
                Save
              </span>
              <div
                onClick={handleSave}
                className={`absolute top-0 left-0 ml-auto bg-[var(--bg-accent)] px-4 py-1 text-center text-3xl font-bold shadow-[10px_10px_0px_3px_black] outline-[5px] transition-all duration-50 ease-in-out group-hover:translate-x-1 group-hover:translate-y-1 group-hover:cursor-pointer group-hover:bg-[var(--bg-accent-hover)] group-hover:shadow-[6px_6px_0px_3px_black]`}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

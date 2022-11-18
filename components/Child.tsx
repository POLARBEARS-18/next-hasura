import { FC, FormEvent, memo } from 'react';

interface ChildProps {
  printMsg: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export const Child: FC<ChildProps> = memo(({ printMsg, handleSubmit }) => (
  <>
    <p>Child Component</p>
    <button
      onClick={printMsg}
      type="button"
      className="my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
    >
      click
    </button>
  </>
));

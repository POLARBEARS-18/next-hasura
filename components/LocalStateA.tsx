import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { todoVar } from '../cache';

const LocalStateA: FC = () => {
  const [input, setInput] = useState('');
  const todos = useReactiveVar(todoVar);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    todoVar([...todoVar(), { title: input }]);
    setInput('');
  };

  return (
    <>
      <p className="mb-3 font-bold">makeVar</p>
      {todos?.map((task, index) => (
        <p className="mb-3 gap-y-1" key={index.valueOf()}>
          {task.title}
        </p>
      ))}
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
        <input
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          placeholder="New task ?"
          className="mb-3 px-3 py-2 border border-gray-300"
        />
        <button
          disabled={!input}
          className="disabled:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          type="submit"
        >
          Add new state
        </button>
      </form>
      <Link href="/local-state-b">
        <p>Next</p>
      </Link>
    </>
  );
};

export default LocalStateA;

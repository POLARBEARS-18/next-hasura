import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';
import { FC } from 'react';
import { todoVar } from '../cache';

const LocalStateB: FC = () => {
  const todos = useReactiveVar(todoVar);

  return (
    <>
      {todos.map((task, index) => (
        <p className="mb-3" key={index.valueOf()}>
          {task.title}
        </p>
      ))}
      <Link href="/local-state-a">
        <a>Back</a>
      </Link>
    </>
  );
};

export default LocalStateB;

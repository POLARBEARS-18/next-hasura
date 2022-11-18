import { useMutation } from '@apollo/client';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { CREATE_USER } from '../queries/queries';
import { CreateUserMutation } from '../types/generated/graphql';

export const useCreateForm = () => {
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  /* eslint-disable */
  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    // @ts-ignore anyを無視
    update(cache, { data: { insert_users_one } }) {
      const cacheId = cache.identify(insert_users_one);
      cache.modify({
        fields: {
          users(existingUsers, { toReference }) {
            // @ts-ignore
            return [toReference(cacheId), ...existingUsers];
          },
        },
      });
    },
  });
  /* eslint-disable */
  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);
  const usernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);
  const printMsg = useCallback(() => {
    console.log('Hello');
  }, []);
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await insert_users_one({
          variables: {
            name: username,
          },
        });
      } catch (err) {
        alert(err);
      }
      setUsername('');
    },
    [username]
  );
  return {
    text,
    handleSubmit,
    username,
    usernameChange,
    printMsg,
    handleTextChange,
  };
};

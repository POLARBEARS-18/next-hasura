import { useMutation, useQuery } from '@apollo/client';
import { FC, FormEvent, useState } from 'react';
import Layout from '../components/Layout';
import UserItem from '../components/UserItem';
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from '../queries/queries';
import { CreateUserMutation, DeleteUserMutation, GetUsersQuery, UpdateUserMutation } from '../types/generated/graphql';

const HasuraCRUD: FC = () => {
  const [editedUser, setEditedUser] = useState({ id: '', name: '' });
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  });
  /* eslint-disable */
  const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER);
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
  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    // @ts-ignore anyを無視
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        fields: {
          users(existingUsers, { readField }) {
            // @ts-ignore anyを無視
            return existingUsers.filter((user) => delete_users_by_pk.id !== readField('id', user));
          },
        },
      });
    },
  });
  /* eslint-enable */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editedUser.id) {
      try {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        });
      } catch (err) {
        alert(err);
      }
      setEditedUser({ id: '', name: '' });
    } else {
      try {
        await insert_users_one({
          variables: {
            name: editedUser.name,
          },
        });
      } catch (err) {
        alert(err);
      }
      setEditedUser({ id: '', name: '' });
    }
  };
  if (error) return <Layout title="Hasura CRUD">Error: {error.message}</Layout>;
  return (
    <Layout title="Hasura CRUD">
      <p className="mb-3 font-bold">Hasura CRUD</p>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
        <input
          className="px-3 py-2 border border-gray-300"
          placeholder="New user ?"
          type="text"
          value={editedUser.name}
          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
        />
        <button
          disabled={!editedUser.name}
          className="disabled:opacity-40 my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          data-testid="new"
          type="submit"
        >
          {editedUser.id ? 'Update' : 'Create'}
        </button>
      </form>

      {data?.users.map((user) => (
        /* @ts-expect-error DeleteUserMutationFnを割り当てる */
        <UserItem user={user} setEditedUser={setEditedUser} delete_users_by_pk={delete_users_by_pk} key={user.id} />
      ))}
    </Layout>
  );
};

export default HasuraCRUD;

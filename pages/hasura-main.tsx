import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { FC } from 'react';
import Layout from '../components/Layout';
import { GET_USERS } from '../queries/queries';
import { GetUsersQuery } from '../types/generated/graphql';

const HasuraMain: FC = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    // fetchPolicy: 'network-only',
    // fetchPolicy: 'cache-first', // サーバーサイドから取得する値が殆ど変わらない場合など
    fetchPolicy: 'no-cache',
  });
  if (error)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error?.message}</p>
      </Layout>
    );

  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>
      {data?.users.map((user) => (
        <p key={user.id} className="my-1">
          {user.name}
        </p>
      ))}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  );
};

export default HasuraMain;

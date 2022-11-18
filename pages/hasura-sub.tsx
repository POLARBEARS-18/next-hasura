import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { FC } from 'react';
import Layout from '../components/Layout';
import { GET_USERS_LOCAL } from '../queries/queries';
import { GetUsersQuery } from '../types/generated/graphql';

const HasuraSub: FC = () => {
  const { data } = useQuery<GetUsersQuery>(GET_USERS_LOCAL);

  return (
    <Layout title="Hasura fetchPolicy read cache">
      <p>Direct read out from cache</p>
      {data?.users.map((user) => (
        <p className="my-1">{user.name}</p>
      ))}
      <Link href="/hasura-main">
        <a className="mt-6">Back</a>
      </Link>
    </Layout>
  );
};

export default HasuraSub;

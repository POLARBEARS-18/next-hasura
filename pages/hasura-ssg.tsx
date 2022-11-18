import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import Layout from '../components/Layout';
import { initializeApollo } from '../lib/apolloClient';
import { GET_USERS } from '../queries/queries';
import { GetUsersQuery, Users } from '../types/generated/graphql';

interface HasuraSSGProps {
  users: ({
    __typename?: 'users';
  } & Pick<Users, 'id' | 'name' | 'created_at'>)[];
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetUsersQuery>({
    query: GET_USERS,
  });
  return {
    props: { users: data.users },
    revalidate: 1,
  };
};

const HasuraSSG: FC<HasuraSSGProps> = ({ users }) => (
  <Layout title="Hasura SSG">
    <a className="mb-3 font-bold">SSG+ISR</a>
    {users.map((user) => (
      <Link href={`/users/${user.id}`} key={user.id}>
        <a className="my-1 cursor-pointer" data-testid={`link-${user.id}`}>
          {user.name}
        </a>
      </Link>
    ))}
  </Layout>
);

export default HasuraSSG;

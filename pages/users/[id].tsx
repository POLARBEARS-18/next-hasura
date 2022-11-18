import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import Layout from '../../components/Layout';
import { initializeApollo } from '../../lib/apolloClient';
import { GET_USER_BY_ID, GET_USER_IDS } from '../../queries/queries';
import { GetUserByIdQuery, GetUserIdsQuery, Users } from '../../types/generated/graphql';

interface UserDetailProps {
  user: {
    __typename?: 'users';
  } & Pick<Users, 'id' | 'name' | 'created_at'>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetUserIdsQuery>({
    query: GET_USER_IDS,
  });
  const paths = data.users.map((user) => ({
    params: {
      id: user.id,
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<GetUserByIdQuery>({
    query: GET_USER_BY_ID,
    variables: { id: params!.id },
  });

  return {
    props: {
      user: data.users_by_pk,
    },
    revalidate: 1,
  };
};

const UserDetail: FC<UserDetailProps> = ({ user }) => {
  if (!user) {
    return <Layout title="loading">Loading...</Layout>;
  }
  return (
    <Layout title={user.name}>
      <p className="text-xl font-bold">User detail</p>
      <p className="m-4">
        {'ID : '}
        {user.id}
      </p>
      <p className="mb-4 text-xl font-bold">{user.name}</p>
      <p className="mb-12">{user.created_at}</p>
      <Link href="/hasura-ssg">
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            data-testid="auth-to-main"
            className="w-6 h-6 mr-3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
          </svg>
          <span data-testid="back-to-main">Back to main-ssg-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default UserDetail;

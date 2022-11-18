declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_HASURA_KEY: string;
    readonly NEXT_PUBLIC_HASURA_URL: string;
  }
}

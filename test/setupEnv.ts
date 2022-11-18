import { loadEnvConfig } from '@next/env';

export const setupEnv = async (): Promise<void> => {
  loadEnvConfig(process.env.PWD || process.cwd());
};

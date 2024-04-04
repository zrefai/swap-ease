import dotenv from 'dotenv';

dotenv.config();

export function verifyEnvVariables(keys: string[]) {
  for (const key of keys) {
    if (process.env[key] === undefined || process.env[key]?.length === 0) {
      throw new Error(
        `Environment variables ${key} is either undefined or empty`
      );
    }
  }
}

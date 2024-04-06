/**
 * Verifies that all env variables within keys is available.
 * @param keys Environment variable keys
 */
export function verifyEnvVariables(keys: string[]) {
  for (const key of keys) {
    if (process.env[key] === undefined || process.env[key]?.length === 0) {
      throw new Error(
        `Environment variables ${key} is either undefined or empty`,
      );
    }
  }
}

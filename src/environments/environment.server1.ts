import { baseEnv } from "./environment.base";

/**
 * Server 1 specific envs
 */
export const server1Env: Partial<typeof baseEnv> = {
	apiBaseURL: "https://jsonplaceholder.typicode.com",
};

export const environment = Object.assign(baseEnv, server1Env);

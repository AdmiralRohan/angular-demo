/**
 * By default, using prod settings. \
 * Type of baseEnv will be used as guiding principles for other sub-env files. That will help in type-checking. \
 * Don't use it directly, use any server specific env file.
 */
export const baseEnv = {
	/**
	 * If using in production
	 */
	production: true,
	/**
	 * baseURL of server
	 */
	apiBaseURL: "",
	perPage: {
		posts: 5,
		photos: 5,
		albums: 5,
	},
};

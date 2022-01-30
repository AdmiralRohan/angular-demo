import { SortDirection } from "./sort-direction";

/**
 * List of available query params
 */
export interface QueryParams {
	/**
	 * Search term
	 */
	search: string;
	/**
	 * Which page user currently in
	 */
	page: number;
	/**
	 * Filter posts by user or title?
	 */
	filterBy: string;
	sort?: SortDirection;
}

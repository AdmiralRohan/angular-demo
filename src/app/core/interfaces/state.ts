import { Album } from "./album";
import { Photo } from "./photo";
import { Post } from "./post";
import { QueryParams } from "./query-params";
import { SortDirection } from "./sort-direction";
import { User } from "./user";

export interface State {
	/**
	 * Holds post list from API
	 */
	posts: Post[];
	/**
	 * Initially list from API is filtered out by search term (if any)
	 */
	filteredPosts: Post[];
	/**
	 * Currently in view. \
	 * Filtered posts are paginated.
	 */
	paginatedPosts: Post[];
	/**
	 * Used to sort post list \
	 * Need to use store for this as we are not calling route instance inside component
	 */
	postSortDirection: SortDirection;
	/**
	 * List of query params. Storing at a centralized location for easier filtering purposes. \
	 * We will update the query params and subscribe to param changes. Then filtering will happen from one place. \
	 * Will reuse for all pages.
	 */
	queryParams: QueryParams;
	/**
	 * Holds photo list from API
	 */
	photos: Photo[];
	/**
	 * Initially list from API is filtered out by search term (if any)
	 */
	filteredPhotos: Photo[];
	/**
	 * Filtered photos are paginated and used in view
	 */
	paginatedPhotos: Photo[];
	/**
	 * Holds album list from API
	 */
	albums: Album[];
	/**
	 * Initially list from API is filtered out by search term (if any)
	 */
	filteredAlbums: Album[];
	/**
	 * Filtered albums are paginated and used in view
	 */
	paginatedAlbums: Album[];
	/**
	 * Holds user list from API
	 */
	users: User[];
}

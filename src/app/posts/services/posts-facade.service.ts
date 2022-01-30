import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, first, map, Observable } from "rxjs";
import { DataService } from "../../core/http/data/data.service";
import { PaginationRange } from "../../core/interfaces/pagination-range";
import { Post } from "../../core/interfaces/post";
import { QueryParams } from "../../core/interfaces/query-params";
import { SearchTermChangeEvent } from "../../core/interfaces/search-term-change-event";
import { SortDirection } from "../../core/interfaces/sort-direction";
import { Store } from "../../core/store";

/**
 * Interacting with http and store layer
 */
@Injectable({
	providedIn: "root",
})
export class PostsFacadeService {
	constructor(
		private _dataService: DataService,
		private _store: Store,
		private _router: Router,
		private _route: ActivatedRoute,
	) {}

	get filteredPosts$(): Observable<Post[]> {
		return this._store.select("filteredPosts");
	}
	get queryParams$(): Observable<QueryParams> {
		return this._store.select("queryParams");
	}
	get paginatedPosts$(): Observable<Post[]> {
		return this._store.select("paginatedPosts");
	}
	get sortDirection(): SortDirection {
		return this._store.getLatestValue("postSortDirection");
	}

	/**
	 * Fetch and save post list in store
	 */
	fetchAndSavePostList() {
		this._dataService.fetchPostList().subscribe((postListFromAPI) => {
			// this._store.set("paginatedPosts", postListFromAPI);
			this._store.set("filteredPosts", postListFromAPI);
			this._store.set("posts", postListFromAPI);
		});
	}

	search(searchTermChangeEvent: SearchTermChangeEvent) {
		const isStringMatching = (targetStr: string, searchTerm: string) => {
			return targetStr.toString().toLowerCase().includes(searchTerm.toLowerCase());
		};

		this._store
			.select("posts")
			.pipe(
				filter((posts: Post[]) => posts.length > 0),
				first(),
				map((posts: Post[]) => {
					return searchTermChangeEvent.searchTerm
						? posts.filter((post) => {
								const { selectedFilter } = searchTermChangeEvent;

								// TODO: Hack to fix `No index signature with a parameter of type 'string' was found on type 'Post'` (ts7053)
								return isStringMatching(
									(post as any)[selectedFilter],
									searchTermChangeEvent.searchTerm,
								);
						  })
						: posts;
				}),
			)
			.subscribe((filteredPosts) => {
				this._store.set("filteredPosts", filteredPosts);
				this.paginate({ startIndex: 0, endIndex: 4 });
			});
	}

	// * Sorting on both directions
	/**
	 * Update queryParams on store
	 */
	sort() {
		// const paginatedList: Post[] = this._store.getLatestValue("paginatedPosts");
		const postSortDirection: SortDirection = this._store.getLatestValue("postSortDirection");
		const newSortDirection = postSortDirection === "asc" ? "desc" : "asc";
		this._store.set("postSortDirection", newSortDirection);

		// const sortedList = paginatedList.sort((a, b) =>
		// 	postSortDirection === "asc" ? b.id - a.id : a.id - b.id,
		// );
		// this._store.set("filteredPosts", sortedList);
	}

	changeSortDirection(sortDirection: SortDirection) {
		this._store.set("postSortDirection", sortDirection);
	}

	paginate(paginationRange: PaginationRange) {
		const filteredList: Post[] = this._store.getLatestValue("filteredPosts");
		const paginatedList = filteredList.filter(
			(_: Post, index: number) =>
				index >= paginationRange.startIndex && index <= paginationRange.endIndex,
		);
		console.log(paginationRange, paginatedList);
		// setTimeout(() => {
		this._store.set("paginatedPosts", paginatedList);
		// }, 5000);
	}

	/**
	 * Update store
	 * @param newParams
	 */
	appendToQueryParams(newParams: Partial<QueryParams>) {
		const queryParams = this._store.getLatestValue("queryParams");
		this._store.set("queryParams", { ...queryParams, ...newParams });
	}

	/**
	 * Subscribe to store \
	 * Called from component
	 */
	addQueryParamsToRoute() {
		this._store.select("queryParams").subscribe((params) => {
			// It will trigger list filtering
			if (Object.keys(params).length) {
				this._router.navigate([], {
					relativeTo: this._route,
					queryParams: params,
				});
			}
		});
	}

	/**
	 * Called from component
	 */
	listenToQueryParamsChange() {
		let isFirstTime = true;
		this._route.queryParams.subscribe((params) => {
			// this.searchStrFromUrl = queryParams["search"];
			// this.filterByFromUrl = queryParams["filterBy"];
			// this.currentPage = +queryParams["page"] || 1;

			// Convert angular's native param to our interface type
			// console.log(params);

			const queryParams: QueryParams = {
				search: params["search"] || "",
				filterBy: params["filterBy"] || "",
				page: +params["page"] || 1,
				sort: params["sort"],
			};
			// const queryParams = Object.keys(params).map((param) => {
			// 	const value = params[param];
			// 	console.log(param, value);
			// });
			if (isFirstTime) {
				isFirstTime = false;
				this.appendToQueryParams(queryParams);
			}

			this._filterList(queryParams);
			// this.postsFacade.search({
			// 	searchTerm: this.searchStrFromUrl,
			// 	selectedFilter: this.filterByFromUrl,
			// });
		});
	}

	/**
	 * Filter and save list in store, based on queryparams
	 * @param queryParams
	 */
	private _filterList(queryParams: QueryParams) {
		console.log("Route param changed", queryParams);

		const isStringMatching = (targetStr: string, searchTerm: string) => {
			return targetStr.toString().toLowerCase().includes(searchTerm.toLowerCase());
		};

		// const paginateAndSave = (filteredPosts: Post[]) => {
		// 	this._store.set("filteredPosts", filteredPosts);
		// };

		this._store
			.select("posts")
			.pipe(
				filter((posts: Post[]) => posts.length > 0),
				first(),
				map((posts: Post[]) => {
					return queryParams.search
						? posts.filter((post) => {
								// TODO: Hack to fix `No index signature with a parameter of type 'string' was found on type 'Post'` (ts7053)
								return isStringMatching((post as any)[queryParams.filterBy], queryParams.search);
						  })
						: posts;
				}),
			)
			.subscribe((filteredPosts) => {
				// this._store.set("filteredPosts", filteredPosts);
				// this.paginate({ startIndex: 0, endIndex: 4 });

				// const postSortDirection: SortDirection = this._store.getLatestValue("postSortDirection");
				// console.log(queryParams.sort);

				if (queryParams.sort) {
					const newSortDirection = queryParams.sort === "asc" ? "desc" : "asc";
					this._store.set("postSortDirection", newSortDirection);

					const sortedList = filteredPosts.sort((a, b) =>
						newSortDirection === "asc" ? b.id - a.id : a.id - b.id,
					);
					this._store.set("filteredPosts", sortedList);
					if (sortedList.length === 0) this._store.set("paginatedPosts", []);
				} else {
					this._store.set("filteredPosts", filteredPosts);
					if (filteredPosts.length === 0) this._store.set("paginatedPosts", []);
				}
			});
	}

	// paginate(paginationRange: PaginationRange) {
	// 	console.log(paginationRange);

	// }
}

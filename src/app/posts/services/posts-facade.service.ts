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
	// get paginatedPosts$(): Observable<Post[]> {
	// 	return this._store.select("paginatedPosts");
	// }
	// get postSortDirection$(): Observable<SortDirection> {
	// 	return this._store.select("postSortDirection");
	// }

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
		// this._store.set("paginatedPosts", paginatedList);
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
		this._route.queryParams.subscribe((queryParams) => {
			// this.searchStrFromUrl = queryParams["search"];
			// this.filterByFromUrl = queryParams["filterBy"];
			// this.currentPage = +queryParams["page"] || 1;

			if (isFirstTime) {
				isFirstTime = false;
				this.appendToQueryParams(queryParams);
			}

			console.log("Route param changed", queryParams);

			// this.postsFacade.search({
			// 	searchTerm: this.searchStrFromUrl,
			// 	selectedFilter: this.filterByFromUrl,
			// });
		});
	}
}

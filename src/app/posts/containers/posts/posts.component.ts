import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SearchFilter } from "../../../core/interfaces/search-filter";
import { SearchTermChangeEvent } from "../../../core/interfaces/search-term-change-event";
import { SortDirection } from "../../../core/interfaces/sort-direction";
import { PostsFacadeService } from "../../services/posts-facade.service";

/**
 * Post list page
 */
@Component({
	selector: "app-posts",
	templateUrl: "./posts.component.html",
	styleUrls: ["./posts.component.scss"],
})
export class PostsComponent implements OnInit {
	// paginatedPosts$ = this.postsFacade.paginatedPosts$;
	filteredPosts$ = this.postsFacade.filteredPosts$;
	queryParams$ = this.postsFacade.queryParams$;
	// postSortDirection$ = this.postsFacade.postSortDirection$;
	// currentPage = 1;
	/**
	 * Indicates in which way we are going to sort next if triggered
	 */
	sortDirection: SortDirection = "none";

	readonly filters: SearchFilter[] = [
		{ id: "title", value: "Title" },
		{ id: "body", value: "Content" },
		{ id: "userId", value: "User" },
	];

	/**
	 * If user puts the search string in URL directly
	 */
	// searchStrFromUrl = "";
	/**
	 * If user puts the filterBy string in URL directly
	 */
	// filterByFromUrl = "";

	constructor(
		public postsFacade: PostsFacadeService,
		private _router: Router,
		private _route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.postsFacade.fetchAndSavePostList();
		this.postsFacade.addQueryParamsToRoute();
		this.postsFacade.listenToQueryParamsChange();
		// this.paginatedPosts$.subscribe(console.log);

		// TODO: Hack to reflect view after first time page load
		// setTimeout(() => {
		// this.paginatedPosts$ = this.postsFacade.paginatedPosts$;
		// this.filteredPosts$ = this.postsFacade.filteredPosts$;
		// }, 1000);
		// setInterval(() => {
		// 	console.log(this.currentPage);
		// }, 1000);
	}

	/**
	 * Listening to children events
	 */
	searchTermChanged(searchTermChangeEvent: SearchTermChangeEvent) {
		const queryParams: any = {
			search: searchTermChangeEvent.searchTerm,
			filterBy: searchTermChangeEvent.selectedFilter,
		};
		this.postsFacade.appendToQueryParams(queryParams);
		// if (searchTermChangeEvent.searchTerm)
		// 	queryParams["filterBy"] = searchTermChangeEvent.selectedFilter;

		// It will trigger searching
		// this._router.navigate([], {
		// 	relativeTo: this._route,
		// 	queryParams,
		// });
	}

	/**
	 * Listening to children events
	 */
	sortList() {
		// "none" will convert into "desc", which is the default sorting mode
		const newSortDirection = this.sortDirection === "desc" ? "asc" : "desc";
		this.postsFacade.appendToQueryParams({ sort: newSortDirection });
		// this.postsFacade.sort();
	}

	/**
	 * @deprecated
	 * Listening to children events
	 */
	changeSortDirection(sortDirection: SortDirection) {
		// this.postsFacade.changeSortDirection(sortDirection);
	}

	/**
	 * Listening to children events
	 */
	// paginate(paginationRange: PaginationRange) {
	paginate(currentPage: number) {
		this.postsFacade.appendToQueryParams({ page: currentPage });
		// this.postsFacade.paginate(paginationRange);
	}
}

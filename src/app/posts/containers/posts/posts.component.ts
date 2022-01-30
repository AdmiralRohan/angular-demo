import { Component, OnInit } from "@angular/core";
import { PaginationRange } from "../../../core/interfaces/pagination-range";
import { QueryParams } from "../../../core/interfaces/query-params";
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
	filteredPosts$ = this.postsFacade.filteredPosts$;
	paginatedPosts$ = this.postsFacade.paginatedPosts$;
	queryParams$ = this.postsFacade.queryParams$;

	readonly filters: SearchFilter[] = [
		{ id: "title", value: "Title" },
		{ id: "body", value: "Content" },
		{ id: "userId", value: "User" },
	];

	constructor(public postsFacade: PostsFacadeService) {}

	ngOnInit(): void {
		this.postsFacade.fetchAndSavePostList();
		this.postsFacade.addQueryParamsToRoute();
		this.postsFacade.listenToQueryParamsChange();
	}

	/**
	 * Listening to children events
	 */
	searchTermChanged(searchTermChangeEvent: SearchTermChangeEvent) {
		const queryParams: Partial<QueryParams> = {
			search: searchTermChangeEvent.searchTerm,
			filterBy: searchTermChangeEvent.selectedFilter,
		};
		this.postsFacade.appendToQueryParams(queryParams);
	}

	/**
	 * Listening to children events
	 */
	sortList() {
		this.postsFacade.appendToQueryParams({ sort: this.postsFacade.sortDirection });
	}

	/**
	 * Listening to children events
	 */
	changeSortDirection(sortDirection: SortDirection) {
		this.postsFacade.changeSortDirection(sortDirection);
	}

	/**
	 * Listening to children events
	 */
	addPageToQueryParam(currentPage: number) {
		this.postsFacade.appendToQueryParams({ page: currentPage });
	}

	/**
	 * Listening to children events
	 */
	paginate(paginationRange: PaginationRange) {
		this.postsFacade.paginate(paginationRange);
	}
}

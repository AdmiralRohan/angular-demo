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
	filteredPosts$ = this.postsFacade.filteredPosts$;
	postSortDirection$ = this.postsFacade.postSortDirection$;

	readonly filters: SearchFilter[] = [
		{ id: "userId", value: "User" },
		{ id: "title", value: "Title" },
		{ id: "body", value: "Content" },
	];

	/**
	 * If user puts the search string in URL directly
	 */
	searchStrFromUrl = "";
	/**
	 * If user puts the filterBy string in URL directly
	 */
	filterByFromUrl = "";

	constructor(
		public postsFacade: PostsFacadeService,
		private _router: Router,
		private _route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.postsFacade.fetchAndSavePostList();
		this.filteredPosts$.subscribe(console.log);

		this._route.queryParams.subscribe((queryParams) => {
			this.searchStrFromUrl = queryParams["search"];
			this.filterByFromUrl = queryParams["filterBy"];

			console.log("Params", queryParams);

			this.postsFacade.search({
				searchTerm: this.searchStrFromUrl,
				selectedFilter: this.filterByFromUrl,
			});
		});

		// TODO: Hack to reflect view after first time page load
		setTimeout(() => {
			this.filteredPosts$ = this.postsFacade.filteredPosts$;
		}, 1000);
	}

	searchTermChanged(searchTermChangeEvent: SearchTermChangeEvent) {
		const queryParams: any = {
			search: searchTermChangeEvent.searchTerm,
		};
		if (searchTermChangeEvent.searchTerm)
			queryParams["filterBy"] = searchTermChangeEvent.selectedFilter;

		// It will trigger searching
		this._router.navigate([], {
			relativeTo: this._route,
			queryParams,
		});
	}

	sortList() {
		this.postsFacade.sort();
	}

	changeSortDirection(sortDirection: SortDirection) {
		this.postsFacade.changeSortDirection(sortDirection);
	}
}

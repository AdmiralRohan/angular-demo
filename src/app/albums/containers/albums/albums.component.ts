import { Component, OnInit } from "@angular/core";
import { PaginationRange } from "../../../core/interfaces/pagination-range";
import { QueryParams } from "../../../core/interfaces/query-params";
import { SearchFilter } from "../../../core/interfaces/search-filter";
import { SearchTermChangeEvent } from "../../../core/interfaces/search-term-change-event";
import { AlbumsFacadeService } from "../../services/albums-facade.service";

@Component({
	selector: "app-albums",
	templateUrl: "./albums.component.html",
	styleUrls: ["./albums.component.scss"],
})
export class AlbumsComponent implements OnInit {
	filteredAlbums$ = this.albumsFacade.filteredAlbums$;
	paginatedAlbums$ = this.albumsFacade.paginatedAlbums$;
	queryParams$ = this.albumsFacade.queryParams$;

	readonly filters: SearchFilter[] = [
		{ id: "title", value: "Title" },
		{ id: "userId", value: "Author" },
	];

	constructor(public albumsFacade: AlbumsFacadeService) {}

	ngOnInit(): void {
		this.albumsFacade.fetchAndSaveAlbumList();
		this.filteredAlbums$.subscribe(console.log);
		this.albumsFacade.addQueryParamsToRoute();
		this.albumsFacade.listenToQueryParamsChange();
	}

	/**
	 * Listening to children events
	 */
	searchTermChanged(searchTermChangeEvent: SearchTermChangeEvent) {
		const queryParams: Partial<QueryParams> = {
			search: searchTermChangeEvent.searchTerm,
			filterBy: searchTermChangeEvent.selectedFilter,
		};
		this.albumsFacade.appendToQueryParams(queryParams);
	}

	/**
	 * Listening to children events
	 */
	addPageToQueryParam(currentPage: number) {
		this.albumsFacade.appendToQueryParams({ page: currentPage });
	}

	/**
	 * Listening to children events
	 */
	paginate(paginationRange: PaginationRange) {
		this.albumsFacade.paginate(paginationRange);
	}
}

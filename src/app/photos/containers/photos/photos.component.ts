import { Component, OnInit } from "@angular/core";
import { PaginationRange } from "../../../core/interfaces/pagination-range";
import { QueryParams } from "../../../core/interfaces/query-params";
import { SearchFilter } from "../../../core/interfaces/search-filter";
import { SearchTermChangeEvent } from "../../../core/interfaces/search-term-change-event";
import { PhotosFacadeService } from "../../services/photos-facade.service";

@Component({
	selector: "app-photos",
	templateUrl: "./photos.component.html",
	styleUrls: ["./photos.component.scss"],
})
export class PhotosComponent implements OnInit {
	filteredPhotos$ = this.photosFacade.filteredPhotos$;
	paginatedPhotos$ = this.photosFacade.paginatedPhotos$;
	queryParams$ = this.photosFacade.queryParams$;

	readonly filters: SearchFilter[] = [
		{ id: "albumId", value: "Album" },
		{ id: "title", value: "Title" },
	];

	constructor(public photosFacade: PhotosFacadeService) {}

	ngOnInit(): void {
		this.photosFacade.fetchAndSavePhotoList();
		// this.filteredPhotos$.subscribe(console.log);
		this.photosFacade.addQueryParamsToRoute();
		this.photosFacade.listenToQueryParamsChange();
	}

	/**
	 * Listening to children events
	 */
	searchTermChanged(searchTermChangeEvent: SearchTermChangeEvent) {
		const queryParams: Partial<QueryParams> = {
			search: searchTermChangeEvent.searchTerm,
			filterBy: searchTermChangeEvent.selectedFilter,
		};
		this.photosFacade.appendToQueryParams(queryParams);
	}

	/**
	 * Listening to children events
	 */
	addPageToQueryParam(currentPage: number) {
		this.photosFacade.appendToQueryParams({ page: currentPage });
	}

	/**
	 * Listening to children events
	 */
	paginate(paginationRange: PaginationRange) {
		this.photosFacade.paginate(paginationRange);
	}
}

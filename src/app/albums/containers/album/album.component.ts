import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, tap } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Album } from "../../../core/interfaces/album";
import { PaginationRange } from "../../../core/interfaces/pagination-range";
import { QueryParams } from "../../../core/interfaces/query-params";
import { SearchFilter } from "../../../core/interfaces/search-filter";
import { SearchTermChangeEvent } from "../../../core/interfaces/search-term-change-event";
import { PhotosFacadeService } from "../../../photos/services/photos-facade.service";
import { AlbumFacadeService } from "../../services/album-facade.service";
import { AlbumsFacadeService } from "../../services/albums-facade.service";

@Component({
	selector: "app-album",
	templateUrl: "./album.component.html",
	styleUrls: ["./album.component.scss"],
})
export class AlbumComponent implements OnInit {
	albumId!: number;
	album$!: Observable<Album | undefined>;
	queryParams$ = this.albumFacade.queryParams$;

	filteredPhotosByAlbum$ = this.albumFacade.filteredPhotosByAlbum$;
	paginatedPhotosByAlbum$ = this.albumFacade.paginatedPhotosByAlbum$;
	perPage = environment.perPage.photos;

	readonly filters: SearchFilter[] = [{ id: "title", value: "Title" }];

	constructor(
		public albumsFacade: AlbumsFacadeService,
		public albumFacade: AlbumFacadeService,
		public photosFacade: PhotosFacadeService,
		private _route: ActivatedRoute,
	) {}

	ngOnInit() {
		this._route.paramMap.subscribe((params) => {
			this.albumId = +(params.get("id") || 0);

			if (this.albumId)
				this.album$ = this.albumsFacade.getAlbumById(this.albumId).pipe(
					tap((album) => {
						this.photosFacade.loadPhotosByAlbum(album?.photos);
					}),
				);

			this.albumFacade.addQueryParamsToRoute();
			this.albumFacade.listenToQueryParamsChange();
		});
	}

	/**
	 * Listening to children events
	 */
	searchTermChanged(searchTermChangeEvent: SearchTermChangeEvent) {
		const queryParams: Partial<QueryParams> = {
			search: searchTermChangeEvent.searchTerm,
			filterBy: searchTermChangeEvent.selectedFilter,
		};
		this.albumFacade.appendToQueryParams(queryParams);
	}

	/**
	 * Listening to children events
	 */
	addPageToQueryParam(currentPage: number) {
		this.albumFacade.appendToQueryParams({ page: currentPage });
	}

	/**
	 * Listening to children events
	 */
	paginate(paginationRange: PaginationRange) {
		this.albumFacade.paginateAlbumPhotos(paginationRange);
	}
}

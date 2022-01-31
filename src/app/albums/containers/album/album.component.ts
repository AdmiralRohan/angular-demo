import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Album } from "../../../core/interfaces/album";
import { QueryParams } from "../../../core/interfaces/query-params";
import { SearchFilter } from "../../../core/interfaces/search-filter";
import { SearchTermChangeEvent } from "../../../core/interfaces/search-term-change-event";
import { AlbumsFacadeService } from "../../services/albums-facade.service";

@Component({
	selector: "app-album",
	templateUrl: "./album.component.html",
	styleUrls: ["./album.component.scss"],
})
export class AlbumComponent implements OnInit {
	albumId!: number;
	album$!: Observable<Album | undefined>;
	queryParams$ = this.albumsFacade.queryParams$;

	readonly filters: SearchFilter[] = [{ id: "title", value: "Title" }];

	constructor(public albumsFacade: AlbumsFacadeService, private _route: ActivatedRoute) {}

	ngOnInit() {
		this._route.paramMap.subscribe((params) => {
			this.albumId = +(params.get("id") || 0);

			if (this.albumId) this.album$ = this.albumsFacade.getAlbumById(this.albumId);
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
		this.albumsFacade.appendToQueryParams(queryParams);
	}
}

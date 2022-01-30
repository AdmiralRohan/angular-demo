import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { DataService } from "../../core/http/data/data.service";
import { Photo } from "../../core/interfaces/photo";
import { QueryParams } from "../../core/interfaces/query-params";
import { Store } from "../../core/store";

@Injectable({
	providedIn: "root",
})
export class PhotosFacadeService {
	constructor(
		private _dataService: DataService,
		private _store: Store,
		private _router: Router,
		private _route: ActivatedRoute,
	) {}

	get filteredPhotos$(): Observable<Photo[]> {
		return this._store
			.select("filteredPhotos")
			.pipe(map((photos: Photo[]) => photos.filter((_, i) => i < 60)));
	}
	get queryParams$(): Observable<QueryParams> {
		return this._store.select("queryParams");
	}
	get paginatedPhotos$(): Observable<Photo[]> {
		return this._store.select("paginatedPhotos");
	}

	/**
	 * Fetch and save photo list in store
	 */
	fetchAndSavePhotoList() {
		this._dataService.fetchPhotoList().subscribe((photoListFromAPI) => {
			this._store.set("filteredPhotos", photoListFromAPI);
			this._store.set("photos", photoListFromAPI);
		});
	}
}

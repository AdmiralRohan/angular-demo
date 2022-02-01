import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, first, map, Observable } from "rxjs";
import { DataService } from "../../core/http/data/data.service";
import { PaginationRange } from "../../core/interfaces/pagination-range";
import { Photo } from "../../core/interfaces/photo";
import { QueryParams } from "../../core/interfaces/query-params";
import { Store } from "../../core/store";
import { Utils } from "../../core/utils";

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
			.pipe(map((photos: Photo[]) => photos.filter((_, i) => i < 15)));
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

	paginate(paginationRange: PaginationRange) {
		const filteredList: Photo[] = this._store.getLatestValue("filteredPhotos");
		const paginatedList = filteredList.slice(
			paginationRange.startIndex,
			paginationRange.endIndex + 1,
		);

		this._store.set("paginatedPhotos", paginatedList);
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
			const queryParams: QueryParams = {
				search: params["search"] || "",
				filterBy: params["filterBy"] || "",
				page: +params["page"] || 1,
				// sort: params["sort"],
			};

			if (isFirstTime) {
				isFirstTime = false;
				this.appendToQueryParams(queryParams);
			}

			this._filterList(queryParams);
		});
	}

	/**
	 * Filter and save list in store, based on queryparams
	 * @param queryParams
	 */
	private _filterList(queryParams: QueryParams) {
		// console.log("Route param changed", queryParams);

		this._store
			.select("photos")
			.pipe(
				filter((photos: Photo[]) => photos.length > 0),
				first(),
				map((photos: Photo[]) => {
					return queryParams.search
						? photos.filter((photo) => {
								// TODO: Hack to fix `No index signature with a parameter of type 'string' was found on type 'Photo'` (ts7053)
								return Utils.isStringMatching(
									(photo as any)[queryParams.filterBy],
									queryParams.search,
								);
						  })
						: photos;
				}),
			)
			.subscribe((filteredPhotos) => {
				this._store.set("filteredPhotos", filteredPhotos);
				if (filteredPhotos.length === 0) this._store.set("paginatedPhotos", []);
			});
	}

	getPhotoById(photoId: number): Observable<Photo | undefined> {
		return this._store
			.select("photos")
			.pipe(
				map((photos: Photo[]): Photo | undefined => photos.find((photo) => photo.id === photoId)),
			);
	}
}

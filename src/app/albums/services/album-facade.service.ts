import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, first, map, Observable } from "rxjs";
import { PaginationRange } from "../../core/interfaces/pagination-range";
import { Photo } from "../../core/interfaces/photo";
import { QueryParams } from "../../core/interfaces/query-params";
import { Store } from "../../core/store";
import { Utils } from "../../core/utils";

/**
 * For photos by album related communication
 */
@Injectable({
	providedIn: "root",
})
export class AlbumFacadeService {
	constructor(private _store: Store, private _router: Router, private _route: ActivatedRoute) {}

	get filteredPhotosByAlbum$(): Observable<Photo[]> {
		return this._store.select("filteredPhotosByAlbum");
	}
	get queryParams$(): Observable<QueryParams> {
		return this._store.select("queryParams");
	}
	get paginatedPhotosByAlbum$(): Observable<Photo[]> {
		return this._store.select("paginatedPhotosByAlbum");
	}

	paginateAlbumPhotos(paginationRange: PaginationRange) {
		const filteredList: Photo[] = this._store.getLatestValue("filteredPhotosByAlbum");

		const paginatedList = filteredList.slice(
			paginationRange.startIndex,
			paginationRange.endIndex + 1,
		);

		this._store.set("paginatedPhotosByAlbum", paginatedList);
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
		this._store.select("queryParams").subscribe((params: QueryParams) => {
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
		this._store
			.select("photosByAlbum")
			.pipe(
				filter((photos: Photo[]) => photos.length > 0),
				first(),
				map((photos: Photo[]) => {
					return queryParams.search
						? photos.filter((photo) => {
								// TODO: Hack to fix `No index signature with a parameter of type 'string' was found on type 'Album'` (ts7053)
								return Utils.isStringMatching(
									(photo as any)[queryParams.filterBy],
									queryParams.search,
								);
						  })
						: photos;
				}),
			)
			.subscribe((filteredPhotos) => {
				this._store.set("filteredPhotosByAlbum", [...filteredPhotos]);
			});
	}
}

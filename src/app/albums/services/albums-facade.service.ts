import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, first, map, Observable } from "rxjs";
import { DataService } from "../../core/http/data/data.service";
import { Album } from "../../core/interfaces/album";
import { PaginationRange } from "../../core/interfaces/pagination-range";
import { Photo } from "../../core/interfaces/photo";
import { QueryParams } from "../../core/interfaces/query-params";
import { Store } from "../../core/store";
import { Utils } from "../../core/utils";

@Injectable({
	providedIn: "root",
})
export class AlbumsFacadeService {
	constructor(
		private _dataService: DataService,
		private _store: Store,
		private _router: Router,
		private _route: ActivatedRoute,
	) {}

	get filteredAlbums$(): Observable<Album[]> {
		return this._store
			.select("filteredAlbums")
			.pipe(map((albums: Album[]) => albums.filter((_, i) => i < 15)));
	}
	get queryParams$(): Observable<QueryParams> {
		return this._store.select("queryParams");
	}
	get paginatedAlbums$(): Observable<Album[]> {
		return this._store.select("paginatedAlbums");
	}

	/**
	 * Fetch and save album list in store
	 */
	fetchAndSaveAlbumList() {
		this._dataService.fetchAlbumList().subscribe((albumListFromAPI) => {
			// Map photos with respective albums
			const albumIdToPhotoListMap: { [key: number]: Photo[] } = {};

			this._store
				.select("photos")
				.pipe(
					filter((photos: Photo[]) => photos.length > 0),
					first(),
				)
				.subscribe((photos: Photo[]) => {
					for (let photo of photos) {
						if (!albumIdToPhotoListMap[photo.albumId]) {
							albumIdToPhotoListMap[photo.albumId] = [photo];
						} else {
							albumIdToPhotoListMap[photo.albumId].push(photo);
						}
					}

					albumListFromAPI.map((album) => {
						album.photos = albumIdToPhotoListMap[album.id];
						return album;
					});

					this._store.set("filteredAlbums", albumListFromAPI);
					this._store.set("albums", albumListFromAPI);
				});
		});
	}

	paginate(paginationRange: PaginationRange) {
		const filteredList: Album[] = this._store.getLatestValue("filteredAlbums");
		const paginatedList = filteredList.slice(
			paginationRange.startIndex,
			paginationRange.endIndex + 1,
		);

		this._store.set("paginatedAlbums", paginatedList);
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
			.select("albums")
			.pipe(
				filter((albums: Album[]) => albums.length > 0),
				first(),
				map((albums: Album[]) => {
					return queryParams.search
						? albums.filter((album) => {
								// TODO: Hack to fix `No index signature with a parameter of type 'string' was found on type 'Album'` (ts7053)
								return Utils.isStringMatching(
									(album as any)[queryParams.filterBy],
									queryParams.search,
								);
						  })
						: albums;
				}),
			)
			.subscribe((filteredAlbums) => {
				this._store.set("filteredAlbums", [...filteredAlbums]);
			});
	}

	getAlbumById(albumId: number): Observable<Album | undefined> {
		return this._store
			.select("albums")
			.pipe(
				map((albums: Album[]): Album | undefined => albums.find((album) => album.id === albumId)),
			);
	}
}

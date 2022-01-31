import { Injectable } from "@angular/core";
import { combineLatest, map, Observable } from "rxjs";
import { Album } from "../../core/interfaces/album";
import { DashboardStats } from "../../core/interfaces/dashboard-stats";
import { Photo } from "../../core/interfaces/photo";
import { Post } from "../../core/interfaces/post";
import { Store } from "../../core/store";

@Injectable({
	providedIn: "root",
})
export class DashboardFacadeService {
	constructor(private _store: Store) {}

	/**
	 * For showing in dashboard
	 */
	generateStats(): Observable<DashboardStats> {
		const posts$: Observable<Post[]> = this._store.select("posts");
		const albums$: Observable<Album[]> = this._store.select("albums");
		const photos$: Observable<Photo[]> = this._store.select("photos");

		return combineLatest({ posts: posts$, albums: albums$, photos: photos$ }).pipe(
			map(({ posts, albums, photos }): DashboardStats => {
				return {
					totalPosts: posts.length,
					totalAlbums: albums.length,
					totalPhotos: photos.length,
					latestPosts: posts.slice(0, 10),
					latestPhotos: photos.slice(0, 10),
				};
			}),
		);
	}
}

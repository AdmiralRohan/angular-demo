import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { DataService } from "../../core/http/data/data.service";
import { Album } from "../../core/interfaces/album";
import { Post } from "../../core/interfaces/post";
import { User } from "../../core/interfaces/user";
import { Store } from "../../core/store";

@Injectable({
	providedIn: "root",
})
export class UsersFacadeService {
	constructor(private _dataService: DataService, private _store: Store) {}

	/**
	 * Fetch and save user list in store
	 */
	fetchAndSaveUserList() {
		this._dataService.fetchUserList().subscribe((userListFromAPI) => {
			this._store.set("users", userListFromAPI);
		});
	}

	getPostsByUserId(userId: number): Observable<Post[]> {
		return this._store.select("posts").pipe(
			map((posts: Post[]) => {
				return posts.filter((post) => post.userId === userId);
			}),
		);
	}
	getAlbumsByUserId(userId: number): Observable<Album[]> {
		return this._store.select("albums").pipe(
			map((albums: Album[]) => {
				return albums.filter((album) => album.userId === userId);
			}),
		);
	}

	getUserById(userId: number): Observable<User | undefined> {
		return this._store
			.select("users")
			.pipe(map((users: User[]): User | undefined => users.find((user) => user.id === userId)));
	}
}

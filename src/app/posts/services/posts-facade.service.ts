import { Injectable } from "@angular/core";
import { filter, first, map, Observable } from "rxjs";
import { DataService } from "../../core/http/data/data.service";
import { Post } from "../../core/interfaces/post";
import { SearchTermChangeEvent } from "../../core/interfaces/search-term-change-event";
import { Store } from "../../core/store";

@Injectable({
	providedIn: "root",
})
export class PostsFacadeService {
	constructor(public dataService: DataService, private _store: Store) {}

	get filteredPosts$(): Observable<Post[]> {
		return this._store.select("filteredPosts");
	}

	/**
	 * Fetch and save post list in store
	 */
	fetchAndSavePostList() {
		this.dataService.fetchPostList().subscribe((postListFromAPI) => {
			this._store.set("filteredPosts", postListFromAPI);
			this._store.set("posts", postListFromAPI);
		});
	}

	search(searchTermChangeEvent: SearchTermChangeEvent) {
		const isStringMatching = (targetStr: string, searchTerm: string) => {
			return targetStr.toString().toLowerCase().includes(searchTerm.toLowerCase());
		};

		this._store
			.select("posts")
			.pipe(
				filter((posts: Post[]) => posts.length > 0),
				first(),
				map((posts: Post[]) => {
					return searchTermChangeEvent.searchTerm
						? posts.filter((post) => {
								const { selectedFilter } = searchTermChangeEvent;

								// TODO: Hack to fix `No index signature with a parameter of type 'string' was found on type 'Post'` (ts7053)
								return isStringMatching(
									(post as any)[selectedFilter],
									searchTermChangeEvent.searchTerm,
								);
						  })
						: posts;
				}),
			)
			.subscribe((filteredPosts) => {
				this._store.set("filteredPosts", filteredPosts);
			});
	}

	sort() {
		const filteredList: Post[] = this._store.getLatestValue("filteredPosts");
		const sortedList = filteredList.sort((a, b) => b.id - a.id);
		this._store.set("filteredPosts", sortedList);
	}
}

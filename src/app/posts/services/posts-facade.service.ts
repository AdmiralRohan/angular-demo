import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { DataService } from "../../core/http/data/data.service";
import { Post } from "../../core/interfaces/post";
import { SearchTermChangeEvent } from "../../core/interfaces/search-term-change-event";

@Injectable({
	providedIn: "root",
})
export class PostsFacadeService {
	posts$!: Observable<Post[]>;

	constructor(public dataService: DataService) {}

	search(searchTermChangeEvent: SearchTermChangeEvent) {
		const isStringMatching = (targetStr: string, searchTerm: string) => {
			return targetStr.toString().toLowerCase().includes(searchTerm.toLowerCase());
		};

		// TODO: Should save in store
		this.posts$ = this.dataService.fetchPostList().pipe(
			map((posts: Post[]) => {
				return posts.filter((post) => {
					const { selectedFilter } = searchTermChangeEvent;

					// TODO: Hack to fix `No index signature with a parameter of type 'string' was found on type 'Post'` (ts7053)
					return isStringMatching((post as any)[selectedFilter], searchTermChangeEvent.searchTerm);
				});
			}),
		);
	}

	getPostList(): Observable<Post[]> {
		// TODO: Will come from store
		return this.posts$ || this.dataService.fetchPostList();
	}
}

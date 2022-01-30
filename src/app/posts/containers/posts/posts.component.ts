import { Component } from "@angular/core";
import { SearchFilter } from "../../../core/interfaces/search-filter";
import { SearchTermChangeEvent } from "../../../core/interfaces/search-term-change-event";
import { PostsFacadeService } from "../../services/posts-facade.service";

/**
 * Post list page
 */
@Component({
	selector: "app-posts",
	templateUrl: "./posts.component.html",
	styleUrls: ["./posts.component.scss"],
})
export class PostsComponent {
	posts$ = this.postsFacade.getPostList();
	readonly filters: SearchFilter[] = [
		{ id: "userId", value: "User" },
		{ id: "title", value: "Title" },
		{ id: "body", value: "Content" },
	];

	constructor(public postsFacade: PostsFacadeService) {}

	searchTermChanged(searchTermChangeEvent: SearchTermChangeEvent) {
		this.postsFacade.search(searchTermChangeEvent);
		// TODO: Should reflect automatically
		this.posts$ = this.postsFacade.getPostList();
	}
}

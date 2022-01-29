import { Component } from "@angular/core";
import { DataService } from "../../../core/http/data/data.service";
import { SearchFilter } from "../../../core/interfaces/search-filter";
import { SearchTermChangeEvent } from "../../../core/interfaces/search-term-change-event";

/**
 * Post list page
 */
@Component({
	selector: "app-posts",
	templateUrl: "./posts.component.html",
	styleUrls: ["./posts.component.scss"],
})
export class PostsComponent {
	posts$ = this.dataService.fetchPostList();
	readonly filters: SearchFilter[] = [
		{ id: "user", value: "User" },
		{ id: "title", value: "Title" },
		{ id: "content", value: "Content" },
	];

	constructor(public dataService: DataService) {}

	searchTermChanged(searchTermChangeEvent: SearchTermChangeEvent) {
		console.log(searchTermChangeEvent);
	}
}

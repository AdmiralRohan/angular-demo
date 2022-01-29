import { Component } from "@angular/core";
import { DataService } from "../../../core/http/data/data.service";

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

	constructor(public dataService: DataService) {}
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Post } from "../../../core/interfaces/post";
import { PostsFacadeService } from "../../services/posts-facade.service";

/**
 * Individual post page
 */
@Component({
	selector: "app-post",
	templateUrl: "./post.component.html",
	styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
	postId!: number;
	post$!: Observable<Post | undefined>;

	constructor(public postsFacade: PostsFacadeService, private _route: ActivatedRoute) {}

	ngOnInit() {
		this._route.paramMap.subscribe((params) => {
			this.postId = +(params.get("id") || 0);

			if (this.postId) this.post$ = this.postsFacade.getPostById(this.postId);
		});
	}
}

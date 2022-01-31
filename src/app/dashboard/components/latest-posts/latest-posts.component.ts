import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Post } from "../../../core/interfaces/post";

@Component({
	selector: "app-latest-posts",
	templateUrl: "./latest-posts.component.html",
	styleUrls: ["./latest-posts.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatestPostsComponent {
	@Input() latestPosts: Post[] = [];
}

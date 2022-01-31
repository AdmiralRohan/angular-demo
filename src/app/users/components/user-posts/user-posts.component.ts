import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Post } from "../../../core/interfaces/post";

@Component({
	selector: "app-user-posts",
	templateUrl: "./user-posts.component.html",
	styleUrls: ["./user-posts.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPostsComponent {
	@Input() postsByUser: Post[] = [];
}

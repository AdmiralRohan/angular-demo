import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Post } from "../../../core/interfaces/post";

@Component({
	selector: "app-post-list",
	templateUrl: "./post-list.component.html",
	styleUrls: ["./post-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
	@Input() postList!: Post[];
}

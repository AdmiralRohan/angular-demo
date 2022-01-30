import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Post } from "../../../core/interfaces/post";

/**
 * Holds a row of post list table. \
 * Used as directive along with `tr` element.
 */
@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: "[app-post-list-item]",
	templateUrl: "./post-list-item.component.html",
	styleUrls: ["./post-list-item.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListItemComponent {
	@Input() post!: Post;
}

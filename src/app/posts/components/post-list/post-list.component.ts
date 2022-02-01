import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Post } from "../../../core/interfaces/post";
import { SortDirection } from "../../../core/interfaces/sort-direction";

/**
 * Table
 */
@Component({
	selector: "app-post-list",
	templateUrl: "./post-list.component.html",
	styleUrls: ["./post-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
	@Input() postList!: Post[];
	/**
	 * Indicates in which way we are going to sort next if triggered
	 */
	@Input() sortDirection: SortDirection = "none";
	@Output() sortListEvent = new EventEmitter<void>();

	sortList() {
		this.sortListEvent.emit();
	}

	listTrackById(index: number, post: Post): number {
		return post.id;
	}
}

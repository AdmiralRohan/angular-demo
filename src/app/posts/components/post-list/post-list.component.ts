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
	@Input() sortDirection: SortDirection | null = "desc";
	@Output() sortListEvent = new EventEmitter<boolean>();
	@Output() changeSortDirectionEvent = new EventEmitter<SortDirection>();

	private _changeSortDirection() {
		const reversedSortDirection: SortDirection = this.sortDirection === "asc" ? "desc" : "asc";
		this.changeSortDirectionEvent.emit(reversedSortDirection);
	}

	sortList() {
		this._changeSortDirection();
		this.sortListEvent.emit(true);
	}
}

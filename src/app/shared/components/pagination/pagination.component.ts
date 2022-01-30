import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { PaginationRange } from "../../../core/interfaces/pagination-range";

@Component({
	selector: "app-pagination",
	templateUrl: "./pagination.component.html",
	styleUrls: ["./pagination.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
	@Input() list: any[] = [];
	/**
	 * @deprecated
	 * This method will be used to filter before showing the list in view
	 */
	@Output() paginationRangeChange = new EventEmitter<PaginationRange>();

	currentPage: number = 1;
	@Output() currentPageChange = new EventEmitter<number>();
	perPage = 5;

	get shouldShowPreviousButton(): boolean {
		return this.currentPage > 1;
	}
	get shouldShowNextButton(): boolean {
		return this.currentPage < this.noOfPages;
	}
	get totalEntries(): number {
		return this.list.length;
	}
	get noOfPages(): number {
		return this.list.length / this.perPage;
	}

	get startingEntry(): number {
		return this.list.length === 0 ? 0 : this.perPage * (this.currentPage - 1);
	}
	get endingEntry(): number {
		return (this.shouldShowNextButton ? this.perPage * this.currentPage : this.totalEntries) - 1;
	}

	goToPreviousPage() {
		if (this.shouldShowPreviousButton) {
			this.currentPageChange.emit(--this.currentPage);
			this.paginationRangeChange.emit({
				startIndex: this.startingEntry,
				endIndex: this.endingEntry,
			});
		}
	}
	goToNextPage() {
		if (this.shouldShowNextButton) {
			this.currentPageChange.emit(++this.currentPage);
			this.paginationRangeChange.emit({
				startIndex: this.startingEntry,
				endIndex: this.endingEntry,
			});
		}
	}
}

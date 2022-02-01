import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from "@angular/core";
import { PaginationRange } from "../../../core/interfaces/pagination-range";

@Component({
	selector: "app-pagination",
	templateUrl: "./pagination.component.html",
	styleUrls: ["./pagination.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {
	/**
	 * filteredList (result of search and sort)
	 */
	@Input() list: any[] = [];
	/**
	 * This method will be used to filter before showing the list in view
	 */
	@Output() paginationRangeChange = new EventEmitter<PaginationRange>();
	@Output() currentPageChange = new EventEmitter<number>();

	@Input() currentPage = 1;
	@Input() perPage = 5;
	isFirstLoad = true;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["list"]) {
			// Hack to avoid ExpressionChangedAfterChangeDetection error
			setTimeout(() => {
				this._emitPageRange();
			}, 0);
		}
	}

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

	/**
	 * Array index, starts from zero
	 */
	get startingEntry(): number {
		return this.list.length === 0 ? 0 : this.perPage * (this.currentPage - 1);
	}
	/**
	 * Array index, starts from zero
	 */
	get endingEntry(): number {
		return (this.shouldShowNextButton ? this.perPage * this.currentPage : this.totalEntries) - 1;
	}

	private _emitPageRange() {
		if (!this.isFirstLoad && this.startingEntry > this.endingEntry) {
			this.currentPage = this.noOfPages > 0 ? Math.ceil(this.noOfPages) : 1;
			this.currentPageChange.emit(this.currentPage);
		}

		this.isFirstLoad = false;
		this.paginationRangeChange.emit({
			startIndex: this.startingEntry,
			endIndex: this.endingEntry,
		});
	}

	goToPreviousPage() {
		if (this.shouldShowPreviousButton) this.currentPageChange.emit(--this.currentPage);
	}
	goToNextPage() {
		if (this.shouldShowNextButton) this.currentPageChange.emit(++this.currentPage);
	}
}

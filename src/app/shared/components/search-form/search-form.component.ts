import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { combineLatest, debounceTime, distinctUntilChanged, Subscription } from "rxjs";
import { SearchFilter } from "../../../core/interfaces/search-filter";
import { SearchTermChangeEvent } from "../../../core/interfaces/search-term-change-event";
import { Utils } from "../../../core/utils";

/**
 * Search form along with dynamic filters. Used in all pages. \
 * Can be reused for every module.
 */
@Component({
	selector: "app-search-form",
	templateUrl: "./search-form.component.html",
	styleUrls: ["./search-form.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements OnInit, OnDestroy {
	/**
	 * If user puts the search string in URL directly
	 */
	@Input() searchStrFromUrl = "";
	/**
	 * If user puts the filterBy string in URL directly
	 */
	@Input() filterByFromUrl = "";
	@Input() filters: SearchFilter[] = [];
	@Output() searchTermChange = new EventEmitter<SearchTermChangeEvent>();

	searchTerm = new FormControl("");
	selectedFilter = new FormControl("");

	searchTermChange$!: Subscription;

	ngOnInit(): void {
		this._emitSearchTermChange();

		this.searchTerm.setValue(this.searchStrFromUrl);
		// If user doesn't give any filterBy in URL, use first one from list
		const isFilterByAvailable = !!this.filters.filter(
			(filter) => filter.id === this.filterByFromUrl,
		).length;
		this.selectedFilter.setValue(isFilterByAvailable ? this.filterByFromUrl : this.filters[0]?.id);
	}

	private _emitSearchTermChange() {
		this.searchTermChange$ = combineLatest({
			searchTerm: this.searchTerm.valueChanges,
			selectedFilter: this.selectedFilter.valueChanges,
		})
			.pipe(distinctUntilChanged(), debounceTime(Utils.dueTime))
			.subscribe(({ searchTerm, selectedFilter }) => {
				this.searchTermChange.emit({ searchTerm, selectedFilter });
			});
	}

	ngOnDestroy(): void {
		this.searchTermChange$.unsubscribe();
	}
}

import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { combineLatest, debounceTime, distinctUntilChanged } from "rxjs";
import { SearchFilter } from "../../../core/interfaces/search-filter";
import { SearchTermChangeEvent } from "../../../core/interfaces/search-term-change-event";

/**
 * Search form along with dynamic filters. Used in all pages.
 */
@Component({
	selector: "app-search-form",
	templateUrl: "./search-form.component.html",
	styleUrls: ["./search-form.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements OnInit {
	@Input() filters!: SearchFilter[];
	@Output() searchTermChange = new EventEmitter<SearchTermChangeEvent>();

	searchTerm = new FormControl("");
	selectedFilter = new FormControl("");

	ngOnInit(): void {
		combineLatest({
			searchTerm: this.searchTerm.valueChanges,
			selectedFilter: this.selectedFilter.valueChanges,
		})
			.pipe(distinctUntilChanged(), debounceTime(400))
			.subscribe(({ searchTerm, selectedFilter }) => {
				this.searchTermChange.emit({ searchTerm, selectedFilter });
			});

		this.selectedFilter.setValue(this.filters[0]?.id);
	}
}

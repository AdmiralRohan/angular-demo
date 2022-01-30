import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, distinctUntilKeyChanged, pluck } from "rxjs/operators";
import { Post } from "./interfaces/post";
import { QueryParams } from "./interfaces/query-params";
import { SortDirection } from "./interfaces/sort-direction";

interface State {
	/**
	 * Holds post list from API
	 */
	posts: Post[];
	/**
	 * Initially list from API is filtered out by search term (if any)
	 */
	filteredPosts: Post[];
	/**
	 * Filtered posts are paginated and used in view
	 */
	paginatedPosts: Post[];
	/**
	 * Used to sort post list \
	 * Need to use store for this as we are not calling route instance inside component
	 */
	postSortDirection: SortDirection;
	/**
	 * List of query params. Storing at a centralized location for easier filtering purposes. \
	 * We will update the query params and subscribe to param changes. Then filtering will happen from one place.
	 */
	queryParams: QueryParams;
}

const initialState: State = {
	posts: [],
	filteredPosts: [],
	paginatedPosts: [],
	postSortDirection: "none",
	queryParams: { search: "", filterBy: "title", page: 1 },
};

@Injectable({
	providedIn: "root",
})
export class Store {
	private _subject = new BehaviorSubject<State>(initialState);
	private _store = this._subject.asObservable().pipe(distinctUntilChanged());

	private get _value() {
		return this._subject.value;
	}

	select(key: keyof State): Observable<any> {
		return this._store.pipe(distinctUntilKeyChanged(key), pluck(key));
	}

	getLatestValue(key: keyof State): any {
		return this._subject.value[key];
	}

	set(key: keyof State, currentValue: any) {
		this._subject.next({
			...this._value,
			[key]: currentValue,
		});
	}

	resetToInitialState(key: keyof State) {
		this.set(key, initialState[key]);
	}
}

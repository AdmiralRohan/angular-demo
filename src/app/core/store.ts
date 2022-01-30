import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, distinctUntilKeyChanged, pluck } from "rxjs/operators";
import { Post } from "./interfaces/post";

interface State {
	posts: Post[];
	filteredPosts: Post[];
	postSortDirection: "asc" | "desc";
}

const initialState: State = {
	filteredPosts: [],
	posts: [],
	postSortDirection: "desc",
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

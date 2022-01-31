import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { DataService } from "../../core/http/data/data.service";
import { User } from "../../core/interfaces/user";
import { Store } from "../../core/store";

@Injectable({
	providedIn: "root",
})
export class UsersFacadeService {
	constructor(
		private _dataService: DataService,
		private _store: Store,
		private _router: Router,
		private _route: ActivatedRoute,
	) {}

	/**
	 * Fetch and save user list in store
	 */
	fetchAndSaveUserList() {
		this._dataService.fetchUserList().subscribe((userListFromAPI) => {
			this._store.set("users", userListFromAPI);
		});
	}

	getUserById(userId: number): Observable<User | undefined> {
		return this._store
			.select("users")
			.pipe(map((users: User[]): User | undefined => users.find((user) => user.id === userId)));
	}
}

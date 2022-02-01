import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "../store";

@Injectable({
	providedIn: "root",
})
export class SpinnerService {
	constructor(private _store: Store) {}

	start() {
		this._store.set("isSpinnerVisible", true);
	}

	stop() {
		this._store.set("isSpinnerVisible", false);
	}

	get isVisible$(): Observable<boolean> {
		return this._store.select("isSpinnerVisible");
	}
}

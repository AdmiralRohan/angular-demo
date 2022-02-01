import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "../store";

@Injectable({
	providedIn: "root",
})
export class SpinnerService {
	constructor(private _store: Store) {}

	start() {
		console.log("Start");
		this._store.set("isSpinnerVisible", true);
	}

	stop() {
		console.log("Stop");
		setTimeout(() => {
			this._store.set("isSpinnerVisible", false);
		}, 2000);
	}

	get isVisible$(): Observable<boolean> {
		return this._store.select("isSpinnerVisible");
	}
}

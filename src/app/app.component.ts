import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	title = "angular-demo";
	hello: number;
	constructor() {
		this.hello = 2;
	}

	ngOnInit() {}
}

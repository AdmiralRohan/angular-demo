import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { BreadcrumbItem } from "../../../core/interfaces/breadcrumb-item";
import { Utils } from "../../../core/utils";

@Component({
	selector: "app-layout",
	templateUrl: "./layout.component.html",
	styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
	// Default value
	breadcrumbItems: BreadcrumbItem[] = Utils.dashboardBreadcrumbItems;

	constructor(private _router: Router) {}

	ngOnInit(): void {
		this._checkCurrentRoute();
	}

	/**
	 * For forming breadcrumb
	 */
	private _checkCurrentRoute() {
		// For first time
		if (this._router.url) {
			const currentRoute = this._router.url;
			this.breadcrumbItems = this._makeBreadcrumbItems(currentRoute);
		}

		// From 2nd time onwards
		this._router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				const currentRoute = event.url;
				this.breadcrumbItems = this._makeBreadcrumbItems(currentRoute);
			}
		});
	}

	private _makeBreadcrumbItems(route: string) {
		const firstLetterUppercase = (string: string) =>
			string.charAt(0).toUpperCase() + string.slice(1);

		const breadcrumbItems: BreadcrumbItem[] = [];

		// For dashboard
		if (route === "/") return Utils.dashboardBreadcrumbItems;

		const splittedRoute = route.split("/");
		for (let i = 0; i < splittedRoute.length; i++) {
			const routeSplit = splittedRoute[i];

			// Format in proper router.navigate format
			breadcrumbItems.push({
				value: routeSplit === "" ? "Dashboard" : firstLetterUppercase(routeSplit).split("?")[0],
				route: splittedRoute
					.filter((_, j) => {
						// Remove first "/", will later merge with 2nd item in next map block
						if (j === 0) return i === 0 ? true : false;

						return j <= i;
					})
					.map((val, j) => {
						if (j === 0) return "/" + val;

						return val;
					}),
				isActive: false, // Default value
			});
		}

		// Last item will be activated
		breadcrumbItems[breadcrumbItems.length - 1].isActive = true;

		return breadcrumbItems;
	}
}

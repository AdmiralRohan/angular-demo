import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { AlbumsFacadeService } from "../../../albums/services/albums-facade.service";
import { BreadcrumbItem } from "../../../core/interfaces/breadcrumb-item";
import { SpinnerService } from "../../../core/services/spinner.service";
import { Utils } from "../../../core/utils";
import { PhotosFacadeService } from "../../../photos/services/photos-facade.service";
import { PostsFacadeService } from "../../../posts/services/posts-facade.service";
import { UsersFacadeService } from "../../../users/services/users-facade.service";

@Component({
	selector: "app-layout",
	templateUrl: "./layout.component.html",
	styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit, OnDestroy {
	// Default value
	breadcrumbItems: BreadcrumbItem[] = Utils.dashboardBreadcrumbItems;
	isSpinnerVisible$ = this.spinner.isVisible$;

	private _onDestroy$ = new Subject<void>();

	constructor(
		private _router: Router,
		public postsFacade: PostsFacadeService,
		public albumsFacade: AlbumsFacadeService,
		public photosFacade: PhotosFacadeService,
		public usersFacade: UsersFacadeService,
		public spinner: SpinnerService,
	) {}

	ngOnInit(): void {
		this._checkCurrentRoute();

		// For caching, as this is parent of all pages
		this.postsFacade.fetchAndSavePostList();
		this.albumsFacade.fetchAndSaveAlbumList();
		this.photosFacade.fetchAndSavePhotoList();
		this.usersFacade.fetchAndSaveUserList();
	}

	ngOnDestroy(): void {
		this._onDestroy$.next();
		this._onDestroy$.complete();
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
		this._router.events.pipe(takeUntil(this._onDestroy$)).subscribe((event) => {
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

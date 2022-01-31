import { Component } from "@angular/core";
import { DashboardFacadeService } from "../../services/dashboard-facade.service";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
	stats$ = this.dashboardFacade.generateStats();

	constructor(public dashboardFacade: DashboardFacadeService) {}
}

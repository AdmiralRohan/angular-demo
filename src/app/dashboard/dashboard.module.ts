import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";

@NgModule({
	declarations: [DashboardComponent],
	imports: [CommonModule, DashboardRoutingModule, RouterModule],
})
export class DashboardModule {}

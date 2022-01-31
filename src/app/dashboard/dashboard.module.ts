import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { LatestPostsComponent } from "./components/latest-posts/latest-posts.component";
import { LatestPhotosComponent } from "./components/latest-photos/latest-photos.component";

@NgModule({
	declarations: [
		DashboardComponent,
		StatisticsComponent,
		LatestPostsComponent,
		LatestPhotosComponent,
	],
	imports: [CommonModule, DashboardRoutingModule, RouterModule],
})
export class DashboardModule {}

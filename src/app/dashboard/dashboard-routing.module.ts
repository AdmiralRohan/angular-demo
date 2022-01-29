import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "../layout/containers/layout/layout.component";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";

const routes: Routes = [
	{ path: "", component: LayoutComponent, children: [{ path: "", component: DashboardComponent }] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class DashboardRoutingModule {}

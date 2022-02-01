import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BreadcrumbComponent } from "./containers/breadcrumb/breadcrumb.component";
import { LayoutComponent } from "./containers/layout/layout.component";
import { LeftNavComponent } from "./containers/left-nav/left-nav.component";
import { NotFoundComponent } from "./containers/not-found/not-found.component";
import { LayoutRoutingModule } from "./layout-routing.module";

@NgModule({
	declarations: [LeftNavComponent, LayoutComponent, BreadcrumbComponent, NotFoundComponent],
	imports: [CommonModule, LayoutRoutingModule],
})
export class LayoutModule {}

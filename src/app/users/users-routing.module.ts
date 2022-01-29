import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./containers/user/user.component";

const routes: Routes = [
	{ path: "", redirectTo: "/404", pathMatch: "full" },
	{ path: ":id", component: UserComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UsersRoutingModule {}

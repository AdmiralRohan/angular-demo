import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserComponent } from "./containers/user/user.component";
import { UsersRoutingModule } from "./users-routing.module";

@NgModule({
	declarations: [UserComponent],
	imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}

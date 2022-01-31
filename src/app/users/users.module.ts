import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserComponent } from "./containers/user/user.component";
import { UsersRoutingModule } from "./users-routing.module";
import { UserPostsComponent } from "./components/user-posts/user-posts.component";
import { UserAlbumsComponent } from "./components/user-albums/user-albums.component";

@NgModule({
	declarations: [UserComponent, UserPostsComponent, UserAlbumsComponent],
	imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}

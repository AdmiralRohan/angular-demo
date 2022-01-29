import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { PostComponent } from "./containers/post/post.component";
import { PostsComponent } from "./containers/posts/posts.component";
import { PostsRoutingModule } from "./posts-routing.module";
import { PostListComponent } from "./components/post-list/post-list.component";
import { PostListItemComponent } from "./components/post-list-item/post-list-item.component";

@NgModule({
	declarations: [PostsComponent, PostComponent, PostListComponent, PostListItemComponent],
	imports: [CommonModule, PostsRoutingModule, SharedModule],
})
export class PostsModule {}

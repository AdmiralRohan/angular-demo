import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PostsComponent } from "./containers/posts/posts.component";
import { PostsRoutingModule } from "./posts-routing.module";
import { PostComponent } from "./containers/post/post.component";

@NgModule({
	declarations: [PostsComponent, PostComponent],
	imports: [CommonModule, PostsRoutingModule],
})
export class PostsModule {}

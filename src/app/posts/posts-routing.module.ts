import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostComponent } from "./containers/post/post.component";
import { PostsComponent } from "./containers/posts/posts.component";

const routes: Routes = [
	{ path: "", component: PostsComponent },
	{ path: ":id", component: PostComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PostsRoutingModule {}

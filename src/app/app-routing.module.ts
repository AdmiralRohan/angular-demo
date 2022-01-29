import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/containers/layout/layout.component";

const routes: Routes = [
	// Dashboard route added before this, through app.module. Not lazily loaded as opening page.
	// Not found page comes from layout.module
	{
		path: "posts",
		component: LayoutComponent,
		loadChildren: () => import("./posts/posts.module").then((m) => m.PostsModule),
	},
	{
		path: "albums",
		component: LayoutComponent,
		loadChildren: () => import("./albums/albums.module").then((m) => m.AlbumsModule),
	},
	{
		path: "photos",
		component: LayoutComponent,
		loadChildren: () => import("./photos/photos.module").then((m) => m.PhotosModule),
	},
	{
		path: "users",
		component: LayoutComponent,
		loadChildren: () => import("./users/users.module").then((m) => m.UsersModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

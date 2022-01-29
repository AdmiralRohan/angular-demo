import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlbumComponent } from "./containers/album/album.component";
import { AlbumsComponent } from "./containers/albums/albums.component";

const routes: Routes = [
	{ path: "", component: AlbumsComponent },
	{ path: ":id", component: AlbumComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AlbumsRoutingModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AlbumsRoutingModule } from "./albums-routing.module";
import { AlbumComponent } from "./containers/album/album.component";
import { AlbumsComponent } from "./containers/albums/albums.component";
import { AlbumListComponent } from "./components/album-list/album-list.component";

@NgModule({
	declarations: [AlbumsComponent, AlbumComponent, AlbumListComponent],
	imports: [CommonModule, AlbumsRoutingModule, SharedModule],
})
export class AlbumsModule {}

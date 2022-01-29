import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlbumsRoutingModule } from "./albums-routing.module";
import { AlbumsComponent } from "./containers/albums/albums.component";
import { AlbumComponent } from "./containers/album/album.component";

@NgModule({
	declarations: [AlbumsComponent, AlbumComponent],
	imports: [CommonModule, AlbumsRoutingModule],
})
export class AlbumsModule {}

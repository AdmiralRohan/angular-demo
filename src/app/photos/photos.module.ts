import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PhotosComponent } from "./containers/photos/photos.component";
import { PhotosRoutingModule } from "./photos-routing.module";
import { PhotoComponent } from "./containers/photo/photo.component";

@NgModule({
	declarations: [PhotosComponent, PhotoComponent],
	imports: [CommonModule, PhotosRoutingModule],
})
export class PhotosModule {}

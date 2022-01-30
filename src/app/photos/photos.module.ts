import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { PhotoComponent } from "./containers/photo/photo.component";
import { PhotosComponent } from "./containers/photos/photos.component";
import { PhotosRoutingModule } from "./photos-routing.module";

@NgModule({
	declarations: [PhotosComponent, PhotoComponent],
	imports: [CommonModule, PhotosRoutingModule, SharedModule],
})
export class PhotosModule {}

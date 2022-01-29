import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PhotoComponent } from "./containers/photo/photo.component";
import { PhotosComponent } from "./containers/photos/photos.component";

const routes: Routes = [
	{ path: "", component: PhotosComponent },
	{ path: ":id", component: PhotoComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PhotosRoutingModule {}

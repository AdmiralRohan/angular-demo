import { Component, OnInit } from "@angular/core";
import { PhotosFacadeService } from "../../services/photos-facade.service";

@Component({
	selector: "app-photos",
	templateUrl: "./photos.component.html",
	styleUrls: ["./photos.component.scss"],
})
export class PhotosComponent implements OnInit {
	filteredPhotos$ = this.photosFacade.filteredPhotos$;
	paginatedPhotos$ = this.photosFacade.paginatedPhotos$;
	queryParams$ = this.photosFacade.queryParams$;

	constructor(public photosFacade: PhotosFacadeService) {}

	ngOnInit(): void {
		this.photosFacade.fetchAndSavePhotoList();
		this.filteredPhotos$.subscribe(console.log);
	}
}

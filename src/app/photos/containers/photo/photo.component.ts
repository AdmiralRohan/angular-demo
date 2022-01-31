import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Photo } from "../../../core/interfaces/photo";
import { PhotosFacadeService } from "../../services/photos-facade.service";

@Component({
	selector: "app-photo",
	templateUrl: "./photo.component.html",
	styleUrls: ["./photo.component.scss"],
})
export class PhotoComponent implements OnInit {
	photo$!: Observable<Photo | undefined>;
	photoId!: number;

	constructor(public photosFacade: PhotosFacadeService, private _route: ActivatedRoute) {}

	ngOnInit() {
		this._route.paramMap.subscribe((params) => {
			this.photoId = +(params.get("id") || 0);

			if (this.photoId) this.photo$ = this.photosFacade.getPhotoById(this.photoId);
		});
	}
}

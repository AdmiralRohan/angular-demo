import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Album } from "../../../core/interfaces/album";
import { AlbumsFacadeService } from "../../services/albums-facade.service";

@Component({
	selector: "app-album",
	templateUrl: "./album.component.html",
	styleUrls: ["./album.component.scss"],
})
export class AlbumComponent implements OnInit {
	albumId!: number;
	album$!: Observable<Album | undefined>;

	constructor(public albumsFacade: AlbumsFacadeService, private _route: ActivatedRoute) {}

	ngOnInit() {
		this._route.paramMap.subscribe((params) => {
			this.albumId = +(params.get("id") || 0);

			// if (this.albumId) this.album$ = this.albumsFacade.getPostById(this.albumId);
		});
	}
}

import { Component, OnInit } from "@angular/core";
import { AlbumsFacadeService } from "./albums/services/albums-facade.service";
import { PhotosFacadeService } from "./photos/services/photos-facade.service";
import { PostsFacadeService } from "./posts/services/posts-facade.service";
import { UsersFacadeService } from "./users/services/users-facade.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	constructor(
		public postsFacade: PostsFacadeService,
		public albumsFacade: AlbumsFacadeService,
		public photosFacade: PhotosFacadeService,
		public usersFacade: UsersFacadeService,
	) {}

	ngOnInit(): void {
		// For caching, as this is parent of all pages
		this.postsFacade.fetchAndSavePostList();
		this.albumsFacade.fetchAndSaveAlbumList();
		this.photosFacade.fetchAndSavePhotoList();
		this.usersFacade.fetchAndSaveUserList();
	}
}

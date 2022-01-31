import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Album } from "../../../core/interfaces/album";
import { Post } from "../../../core/interfaces/post";
import { User } from "../../../core/interfaces/user";
import { UsersFacadeService } from "../../services/users-facade.service";

@Component({
	selector: "app-user",
	templateUrl: "./user.component.html",
	styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
	userId!: number;
	user$!: Observable<User | undefined>;
	postsByUser$!: Observable<Post[]>;
	albumsByUser$!: Observable<Album[]>;

	constructor(public usersFacade: UsersFacadeService, private _route: ActivatedRoute) {}

	ngOnInit() {
		this._route.paramMap.subscribe((params) => {
			this.userId = +(params.get("id") || 0);

			if (this.userId) {
				this.user$ = this.usersFacade.getUserById(this.userId);

				this.postsByUser$ = this.usersFacade.getPostsByUserId(this.userId);
				this.albumsByUser$ = this.usersFacade.getAlbumsByUserId(this.userId);
			}
		});
	}
}

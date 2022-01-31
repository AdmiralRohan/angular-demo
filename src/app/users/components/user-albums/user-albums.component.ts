import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Album } from "../../../core/interfaces/album";

@Component({
	selector: "app-user-albums",
	templateUrl: "./user-albums.component.html",
	styleUrls: ["./user-albums.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAlbumsComponent {
	@Input() albumsByUser: Album[] = [];
}

import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Album } from "../../../core/interfaces/album";

@Component({
	selector: "app-album-list",
	templateUrl: "./album-list.component.html",
	styleUrls: ["./album-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumListComponent {
	@Input() albumList!: Album[];
}

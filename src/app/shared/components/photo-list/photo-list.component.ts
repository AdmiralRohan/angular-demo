import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Photo } from "../../../core/interfaces/photo";

@Component({
	selector: "app-photo-list",
	templateUrl: "./photo-list.component.html",
	styleUrls: ["./photo-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoListComponent {
	@Input() photoList!: Photo[];
	@Input() showAlbumLink = true;
}

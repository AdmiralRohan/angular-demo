import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Photo } from "../../../core/interfaces/photo";

@Component({
	selector: "app-latest-photos",
	templateUrl: "./latest-photos.component.html",
	styleUrls: ["./latest-photos.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatestPhotosComponent {
	@Input() latestPhotos: Photo[] = [];
}

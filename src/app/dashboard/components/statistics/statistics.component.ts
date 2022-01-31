import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-statistics",
	templateUrl: "./statistics.component.html",
	styleUrls: ["./statistics.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent {
	@Input() totalPosts = 0;
	@Input() totalAlbums = 0;
	@Input() totalPhotos = 0;
}

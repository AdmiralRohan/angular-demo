import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { BreadcrumbItem } from "../../../core/interfaces/breadcrumb-item";

@Component({
	selector: "app-breadcrumb",
	templateUrl: "./breadcrumb.component.html",
	styleUrls: ["./breadcrumb.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
	@Input() breadcrumbItems!: BreadcrumbItem[];
}

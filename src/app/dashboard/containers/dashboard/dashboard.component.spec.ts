import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LatestPhotosComponent } from "../../components/latest-photos/latest-photos.component";
import { LatestPostsComponent } from "../../components/latest-posts/latest-posts.component";
import { StatisticsComponent } from "../../components/statistics/statistics.component";
import { DashboardComponent } from "./dashboard.component";

describe("DashboardComponent", () => {
	let component: DashboardComponent;
	let fixture: ComponentFixture<DashboardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				DashboardComponent,
				StatisticsComponent,
				LatestPostsComponent,
				LatestPhotosComponent,
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DashboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});

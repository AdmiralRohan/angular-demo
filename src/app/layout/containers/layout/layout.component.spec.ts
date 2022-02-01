import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { LeftNavComponent } from "../left-nav/left-nav.component";
import { LayoutComponent } from "./layout.component";

describe("LayoutComponent", () => {
	let component: LayoutComponent;
	let fixture: ComponentFixture<LayoutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LayoutComponent, BreadcrumbComponent, LeftNavComponent],
			imports: [RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});

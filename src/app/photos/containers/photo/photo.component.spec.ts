import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { activatedRouteMock, photosFacadeMock } from "../../../core/mocks";
import { PhotosFacadeService } from "../../services/photos-facade.service";
import { PhotoComponent } from "./photo.component";

describe("PhotoComponent", () => {
	let component: PhotoComponent;
	let fixture: ComponentFixture<PhotoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PhotoComponent],
			providers: [
				{ provide: PhotosFacadeService, useValue: photosFacadeMock },
				{ provide: ActivatedRoute, useValue: activatedRouteMock },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PhotoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});

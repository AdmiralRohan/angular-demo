import { ComponentFixture, TestBed } from "@angular/core/testing";
import { photosFacadeMock } from "../../../core/mocks";
import { PhotosFacadeService } from "../../services/photos-facade.service";
import { PhotosComponent } from "./photos.component";

describe("PhotosComponent", () => {
	let component: PhotosComponent;
	let fixture: ComponentFixture<PhotosComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PhotosComponent],
			providers: [{ provide: PhotosFacadeService, useValue: photosFacadeMock }],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PhotosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});

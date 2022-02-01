import { ComponentFixture, TestBed } from "@angular/core/testing";
import { albumsFacadeMock } from "../../../core/mocks";
import { AlbumsFacadeService } from "../../services/albums-facade.service";
import { AlbumsComponent } from "./albums.component";

describe("AlbumsComponent", () => {
	let component: AlbumsComponent;
	let fixture: ComponentFixture<AlbumsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AlbumsComponent],
			providers: [{ provide: AlbumsFacadeService, useValue: albumsFacadeMock }],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AlbumsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});

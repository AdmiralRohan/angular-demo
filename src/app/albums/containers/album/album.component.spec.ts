import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import {
	activatedRouteMock,
	albumFacadeMock,
	albumsFacadeMock,
	photosFacadeMock,
} from "../../../core/mocks";
import { PhotosFacadeService } from "../../../photos/services/photos-facade.service";
import { AlbumFacadeService } from "../../services/album-facade.service";
import { AlbumsFacadeService } from "../../services/albums-facade.service";
import { AlbumComponent } from "./album.component";

describe("AlbumComponent", () => {
	let component: AlbumComponent;
	let fixture: ComponentFixture<AlbumComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AlbumComponent],
			imports: [RouterTestingModule],
			providers: [
				{ provide: AlbumsFacadeService, useValue: albumsFacadeMock },
				{ provide: AlbumFacadeService, useValue: albumFacadeMock },
				{ provide: PhotosFacadeService, useValue: photosFacadeMock },
				{ provide: ActivatedRoute, useValue: activatedRouteMock },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AlbumComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});

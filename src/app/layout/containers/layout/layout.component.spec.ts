import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AlbumsFacadeService } from "../../../albums/services/albums-facade.service";
import {
	albumsFacadeMock,
	photosFacadeMock,
	postsFacadeMock,
	usersFacadeMock,
} from "../../../core/mocks";
import { PhotosFacadeService } from "../../../photos/services/photos-facade.service";
import { PostsFacadeService } from "../../../posts/services/posts-facade.service";
import { UsersFacadeService } from "../../../users/services/users-facade.service";
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { HeaderComponent } from "../header/header.component";
import { LeftNavComponent } from "../left-nav/left-nav.component";
import { LayoutComponent } from "./layout.component";

describe("LayoutComponent", () => {
	let component: LayoutComponent;
	let fixture: ComponentFixture<LayoutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LayoutComponent, HeaderComponent, BreadcrumbComponent, LeftNavComponent],
			imports: [RouterTestingModule],
			providers: [
				{ provide: PostsFacadeService, useValue: postsFacadeMock },
				{ provide: AlbumsFacadeService, useValue: albumsFacadeMock },
				{ provide: PhotosFacadeService, useValue: photosFacadeMock },
				{ provide: UsersFacadeService, useValue: usersFacadeMock },
			],
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

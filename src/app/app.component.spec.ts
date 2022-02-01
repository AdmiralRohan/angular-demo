import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AlbumsFacadeService } from "./albums/services/albums-facade.service";
import { AppComponent } from "./app.component";
import { albumsFacadeMock, photosFacadeMock, postsFacadeMock, usersFacadeMock } from "./core/mocks";
import { PhotosFacadeService } from "./photos/services/photos-facade.service";
import { PostsFacadeService } from "./posts/services/posts-facade.service";
import { UsersFacadeService } from "./users/services/users-facade.service";

describe("AppComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AppComponent],
			providers: [
				{ provide: PostsFacadeService, useValue: postsFacadeMock },
				{ provide: AlbumsFacadeService, useValue: albumsFacadeMock },
				{ provide: PhotosFacadeService, useValue: photosFacadeMock },
				{ provide: UsersFacadeService, useValue: usersFacadeMock },
			],
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	// it(`should have as title 'angular-demo'`, () => {
	// 	const fixture = TestBed.createComponent(AppComponent);
	// 	const app = fixture.componentInstance;
	// 	expect(app.title).toEqual("angular-demo");
	// });

	// it("should render title", () => {
	// 	const fixture = TestBed.createComponent(AppComponent);
	// 	fixture.detectChanges();
	// 	const compiled = fixture.nativeElement as HTMLElement;
	// 	expect(compiled.querySelector(".content span")?.textContent).toContain(
	// 		"angular-demo app is running!",
	// 	);
	// });
});

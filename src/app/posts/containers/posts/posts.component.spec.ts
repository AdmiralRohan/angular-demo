import { ComponentFixture, TestBed } from "@angular/core/testing";
import { postsFacadeMock } from "../../../core/mocks";
import { PostsFacadeService } from "../../services/posts-facade.service";
import { PostsComponent } from "./posts.component";

describe("PostsComponent", () => {
	let component: PostsComponent;
	let fixture: ComponentFixture<PostsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PostsComponent],
			providers: [{ provide: PostsFacadeService, useValue: postsFacadeMock }],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PostsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});

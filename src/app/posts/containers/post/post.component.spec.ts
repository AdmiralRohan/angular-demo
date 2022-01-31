import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { activatedRouteMock, postsFacadeMock } from "../../../core/mocks";
import { PostsFacadeService } from "../../services/posts-facade.service";
import { PostComponent } from "./post.component";

describe("PostComponent", () => {
	let component: PostComponent;
	let fixture: ComponentFixture<PostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PostComponent],
			providers: [
				{ provide: PostsFacadeService, useValue: postsFacadeMock },
				{ provide: ActivatedRoute, useValue: activatedRouteMock },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});

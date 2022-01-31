import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { activatedRouteMock, usersFacadeMock } from "../../../core/mocks";
import { UsersFacadeService } from "../../services/users-facade.service";
import { UserComponent } from "./user.component";

describe("UserComponent", () => {
	let component: UserComponent;
	let fixture: ComponentFixture<UserComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserComponent],
			providers: [
				{ provide: UsersFacadeService, useValue: usersFacadeMock },
				{ provide: ActivatedRoute, useValue: activatedRouteMock },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UserComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});

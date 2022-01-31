import { TestBed } from "@angular/core/testing";
import { DataService } from "../../core/http/data/data.service";
import { dataServiceMock, miniStoreMock } from "../../core/mocks";
import { Store } from "../../core/store";
import { UsersFacadeService } from "./users-facade.service";

describe("UsersFacadeService", () => {
	let service: UsersFacadeService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: Store, useValue: miniStoreMock },
				{ provide: DataService, useValue: dataServiceMock },
			],
		});
		service = TestBed.inject(UsersFacadeService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});

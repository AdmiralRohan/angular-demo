import { TestBed } from "@angular/core/testing";

import { PhotosFacadeService } from "./photos-facade.service";

describe("PhotosFacadeService", () => {
	let service: PhotosFacadeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PhotosFacadeService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});

import { TestBed } from "@angular/core/testing";

import { AlbumFacadeService } from "./album-facade.service";

describe("AlbumFacadeService", () => {
	let service: AlbumFacadeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AlbumFacadeService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});

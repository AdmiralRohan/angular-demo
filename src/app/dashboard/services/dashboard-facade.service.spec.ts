import { TestBed } from "@angular/core/testing";
import { miniStoreMock } from "../../core/mocks";
import { Store } from "../../core/store";
import { DashboardFacadeService } from "./dashboard-facade.service";

describe("DashboardFacadeService", () => {
	let service: DashboardFacadeService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [{ provide: Store, useValue: miniStoreMock }],
		});
		service = TestBed.inject(DashboardFacadeService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("verify generateStats()", (done) => {
		service.generateStats().subscribe((result) => {
			const expectedResult = {
				totalPosts: 3,
				totalAlbums: 2,
				totalPhotos: 3,
				latestPosts: [
					{
						userId: 1,
						id: 1,
						title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
						body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
					},
					{
						userId: 1,
						id: 2,
						title: "qui est esse",
						body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
					},
					{
						userId: 1,
						id: 3,
						title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
						body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
					},
				],
				latestPhotos: [
					{
						albumId: 1,
						id: 1,
						title: "accusamus beatae ad facilis cum similique qui sunt",
						url: "https://via.placeholder.com/600/92c952",
						thumbnailUrl: "https://via.placeholder.com/150/92c952",
					},
					{
						albumId: 1,
						id: 2,
						title: "reprehenderit est deserunt velit ipsam",
						url: "https://via.placeholder.com/600/771796",
						thumbnailUrl: "https://via.placeholder.com/150/771796",
					},
					{
						albumId: 1,
						id: 3,
						title: "officia porro iure quia iusto qui ipsa ut modi",
						url: "https://via.placeholder.com/600/24f355",
						thumbnailUrl: "https://via.placeholder.com/150/24f355",
					},
				],
			};

			expect(result).toEqual(expectedResult);
			done();
		});
	});
});

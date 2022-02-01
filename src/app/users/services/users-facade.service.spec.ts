import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { DataService } from "../../core/http/data/data.service";
import { State } from "../../core/interfaces/state";
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

	it("verify getUserById()", (done) => {
		service.getUserById(1).subscribe((result) => {
			const expectedResult = {
				id: 1,
				name: "Leanne Graham",
				username: "Bret",
				email: "Sincere@april.biz",
				address: {
					street: "Kulas Light",
					suite: "Apt. 556",
					city: "Gwenborough",
					zipcode: "92998-3874",
					geo: {
						lat: "-37.3159",
						lng: "81.1496",
					},
				},
				phone: "1-770-736-8031 x56442",
				website: "hildegard.org",
				company: {
					name: "Romaguera-Crona",
					catchPhrase: "Multi-layered client-server neural-net",
					bs: "harness real-time e-markets",
				},
			};
			expect(result).toEqual(expectedResult);
			done();
		});
	});

	it("verify getPostsByUserId()", (done) => {
		service.getPostsByUserId(1).subscribe((result) => {
			const expectedResult = [
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
			];
			expect(result).toEqual(expectedResult);
			done();
		});
	});

	it("verify getAlbumsByUserId()", (done) => {
		service.getAlbumsByUserId(1).subscribe((result) => {
			const expectedResult = [
				{
					userId: 1,
					id: 1,
					title: "quidem molestiae enim",
					photos: [
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
				},
				{
					userId: 1,
					id: 2,
					title: "sunt qui excepturi placeat culpa",
					photos: [],
				},
			];
			expect(result).toEqual(expectedResult);
			done();
		});
	});

	it("verify fetchAndSaveUserList()", (done) => {
		const tempStore: { [key: string]: any } = {
			users: [],
		};
		const mockUserList = [
			{
				id: 1,
				name: "Leanne Graham",
				username: "Bret",
				email: "Sincere@april.biz",
				address: {
					street: "Kulas Light",
					suite: "Apt. 556",
					city: "Gwenborough",
					zipcode: "92998-3874",
					geo: {
						lat: "-37.3159",
						lng: "81.1496",
					},
				},
				phone: "1-770-736-8031 x56442",
				website: "hildegard.org",
				company: {
					name: "Romaguera-Crona",
					catchPhrase: "Multi-layered client-server neural-net",
					bs: "harness real-time e-markets",
				},
			},
		];
		spyOn(miniStoreMock, "set").and.callFake((key: keyof State, currentValue: any) => {
			tempStore[key] = currentValue;
		});
		spyOn(miniStoreMock, "select").and.callFake((key: keyof State) => {
			return of((tempStore as any)[key]);
		});
		spyOn(dataServiceMock, "fetchUserList").and.callFake(() => {
			return of(mockUserList);
		});

		service.fetchAndSaveUserList();
		expect(tempStore["users"]).toEqual(mockUserList);
		done();
	});
});

import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { DataService } from "../../core/http/data/data.service";
import { State } from "../../core/interfaces/state";
import { activatedRouteMock, dataServiceMock, miniStoreMock, routerMock } from "../../core/mocks";
import { Store } from "../../core/store";
import { AlbumsFacadeService } from "./albums-facade.service";

describe("AlbumsFacadeService", () => {
	let service: AlbumsFacadeService;
	let router: Router;
	let route: ActivatedRoute;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: Store, useValue: miniStoreMock },
				{ provide: DataService, useValue: dataServiceMock },
				{ provide: ActivatedRoute, useValue: activatedRouteMock },
				{ provide: Router, useValue: routerMock },
			],
		});
		service = TestBed.inject(AlbumsFacadeService);
		router = TestBed.inject(Router);
		route = TestBed.inject(ActivatedRoute);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("verify getAlbumById()", (done) => {
		service.getAlbumById(1).subscribe((result) => {
			const expectedResult = {
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
			};
			expect(result).toEqual(expectedResult);
			done();
		});
	});

	it("verify getter filteredAlbums$", (done) => {
		service.filteredAlbums$.subscribe((result) => {
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
			];

			expect(result).toEqual(expectedResult);
			done();
		});
	});

	it("verify getter queryParams$", (done) => {
		service.queryParams$.subscribe((result) => {
			const expectedResult = { search: "sunt", filterBy: "title", page: 1 };

			expect(result).toEqual(expectedResult);
			done();
		});
	});

	it("verify getter paginatedAlbums$", (done) => {
		service.paginatedAlbums$.subscribe((result) => {
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
			];

			expect(result).toEqual(expectedResult);
			done();
		});
	});

	it("verify fetchAndSaveAlbumList()", (done) => {
		const tempStore: { [key: string]: any } = {
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
		};
		const mockAlbumList = [
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
		spyOn(miniStoreMock, "set").and.callFake((key: keyof State, currentValue: any) => {
			tempStore[key] = currentValue;
		});
		spyOn(miniStoreMock, "select").and.callFake((key: keyof State) => {
			return of((tempStore as any)[key]);
		});
		spyOn(dataServiceMock, "fetchAlbumList").and.callFake(() => {
			return of(mockAlbumList);
		});

		service.fetchAndSaveAlbumList();
		expect(tempStore["albums"]).toEqual(mockAlbumList);
		expect(tempStore["filteredAlbums"]).toEqual(mockAlbumList);
		done();
	});

	it("verify paginate()", () => {
		const tempStore: { [key: string]: any } = {
			filteredAlbums: [
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
			],
		};
		spyOn(miniStoreMock, "set").and.callFake((key: keyof State, currentValue: any) => {
			tempStore[key] = currentValue;
		});
		spyOn(miniStoreMock, "getLatestValue").and.callFake((key: keyof State) => {
			return (tempStore as any)[key];
		});

		service.paginate({ startIndex: 0, endIndex: 0 });
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
		];
		expect(tempStore["paginatedAlbums"]).toEqual(expectedResult);
	});

	it("verify appendToQueryParams()", () => {
		const tempStore: { [key: string]: any } = { queryParams: {} };
		spyOn(miniStoreMock, "set").and.callFake((key: keyof State, currentValue: any) => {
			tempStore[key] = currentValue;
		});
		spyOn(miniStoreMock, "getLatestValue").and.callFake((key: keyof State) => {
			return (tempStore as any)[key];
		});

		service.appendToQueryParams({ page: 1 });
		expect(tempStore["queryParams"]).toEqual({ page: 1 });
		service.appendToQueryParams({ page: 2, filterBy: "title" });
		expect(tempStore["queryParams"]).toEqual({ page: 2, filterBy: "title" });
	});

	it("verify addQueryParamsToRoute()", () => {
		service.addQueryParamsToRoute();

		const spy = router.navigate as jasmine.Spy;
		const navArgs = spy.calls.first().args;
		expect(navArgs[0]).toEqual([]);
		expect(navArgs[1]["queryParams"]).toEqual({
			search: "sunt",
			filterBy: "title",
			page: 1,
		});
	});

	it("verify listenToQueryParamsChange()", () => {
		const tempStore: { [key: string]: any } = {
			queryParams: {},
			filteredALbums: [],
		};

		route.queryParams = of({ search: "quidem molestiae enim", filterBy: "title" });
		spyOn(miniStoreMock, "set").and.callFake((key: keyof State, currentValue: any) => {
			tempStore[key] = currentValue;
		});
		spyOn(miniStoreMock, "getLatestValue").and.callFake((key: keyof State) => {
			return (tempStore as any)[key];
		});

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
		];

		service.listenToQueryParamsChange();
		expect(tempStore["filteredAlbums"]).toEqual(expectedResult);
	});
});

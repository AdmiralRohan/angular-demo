import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { DataService } from "../../core/http/data/data.service";
import { State } from "../../core/interfaces/state";
import { activatedRouteMock, dataServiceMock, miniStoreMock, routerMock } from "../../core/mocks";
import { Store } from "../../core/store";
import { PostsFacadeService } from "./posts-facade.service";

describe("PostsFacadeService", () => {
	let service: PostsFacadeService;
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
		service = TestBed.inject(PostsFacadeService);
		router = TestBed.inject(Router);
		route = TestBed.inject(ActivatedRoute);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("verify getPostById()", (done) => {
		service.getPostById(1).subscribe((result) => {
			const expectedResult = {
				userId: 1,
				id: 1,
				title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
				body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
			};

			expect(result).toEqual(expectedResult);
			done();
		});
	});

	it("verify getter filterPosts$", (done) => {
		service.filteredPosts$.subscribe((result) => {
			const expectedResult = [
				{
					userId: 1,
					id: 1,
					title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
					body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
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

	it("verify getter paginatedPosts$", (done) => {
		service.paginatedPosts$.subscribe((result) => {
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
			];

			expect(result).toEqual(expectedResult);
			done();
		});
	});

	it("verify getter sortDirection", () => {
		const expectedResult = "desc";
		expect(service.sortDirection).toEqual(expectedResult);
	});

	it("verify fetchAndSavePostList()", () => {
		const tempStore: { [key: string]: any } = {};
		const mockPostList = [
			{
				userId: 1,
				id: 1,
				title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
				body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
			},
		];
		spyOn(miniStoreMock, "set").and.callFake((key: keyof State, currentValue: any) => {
			tempStore[key] = currentValue;
		});
		spyOn(miniStoreMock, "select").and.callFake((key: keyof State) => {
			return (tempStore as any)[key];
		});
		spyOn(dataServiceMock, "fetchPostList").and.callFake(() => {
			return of(mockPostList);
		});

		service.fetchAndSavePostList();
		expect(tempStore["posts"]).toEqual(mockPostList);
		expect(tempStore["filteredPosts"]).toEqual(mockPostList);
	});

	it("verify changeSortDirection()", () => {
		const tempStore: { [key: string]: any } = { postSortDirection: "desc" };
		spyOn(miniStoreMock, "set").and.callFake((key: keyof State, currentValue: any) => {
			tempStore[key] = currentValue;
		});
		spyOn(miniStoreMock, "select").and.callFake((key: keyof State) => {
			return (tempStore as any)[key];
		});

		service.changeSortDirection("asc");
		expect(tempStore["postSortDirection"]).toEqual("asc");
	});

	it("verify paginate()", () => {
		const tempStore: { [key: string]: any } = {
			filteredPosts: [
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
		};
		spyOn(miniStoreMock, "set").and.callFake((key: keyof State, currentValue: any) => {
			tempStore[key] = currentValue;
		});
		spyOn(miniStoreMock, "getLatestValue").and.callFake((key: keyof State) => {
			return (tempStore as any)[key];
		});

		service.paginate({ startIndex: 0, endIndex: 1 });
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
		];
		expect(tempStore["paginatedPosts"]).toEqual(expectedResult);
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
		const tempStore: { [key: string]: any } = { queryParams: {}, filteredPosts: [] };

		route.queryParams = of({ search: "repellat provident", filterBy: "title" });
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
				title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
				body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
			},
		];

		service.listenToQueryParamsChange();
		expect(tempStore["filteredPosts"]).toEqual(expectedResult);
	});
});

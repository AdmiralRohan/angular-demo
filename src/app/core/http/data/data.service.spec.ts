import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "../../../../environments/environment";
import { miniMockState, mockState } from "../../mocks";
import { DataService } from "./data.service";

describe("DataService", () => {
	let service: DataService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(DataService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("verify fetchPostList()", () => {
		service.fetchPostList().subscribe((posts) => {
			expect(posts.length).toBe(100);
			expect(posts).toEqual(mockState.posts);
		});

		const req = httpMock.expectOne(`${environment.apiBaseURL}/posts`);
		expect(req.request.method).toBe("GET");
		req.flush(mockState.posts);
	});

	it("verify fetchPostById()", () => {
		service.fetchPostById(1).subscribe((post) => {
			expect(post).toEqual(mockState.posts[0]);
		});

		const req = httpMock.expectOne(`${environment.apiBaseURL}/posts/1`);
		expect(req.request.method).toBe("GET");
		req.flush(mockState.posts[0]);
	});

	it("verify fetchPhotoList()", () => {
		service.fetchPhotoList().subscribe((photos) => {
			expect(photos.length).toBe(5000);
			expect(photos).toEqual(mockState.photos);
		});

		const req = httpMock.expectOne(`${environment.apiBaseURL}/photos`);
		expect(req.request.method).toBe("GET");
		req.flush(mockState.photos);
	});

	it("verify fetchPhotoById()", () => {
		service.fetchPhotoById(1).subscribe((photo) => {
			expect(photo).toEqual(mockState.photos[0]);
		});

		const req = httpMock.expectOne(`${environment.apiBaseURL}/photos/1`);
		expect(req.request.method).toBe("GET");
		req.flush(mockState.photos[0]);
	});

	it("verify fetchAlbumList()", () => {
		service.fetchAlbumList().subscribe((albums) => {
			expect(albums.length).toBe(2);
			expect(albums).toEqual(miniMockState.albums);
		});

		const req = httpMock.expectOne(`${environment.apiBaseURL}/albums`);
		expect(req.request.method).toBe("GET");
		req.flush(miniMockState.albums);
	});

	it("verify fetchAlbumById()", () => {
		service.fetchAlbumById(1).subscribe((album) => {
			expect(album).toEqual(miniMockState.albums[0]);
		});

		const req = httpMock.expectOne(`${environment.apiBaseURL}/albums/1`);
		expect(req.request.method).toBe("GET");

		const dummyResponse = miniMockState.albums[0];
		req.flush(dummyResponse);
	});

	it("verify fetchUserList()", () => {
		service.fetchUserList().subscribe((users) => {
			expect(users.length).toBe(10);
			expect(users).toEqual(mockState.users);
		});

		const req = httpMock.expectOne(`${environment.apiBaseURL}/users`);
		expect(req.request.method).toBe("GET");
		req.flush(mockState.users);
	});

	it("verify fetchUserById()", () => {
		service.fetchUserById(1).subscribe((user) => {
			expect(user).toEqual(mockState.users[0]);
		});

		const req = httpMock.expectOne(`${environment.apiBaseURL}/users/1`);
		expect(req.request.method).toBe("GET");
		req.flush(mockState.users[0]);
	});
});

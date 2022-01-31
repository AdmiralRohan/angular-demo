import { Observable, of } from "rxjs";
import { State } from "./interfaces/state";
import Albums from "./mocks/albums.json";
import Photos from "./mocks/photos.json";
import Posts from "./mocks/posts.json";
import Users from "./mocks/users.json";

const mockState: State = {
	posts: Posts,
	filteredPosts: [],
	paginatedPosts: [],
	postSortDirection: "none",
	queryParams: { search: "", filterBy: "title", page: 1 },
	photos: Photos,
	filteredPhotos: [],
	paginatedPhotos: [],
	albums: [],
	// albums: Albums,
	filteredAlbums: [],
	paginatedAlbums: [],
	users: Users,
};

/**
 * Simplified inputs for easier typing
 */
const miniMockState: State = {
	posts: [
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
	filteredPosts: [],
	paginatedPosts: [],
	postSortDirection: "none",
	queryParams: { search: "", filterBy: "title", page: 1 },
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
	filteredPhotos: [],
	paginatedPhotos: [],
	albums: [
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
	],
	filteredAlbums: [],
	paginatedAlbums: [],
	users: [
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
	],
};

export const dataServiceMock = {
	fetchPostList: () => of(Posts),
	fetchAlbumsList: () => of(Albums),
	fetchPhotosList: () => of(Photos),
	fetchUsersList: () => of(Users),
};

export const storeMock = {
	select: (key: string): Observable<any> => {
		return of((mockState as any)[key]);
	},
};
export const miniStoreMock = {
	select: (key: string): Observable<any> => {
		return of((miniMockState as any)[key]);
	},
};

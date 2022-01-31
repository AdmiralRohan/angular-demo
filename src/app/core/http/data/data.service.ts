import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Album } from "../../interfaces/album";
import { Photo } from "../../interfaces/photo";
import { Post } from "../../interfaces/post";
import { User } from "../../interfaces/user";

/**
 * All http calls
 */
@Injectable({
	providedIn: "root",
})
export class DataService {
	apiBaseUrl = environment.apiBaseURL;

	constructor(private _http: HttpClient) {}

	fetchPostList(): Observable<Post[]> {
		return this._http.get<Post[]>(`${this.apiBaseUrl}/posts`);
	}
	fetchPostById(postId: number): Observable<Post> {
		return this._http.get<Post>(`${this.apiBaseUrl}/posts/${postId}`);
	}

	fetchAlbumList(): Observable<Album[]> {
		return this._http.get<Album[]>(`${this.apiBaseUrl}/albums`);
	}
	fetchAlbumById(albumId: number): Observable<Album> {
		return this._http.get<Album>(`${this.apiBaseUrl}/albums/${albumId}`);
	}

	fetchPhotoList(): Observable<Photo[]> {
		return this._http.get<Photo[]>(`${this.apiBaseUrl}/photos`);
	}
	fetchPhotoById(photoId: number): Observable<Photo> {
		return this._http.get<Photo>(`${this.apiBaseUrl}/photos/${photoId}`);
	}

	fetchUserList(): Observable<User[]> {
		return this._http.get<User[]>(`${this.apiBaseUrl}/users`);
	}
	fetchUserById(userId: number): Observable<any> {
		return this._http.get<User>(`${this.apiBaseUrl}/users/${userId}`);
	}
}

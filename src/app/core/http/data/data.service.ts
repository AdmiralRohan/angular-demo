import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Post } from "../../interfaces/post";

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

	fetchAlbumList(): Observable<any[]> {
		return this._http.get<any[]>(`${this.apiBaseUrl}/albums`);
	}

	fetchPhotoList(): Observable<any[]> {
		return this._http.get<any[]>(`${this.apiBaseUrl}/photos`);
	}

	fetchUserList(): Observable<any[]> {
		return this._http.get<any[]>(`${this.apiBaseUrl}/users`);
	}
}

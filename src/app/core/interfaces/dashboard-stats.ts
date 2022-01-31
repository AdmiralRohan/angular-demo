import { Photo } from "./photo";
import { Post } from "./post";

export interface DashboardStats {
	totalPosts: number;
	totalAlbums: number;
	totalPhotos: number;
	latestPosts: Post[];
	latestPhotos: Photo[];
}

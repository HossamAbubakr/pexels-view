import { PageAlbum, Photo } from "../types/types";
import { get } from "./baseApi";

const PAGE_SIZE = 80;

export async function getCurated(pageIndex = 1): Promise<PageAlbum | null> {
  const CURATED_URL = `/curated?page=${pageIndex}&per_page=${PAGE_SIZE}`;
  try {
    return await get<PageAlbum>(CURATED_URL);
  } catch (error) {
    console.error("Failed to fetch curated photos:", error);
    return null;
  }
}

export async function getPhoto(id: number): Promise<Photo | null> {
  try {
    return await get<Photo>(`photos/${id}`);
  } catch (error) {
    console.error(`Failed to fetch photo with ID ${id}:`, error);
    return null;
  }
}

export async function searchPhotos(
  query: string,
  pageIndex = 1
): Promise<PageAlbum | null> {
  try {
    return await get<PageAlbum>(
      `search?query=${query}&page=${pageIndex}&per_page=${PAGE_SIZE}`
    );
  } catch (error) {
    console.error(`Failed to search photos for query "${query}":`, error);
    return null;
  }
}

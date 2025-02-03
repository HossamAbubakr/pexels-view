import { getCurated, searchPhotos } from "./photoApi";

export default async function photoFetcher(pageIndex: number, search?: string) {
  try {
    const result = search
      ? await searchPhotos(search, pageIndex)
      : await getCurated(pageIndex);

    return result ?? null;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return null;
  }
}

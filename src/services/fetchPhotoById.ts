import { getPhoto } from "./photoApi";

export default async function fetchPhotoById(photoId: number) {
  try {
    return await getPhoto(photoId);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return null;
  }
}

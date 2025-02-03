import { lazy, Suspense } from "react";
import { MasonryPhotoAlbum } from "./MasonryPhotoAlbum/MasonryPhotoAlbum";
import { useGlobalContext } from "../context/GlobalContext";

const InfiniteScroll = lazy(() => import("./InfiniteScroll/InfiniteScroll"));

export const MasonryGrid = () => {
  const {
    pageAlbum: { photos },
  } = useGlobalContext();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InfiniteScroll>
        <MasonryPhotoAlbum
          photos={photos}
          spacing={20}
          componentsProps={{ container: { style: { marginBottom: 20 } } }}
        />
      </InfiniteScroll>
    </Suspense>
  );
};

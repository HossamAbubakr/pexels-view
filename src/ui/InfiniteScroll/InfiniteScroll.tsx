import type React from "react";
import { Children, cloneElement, isValidElement, useCallback } from "react";
import { Offscreen } from "./Offscreen";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { CommonPhotoAlbumProps } from "../../types/types";
import { useGlobalContext } from "../../context/GlobalContext";

export type InfiniteScrollProps = {
  fetchRootMargin?: string;
  offscreenRootMargin?: string;
  children: React.ReactElement<
    Pick<CommonPhotoAlbumProps, "photos" | "render">
  >;
};

export default function InfiniteScroll({
  fetchRootMargin = "1000px",
  offscreenRootMargin = "2000px",
  children: photoAlbum,
}: InfiniteScrollProps) {
  const { photoBatches, getNextPage } = useGlobalContext();
  const { observe, unobserve } = useIntersectionObserver(fetchRootMargin);

  const handleFetch = useCallback(async () => {
    getNextPage(photoBatches.length);
  }, [getNextPage, photoBatches.length]);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      unobserve();

      if (node) {
        observe(node, ({ isIntersecting }) => {
          if (isIntersecting) {
            handleFetch();
          }
        });
      }
    },
    [observe, unobserve, handleFetch]
  );

  return (
    <>
      {cloneElement(photoAlbum, {
        photos: photoBatches.flatMap((batch) => batch),
        render: {
          ...photoAlbum.props.render,
          track: ({ children: trackChildren, ...rest }) => (
            <div {...rest}>
              {Children.map(
                trackChildren,
                (child, index) =>
                  isValidElement(child) && (
                    <Offscreen key={index} rootMargin={offscreenRootMargin}>
                      {child}
                    </Offscreen>
                  )
              )}
            </div>
          ),
        },
      })}

      <span ref={sentinelRef} />
    </>
  );
}

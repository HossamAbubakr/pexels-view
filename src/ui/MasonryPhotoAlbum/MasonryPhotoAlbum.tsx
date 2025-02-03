import { useMemo } from "react";
import { useContainerWidth } from "../../hooks/useContainerWidth";
import { StaticPhotoAlbum } from "./StaticPhotoAlbum";
import resolveMasonryProps from "../../utils/resolveMasonryProps";
import { computeMasonryLayout } from "../../utils/masonry";
import { MasonryPhotoAlbumProps } from "../../types/types";

export const MasonryPhotoAlbum = ({
  photos,
  ...additionalProps
}: MasonryPhotoAlbumProps) => {
  const { containerRef, containerWidth } = useContainerWidth();

  const { spacing, padding, columns, ...masonryProps } = resolveMasonryProps(
    containerWidth,
    { photos, ...additionalProps }
  );

  const layout = useMemo(() => {
    if (
      containerWidth !== undefined &&
      spacing !== undefined &&
      padding !== undefined &&
      columns !== undefined
    ) {
      return computeMasonryLayout(
        photos,
        spacing,
        padding,
        containerWidth,
        columns
      );
    }
    return undefined;
  }, [photos, spacing, padding, containerWidth, columns]);

  return (
    <StaticPhotoAlbum ref={containerRef} model={layout} {...masonryProps} />
  );
};

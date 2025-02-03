import { resolveCommonProps, resolveResponsiveParameter } from ".";
import { MasonryPhotoAlbumProps } from "../types/types";

export default function resolveMasonryProps(
  containerWidth: number | undefined,
  { columns, ...rest }: MasonryPhotoAlbumProps,
) {
  return {
    ...rest,
    ...resolveCommonProps(containerWidth, rest),
    columns: resolveResponsiveParameter(columns, containerWidth, [5, 4, 3, 2], 1),
  };
}
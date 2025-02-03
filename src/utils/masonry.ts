import { ratio } from ".";
import { LayoutModel, Photo } from "../types/types";

export const computeMasonryLayout = (
  photos: Photo[],
  spacing: number,
  padding: number,
  containerWidth: number,
  columns: number,
): LayoutModel | undefined => {
  const columnWidth = (containerWidth - spacing * (columns - 1) - 2 * padding * columns) / columns;

  if (columnWidth <= 0) {
    return columns > 1
      ? computeMasonryLayout(photos, spacing, padding, containerWidth, columns - 1)
      : undefined;
  }

  const columnsTopPositions = new Array(columns).fill(0);
  const columnsLayout: { photo: Photo; index: number }[][] = Array.from({ length: columns }, () => []);

  photos.forEach((photo, index) => {
    const shortestColumn = columnsTopPositions.indexOf(Math.min(...columnsTopPositions));
    const photoHeight = columnWidth / ratio(photo);

    columnsTopPositions[shortestColumn] += photoHeight + spacing + 2 * padding;
    columnsLayout[shortestColumn].push({ photo, index });
  });

  return {
    spacing,
    padding,
    containerWidth,
    variables: { columns },
    tracks: columnsLayout.map((column) => ({
      photos: column.map(({ photo, index }) => ({
        photo,
        index,
        width: columnWidth,
        height: columnWidth / ratio(photo),
      })),
    })),
  };
};

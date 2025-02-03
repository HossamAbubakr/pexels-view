import { Photo } from "../types/types";

export const ratio = ({ width, height }: Pick<Photo, "width" | "height">) => {
  return width / height;
};

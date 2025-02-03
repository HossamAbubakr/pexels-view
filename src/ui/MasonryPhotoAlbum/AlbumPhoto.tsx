import {
  ComponentsProps,
  LayoutVariables,
  Photo,
  Render,
} from "../../types/types";
import { Component } from "./Component";
import { PhotoComponent } from "./PhotoComponent";

type AlbumPhoto = {
  componentsProps?: ComponentsProps;
  trackIndex: number;
  photoRender?: Render;
  tracks: {
    variables?: LayoutVariables;
    photos: {
      photo: Photo;
      index: number;
      width: number;
      height: number;
    }[];
  };
};

const AlbumPhoto = ({
  trackIndex,
  photoRender: { track, ...restRender } = {},
  componentsProps: { track: trackProps } = {},
  tracks,
}: AlbumPhoto) => {
  const { photos, variables: trackVariables } = tracks;
  const trackSize = photos.length;
  return (
    <Component
      {...trackProps}
      key={trackIndex}
      render={track}
      classes="track"
      variables={{ trackSize, ...trackVariables }}
    >
      {photos.map((context) => {
        const { photo } = context;
        const { id, src, alt } = photo;

        return (
          <PhotoComponent
            key={id}
            render={restRender}
            componentsProps={{
              image: {
                loading: "lazy" as const,
                decoding: "async" as const,
                src: src.medium,
                alt,
              },
            }}
            {...context}
          />
        );
      })}
    </Component>
  );
};

export default AlbumPhoto;

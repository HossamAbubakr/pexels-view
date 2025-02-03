import type React from "react";
import { forwardRef } from "react";
import { Component } from "./Component";
import {PhotoComponent} from "./PhotoComponent";
import {
  ComponentsProps,
  LayoutModel,
  Render,
} from "../../types/types";

export type StaticPhotoAlbumProps = {
  model?: LayoutModel;
  render?: Render;
  componentsProps?: ComponentsProps;
};

export const StaticPhotoAlbum = forwardRef(
  (
    {
      model,
      render: { container, track, ...restRender } = {},
      componentsProps: {
        container: containerProps,
        track: trackProps,
      } = {},
    }: StaticPhotoAlbumProps,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    const { spacing, padding, containerWidth, tracks, variables } =
      model || {};

    return (
      <Component
        role="group"
        aria-label="Photo album"
        {...containerProps}
        variables={{ spacing, padding, containerWidth, ...variables }}
        classes={["", "masonry"]}
        render={container}
        ref={ref}
      >
        {spacing !== undefined &&
          padding !== undefined &&
          containerWidth !== undefined &&
          tracks?.map(({ photos, variables: trackVariables }, trackIndex) => {
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
          })}
      </Component>
    );
  }
);

import type React from "react";
import { forwardRef } from "react";
import { Component } from "./Component";
import { round } from "../../utils";
import {
  ComponentsProps,
  ForwardedRef,
  Render,
  RenderPhotoContext,
  RenderPhotoProps,
} from "../../types/types";
import { NavLink } from "react-router";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Unwrap<T> = T extends (args: any) => unknown ? never : T;

type Unwrapped<T> = {
  [P in keyof T]: Unwrap<T[P]>;
};

type PhotoComponentProps = RenderPhotoProps &
  RenderPhotoContext & {
    render?: Pick<Render, "image">;
    componentsProps?: Unwrapped<
      Pick<ComponentsProps, "wrapper" | "link" | "button" | "image">
    >;
  };

export const PhotoComponent = forwardRef(
  (
    {
      photo,
      index,
      width,
      height,
      render: { image } = {},
      componentsProps: {
        link: linkProps,
        wrapper: wrapperProps,
        image: imageProps,
      } = {},
    }: PhotoComponentProps,
    ref: ForwardedRef
  ) => {
    const { src } = photo;

    const context = {
      photo,
      index,
      width: round(width, 3),
      height: round(height, 3),
    };

    let props: Omit<
      React.ComponentPropsWithoutRef<typeof Component>,
      "variables"
    >;
    if (src.medium) {
      props = {
        ...linkProps,
        as: "div",
        classes: ["photo", "link"],
      };
    } else {
      props = { ...wrapperProps, classes: "photo" };
    }

    return (
      <Component
        ref={ref}
        variables={{ photoWidth: context.width, photoHeight: context.height }}
        {...{ context, ...props }}
      >
        <NavLink
          to={{
            pathname: `/photo-details/${photo.id}`,
          }}
          state={photo}
        >
          <Component
            as="img"
            classes="image"
            render={image}
            context={context}
            {...imageProps}
          />
        </NavLink>
      </Component>
    );
  }
);

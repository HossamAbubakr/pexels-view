import type React from "react";

export interface PageAlbum {
  page: number;
  per_page: number;
  photos: Photo[];
  next_page: string;
  total_results: number;
}

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: Src;
  liked: boolean;
  alt: string;
}

interface Src {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface Image {
  src: string;

  width: number;

  height: number;
}

export interface CommonPhotoAlbumProps {
  photos: Photo[];

  spacing?: ResponsiveParameter;

  padding?: ResponsiveParameter;

  breakpoints?: number[];

  defaultContainerWidth?: number;

  render?: ResponsiveParameter<Render>;

  componentsProps?:
    | ComponentsProps
    | ((containerWidth?: number) => ComponentsProps);
}

export interface RowsPhotoAlbumProps extends CommonPhotoAlbumProps {
  targetRowHeight?: ResponsiveParameter;

  rowConstraints?: ResponsiveParameter<RowConstraints>;
}

export interface ColumnsPhotoAlbumProps extends CommonPhotoAlbumProps {
  columns?: ResponsiveParameter;
}
export interface MasonryPhotoAlbumProps extends CommonPhotoAlbumProps {
  columns?: ResponsiveParameter;
}

export type RowConstraints = {
  minPhotos?: number;

  maxPhotos?: number;

  singleRowMaxHeight?: number;
};

export type LayoutModel = {
  spacing: number;

  padding: number;

  containerWidth: number;

  variables?: LayoutVariables;

  horizontal?: boolean;

  tracks: {
    variables?: LayoutVariables;

    photos: {
      photo: Photo;

      index: number;

      width: number;

      height: number;
    }[];
  }[];
};

export type LayoutVariables = Record<string, string | number | undefined>;

export type ResponsiveParameter<Value = number> =
  | Value
  | ((containerWidth: number) => Value);

export type ComponentsProps = {
  container?: ContainerComponentProps;

  track?: TrackComponentProps;

  wrapper?: WrapperComponentProps;

  link?: LinkComponentProps;

  button?: ButtonComponentProps;

  image?: ImageComponentProps;
};

export type ContainerComponentProps = React.ComponentPropsWithoutRef<"div">;

export type TrackComponentProps = React.ComponentPropsWithoutRef<"div">;

export type WrapperComponentProps = ContextAware<
  React.ComponentPropsWithoutRef<"div">,
  RenderWrapperContext
>;

export type LinkComponentProps = ContextAware<
  React.ComponentPropsWithoutRef<"a">,
  RenderLinkContext
>;

export type ButtonComponentProps = ContextAware<
  React.ComponentPropsWithoutRef<"button">,
  RenderButtonContext
>;

export type ImageComponentProps = ContextAware<
  React.ComponentPropsWithoutRef<"img">,
  RenderImageContext
>;

export type ClickHandler = (props: ClickHandlerProps) => void;

export type ClickHandlerProps = {
  event: React.MouseEvent;

  photo: Photo;

  index: number;
};

export type Render = {
  container?: RenderContainer;

  track?: RenderTrack;

  wrapper?: RenderWrapper;

  link?: RenderLink;

  button?: RenderButton;

  image?: RenderImage;

  photo?: RenderPhoto;

  extras?: RenderExtras;
};

export type RenderContainer = RenderFunction<RenderContainerProps>;

export type RenderContainerProps = React.ComponentPropsWithRef<"div">;

export type RenderTrack = RenderFunction<RenderTrackProps>;

export type RenderTrackProps = React.ComponentPropsWithoutRef<"div">;

export type RenderWrapper = RenderFunction<
  RenderWrapperProps,
  RenderWrapperContext
>;

export type RenderWrapperProps = React.ComponentPropsWithoutRef<"div">;

export type RenderWrapperContext = RenderPhotoContext;

export type RenderLink = RenderFunction<RenderLinkProps, RenderLinkContext>;

export type RenderLinkProps = NonOptional<
  React.ComponentPropsWithoutRef<"a">,
  "href"
>;

export type RenderLinkContext = RenderPhotoContext;

export type RenderButton = RenderFunction<
  RenderButtonProps,
  RenderButtonContext
>;

export type RenderButtonProps = React.ComponentPropsWithoutRef<"button">;

export type RenderButtonContext = RenderPhotoContext;

export type RenderImage = RenderFunction<RenderImageProps, RenderImageContext>;

export type RenderImageProps = NonOptional<
  React.ComponentPropsWithoutRef<"img">,
  "src"
>;

export type RenderImageContext = RenderPhotoContext;

export type RenderPhoto = RenderFunction<RenderPhotoProps, RenderPhotoContext>;

export type RenderPhotoProps = {
  onClick?: React.MouseEventHandler;
};

export type RenderPhotoContext = {
  photo: Photo;

  index: number;

  width: number;

  height: number;
};

export type RenderExtras = RenderFunction<object, RenderPhotoContext>;

export type RenderFunction<
  Props extends object | void = void,
  Context extends object | void = void
> = [Context] extends [void]
  ? [Props] extends [void]
    ? () => React.ReactNode
    : (props: Props) => React.ReactNode
  : [Props] extends [void]
  ? never
  : (
      props: Props,

      context: Context
    ) => React.ReactNode;

export type NonOptional<Props, Keys extends keyof Props> = Required<
  Pick<Props, Keys>
> &
  Omit<Props, Keys>;

export type ContextAware<Props, Context> =
  | Props
  | ((context: Context) => Props | undefined);

export type JSXElement = React.JSX.Element;

export type ForwardedRef<T extends HTMLElement = HTMLElement> =
  React.ForwardedRef<T>;

export type ElementRef<T extends HTMLElement = HTMLElement> = {
  ref?: React.Ref<T>;
};

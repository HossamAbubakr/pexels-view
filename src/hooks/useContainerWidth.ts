import { useCallback, useReducer, useRef } from "react";

type State = [containerWidth?: number, scrollbarWidth?: number];

type Action = [newContainerWidth?: number, newScrollbarWidth?: number];

const containerWidthReducer = (
  state: State,
  [newContainerWidth, newScrollbarWidth]: Action
): State => {
  const [containerWidth, scrollbarWidth] = state;

  if (
    containerWidth !== undefined &&
    scrollbarWidth !== undefined &&
    newContainerWidth !== undefined &&
    newScrollbarWidth !== undefined &&
    newContainerWidth > containerWidth &&
    newContainerWidth - containerWidth <= 20 &&
    newScrollbarWidth < scrollbarWidth
  ) {
    return [containerWidth, newScrollbarWidth];
  }

  return containerWidth !== newContainerWidth ||
    scrollbarWidth !== newScrollbarWidth
    ? [newContainerWidth, newScrollbarWidth]
    : state;
};

export const useContainerWidth = () => {
  const [[containerWidth], dispatch] = useReducer(containerWidthReducer, []);
  const observerRef = useRef<ResizeObserver>(undefined);

  const containerRef = useCallback((node: HTMLElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = undefined;

    const updateWidth = () =>
      dispatch([
        node?.clientWidth,
        window.innerWidth - document.documentElement.clientWidth,
      ]);

    updateWidth();

    if (node && typeof ResizeObserver !== "undefined") {
      observerRef.current = new ResizeObserver(updateWidth);
      observerRef.current.observe(node);
    }
  }, []);

  return { containerRef, containerWidth };
};

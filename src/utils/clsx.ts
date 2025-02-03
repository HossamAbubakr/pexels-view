export const clsx = (...classes: (string | boolean | undefined)[]) => {
  return [...classes].filter(Boolean).join(" ");
};

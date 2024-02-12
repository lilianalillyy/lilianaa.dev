import "aos/dist/aos.css";

import AOS, {
  anchorPlacementOptions as AnchorPlacement,
  AosOptions,
  easingOptions as Easing,
} from "aos";
import { kebabCase } from "change-case";
import { useEffect } from "preact/hooks";

export type Animation =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-up-right"
  | "fade-up-left"
  | "fade-down-right"
  | "fade-down-left"
  | "flip-up"
  | "flip-down"
  | "flip-left"
  | "flip-right"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "zoom-in"
  | "zoom-in-up"
  | "zoom-in-down"
  | "zoom-in-left"
  | "zoom-in-right"
  | "zoom-out"
  | "zoom-out-up"
  | "zoom-out-down"
  | "zoom-out-left"
  | "zoom-out-right"
  | ""; // global default

export interface DataAosOptions {
  animation?: Animation;
  offset?: string | number;
  delay?: string | number;
  duration?: string | number;
  easing?: Easing;
  mirror?: string | boolean;
  once?: string | boolean;
  anchorPlacement?: AnchorPlacement;
}

export const aos = (aosOptionsOrAnimation: DataAosOptions|Animation = {}) => {

  if (typeof aosOptionsOrAnimation === "string") {
    return {
      "data-aos": aosOptionsOrAnimation,
    };
  }

  const { animation, ...opts } = aosOptionsOrAnimation;
  const props: Record<string, string> = {};

  props["data-aos"] = animation ?? "";

  const transformedProps = Object.keys(opts).reduce(
    (obj, curr) => {
      obj[`data-aos-${kebabCase(curr)}`] = String(
        opts[curr as keyof typeof opts],
      );

      return obj;
    },
    {} as Record<string, string>,
  );

  return { ...props, ...transformedProps };
};

export const useAos = (aosConfig: AosOptions = {}) => {
  useEffect(() => {
    AOS.init(aosConfig);
  }, [aosConfig]);

  return { aos };
};

import { useCallback } from "react";
import { config, useTrail } from "react-spring";
import { TransitionState } from "./types";

export const usePageTransition = (
  n: number,
  t: TransitionState,
  onComplete: VoidFunction
) => {
  const isEntering = t === "enter";
  const isExiting = t === "exit";

  let x = 1;
  const onRest = useCallback(() => {
    if (x % n === 1) {
      x = 1;
      return onComplete();
    }
    x++;
  }, [n]);

  return useTrail(n, {
    config: config.default,
    from: { x: isEntering ? 0 : 1 },
    x: isExiting ? 0 : 1,
    onRest: onRest
  });
};

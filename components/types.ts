import { DIRECTION } from "./routes";

export type TransitionState = "enter" | "exit" | "none";

export interface PageProps {
  path: string;
  transitionState: TransitionState;
  transitionDirection: DIRECTION;
  onTransitionComplete: VoidFunction;
}

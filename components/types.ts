import { DIRECTION } from "./routes";

export type TransitionState = "enter" | "exit" | "none";

export interface PageProps {
  path: string;
  transitionDirection: DIRECTION;
  transitionState: TransitionState;
  onTransitionComplete: VoidFunction;
}

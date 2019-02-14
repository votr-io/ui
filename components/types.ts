export type TransitionState = "enter" | "exit" | "none";

export interface PageProps {
  path: string;
  transitionState: TransitionState;
  onTransitionComplete: VoidFunction;
}

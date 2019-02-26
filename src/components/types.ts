import { DIRECTION } from "./routes";

export type TransitionState = "enter" | "exit" | "none";

export type PropTypes<T> = T extends React.ComponentType<infer P> ? P : never;

export interface PageProps {
  path: string;
  transitionDirection: DIRECTION;
  transitionState: TransitionState;
  onTransitionComplete: VoidFunction;
}

export interface Candidate {
  id: string;
  name: string;
  description?: string;
}

export interface Election {
  name: string;
  description?: string;
}

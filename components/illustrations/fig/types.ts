export interface Point { x: number; y: number }
/** A figure is a head + limb polylines. All coordinates are in the 640×480 canvas. */
export interface Pose {
  head: Point;
  headRadius?: number;          // default 13
  torso: Point[];               // shoulder → … → hip (2-3 points)
  arms: Point[][];              // per arm: shoulder → elbow → wrist
  legs: Point[][];              // per leg: hip → knee → ankle
}

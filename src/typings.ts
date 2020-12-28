import { SVGAttributes } from 'react';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface Position {
  latitude: number | null;
  longitude: number | null;
}

export type Action<T, V = void> = V extends void
  ? { type: T }
  : { type: T } & V;

export type SVGElementProps = SVGAttributes<SVGElement>;

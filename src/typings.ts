import { SVGAttributes } from 'react';
import { NowRequest, NowResponse } from '@vercel/node';

export type Optional<T> = { [P in keyof T]?: T[P] };

export type PossiblyNull<T> = { [P in keyof T]: T[P] | null };

export type Merge<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;

export type RemoveFrom<L, R> = Pick<L, Exclude<keyof L, R>>;

export type OnlyOne<T> = {
  [K in keyof T]: Required<Pick<T, K>> &
    Partial<Record<Exclude<keyof T, K>, undefined>>;
}[keyof T];

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export type Direction = 'up' | 'right' | 'down' | 'left';

export interface Position {
  latitude: number;
  longitude: number;
}

export interface Address {
  city: string;
  state: string;
  stateName?: string;
  country: string;
  countryName?: string;
}

export type TimeZone = Here.TimeZone;

export type QueryObject = Record<string, unknown>;

export type Action<T, V = void> = V extends void
  ? { type: T }
  : { type: T } & V;

export type SVGElementProps = SVGAttributes<SVGElement>;

export type APIRequestHandler = (
  request: NowRequest,
  response: NowResponse,
) => Promise<NowResponse>;

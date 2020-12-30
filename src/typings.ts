import { SVGAttributes } from 'react';
import { HereService } from 'services/here/types';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface Position {
  latitude: number;
  longitude: number;
}

export interface Address {
  city: string;
  countryCode: string;
  countryName: string;
  district: string;
  houseNumber: string;
  label: string;
  postalCode: string;
  state: string;
  stateCode: string;
  street: string;
}

export type TimeZone = {
  zoneName: string;
  offset: number;
  offsetNameShort: string;
  offsetNameLong: string;
  isOffsetFixed: boolean;
  isInDST: boolean;
};

export type Action<T, V = void> = V extends void
  ? { type: T }
  : { type: T } & V;

export type FinalWindow = Window &
  typeof globalThis & {
    H: { service: HereService };
  };

export type SVGElementProps = SVGAttributes<SVGElement>;

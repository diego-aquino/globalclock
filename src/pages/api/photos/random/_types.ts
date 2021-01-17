import { OnlyOne } from 'typings';

// eslint-disable-next-line no-shadow
export enum SpecialRequestIds {
  PHOTO_OF_THE_DAY = 'PHOTO_OF_THE_DAY',
}

export type CacheControlValue = string;

export type SpecialCacheControls = {
  [key in keyof typeof SpecialRequestIds]: CacheControlValue;
};

export type RequestQuery = Partial<
  OnlyOne<{
    query?: string;
    collections?: string;
  }>
> & {
  featured?: string;
  orientation?: 'landscape' | 'portrait' | 'squarish';
  requestId?: SpecialRequestIds | string;
};

export interface SuccessResponseData {
  type: 'success';
  photo: Unsplash.PhotoWithAttribution;
  errors?: undefined;
}

export interface ErrorResponseData {
  type: 'error';
  photo: null;
  errors: Unsplash.Errors;
}

export type ResponseData = SuccessResponseData | ErrorResponseData;

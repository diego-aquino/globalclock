import {
  RequestQuery,
  SpecialRequestIds,
  SpecialCacheControls,
  CacheControlValue,
} from './_types';

const CACHE_TIME_IN_SECONDS = {
  DEFAULT: 2592000, // 1 month
  PHOTO_OF_THE_DAY: 86400, // 1 day
} as const;

const defaultCacheControlValue: CacheControlValue = `max-age=0, s-maxage=${CACHE_TIME_IN_SECONDS.DEFAULT}, stale-while-revalidate`;
const specialCacheControls: SpecialCacheControls = {
  PHOTO_OF_THE_DAY: `max-age=0, s-maxage=${CACHE_TIME_IN_SECONDS.PHOTO_OF_THE_DAY}, stale-while-revalidate`,
};

const isSpecialRequestId = (
  requestId: RequestQuery['requestId'],
): requestId is SpecialRequestIds =>
  requestId !== undefined && requestId in SpecialRequestIds;

export const getCacheControl = (
  requestId: RequestQuery['requestId'],
): CacheControlValue => {
  if (isSpecialRequestId(requestId)) {
    return specialCacheControls[requestId];
  }

  return defaultCacheControlValue;
};

import axios from 'axios';

import { encodeQueryObject } from 'utils/general';
import { APP_NAME_ON_UNSPLASH } from 'services/unsplash';
import {
  RequestQuery as RandomPhotoRequestQuery,
  ResponseData as RandomPhotoResponseData,
  SpecialRequestIds,
} from 'pages/api/photos/random/_types';
import { QueryObject } from 'typings';

interface RequestBackgroundPhotoOptions {
  query: RandomPhotoRequestQuery['query'];
  requestId?: RandomPhotoRequestQuery['requestId'];
}

export async function requestRandomBackgroundPhoto({
  query,
  requestId,
}: RequestBackgroundPhotoOptions): Promise<RandomPhotoResponseData> {
  const queryObject: RandomPhotoRequestQuery & QueryObject = {
    query,
    orientation: 'landscape',
    requestId,
  };
  const encodedQuery = encodeQueryObject(queryObject);

  const { data } = await axios.get<RandomPhotoResponseData>(
    `/api/photos/random?${encodedQuery}`,
  );

  return data;
}

// eslint-disable-next-line prettier/prettier
export async function requestPhotoOfTheDay(): Promise<
  Unsplash.PhotoWithAttribution | null
> {
  const response = await requestRandomBackgroundPhoto({
    query: 'landscape',
    requestId: SpecialRequestIds.PHOTO_OF_THE_DAY,
  });

  if (response.type === 'error') {
    return null;
  }

  return response.photo;
}

export function withReferralParameters(referralUrl: string): string {
  const encodedReferralParameters = encodeQueryObject({
    utm_source: APP_NAME_ON_UNSPLASH,
    utm_medium: 'referral',
  });

  const urlHasQueryParameters = referralUrl.match(/(?:.)(\?.+)/);

  if (urlHasQueryParameters) {
    return `${referralUrl}&${encodedReferralParameters}`;
  }

  return `${referralUrl}?${encodedReferralParameters}`;
}

type DynamicPhotoAttributes = {
  w?: string;
  h?: string;
  crop?: string;
  auto?: 'format';
  q?: string;
  fit?: string;
};

export function withDynamicAttributes(
  photoUrl: string,
  attributes: DynamicPhotoAttributes,
): string {
  const urlHasQueryParams = photoUrl.includes('?');
  const separator = urlHasQueryParams ? '&' : '?';

  const encodedAttributes = encodeQueryObject(attributes);
  return `${photoUrl}${separator}${encodedAttributes}`;
}

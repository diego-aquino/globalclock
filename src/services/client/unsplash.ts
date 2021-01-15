import axios from 'axios';

import { encodeQueryObject } from 'utils/general';
import { APP_NAME_ON_UNSPLASH } from 'services/unsplash';
import {
  RequestQuery as RandomPhotoRequestQuery,
  ResponseData as RandomPhotoResponseData,
} from 'pages/api/photos/random';
import { QueryObject } from 'typings';

const BASE_COLLECTION_ID = '317099';

interface RequestOptions {
  requestId?: string;
}

export async function requestRandomBackgroundPhoto({
  requestId,
}: RequestOptions): Promise<RandomPhotoResponseData> {
  const query: RandomPhotoRequestQuery = {
    collections: BASE_COLLECTION_ID,
    featured: 'true',
    orientation: 'landscape',
    requestId,
  };
  const encodedQuery = encodeQueryObject(query as QueryObject);

  const { data } = await axios.get<RandomPhotoResponseData>(
    `/api/photos/random?${encodedQuery}`,
  );

  return data;
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

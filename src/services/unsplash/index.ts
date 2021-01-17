import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch as any,
  headers: { 'Accept-Version': 'v1' },
});

export const APP_NAME_ON_UNSPLASH = 'timeincity';

export const unsplashHostDetails = {
  name: 'Unsplash',
  website: 'http://unsplash.com',
};

export default unsplash;

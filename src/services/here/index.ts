import { Position, FinalWindow } from 'typings';
import { HereLocationResult } from './types';

const isClient = typeof window !== 'undefined';

const Here = isClient ? (window as FinalWindow).H : null;

const herePlatform = Here
  ? new Here.service.Platform({
      app_id: process.env.NEXT_PUBLIC_HERE_APP_ID as string,
      apikey: process.env.NEXT_PUBLIC_HERE_API_KEY as string,
    })
  : null;

export function reverseGeocode(
  position: Position,
): Promise<HereLocationResult | null> {
  return new Promise((resolve, reject) => {
    if (!herePlatform) {
      resolve(null);
      return;
    }

    const searchService = herePlatform.getSearchService();

    searchService.reverseGeocode(
      {
        at: `${position.latitude},${position.longitude}`,
      },
      (result) => resolve(result),
      (error) => reject(error),
    );
  });
}

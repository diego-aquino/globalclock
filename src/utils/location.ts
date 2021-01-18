import { Position } from 'typings';

const isClient = typeof window !== 'undefined';

interface SuccessUserPositionResponse {
  status: 'SUCCESS';
  position: Position;
}

export interface ErrorUserPositionResponse {
  status: 'NOT_SUPPORTED' | 'FAILED';
  position: null;
}

type UserPositionResponse =
  | SuccessUserPositionResponse
  | ErrorUserPositionResponse;

export async function requestUserPosition(): Promise<UserPositionResponse> {
  if (!isClient || !navigator.geolocation)
    return { position: null, status: 'NOT_SUPPORTED' };

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        resolve({
          position: { latitude, longitude },
          status: 'SUCCESS',
        });
      },
      () => resolve({ position: null, status: 'FAILED' }),
    );
  });
}

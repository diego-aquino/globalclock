import { Position } from 'typings';

const isClient = typeof window !== 'undefined';

type UserPositionResponse = {
  position: Position;
  status: 'SUCCESS' | 'NOT_SUPPORTED' | 'FAILED';
};

export async function requestUserPosition(): Promise<UserPositionResponse> {
  if (!isClient || !navigator.geolocation)
    return {
      position: { latitude: null, longitude: null },
      status: 'NOT_SUPPORTED',
    };

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        resolve({
          position: { latitude, longitude },
          status: 'SUCCESS',
        });
      },
      () =>
        resolve({
          position: { latitude: null, longitude: null },
          status: 'FAILED',
        }),
    );
  });
}

import { Position } from 'typings';

const isClient = typeof window !== 'undefined';

type UserPositionResponse =
  | {
      status: 'SUCCESS';
      position: Position;
    }
  | {
      status: 'NOT_SUPPORTED' | 'FAILED';
      position: null;
    };

export async function requestUserPosition(): Promise<UserPositionResponse> {
  if (!isClient || !navigator.geolocation)
    return Promise.resolve({
      position: null,
      status: 'NOT_SUPPORTED',
    });

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
          position: null,
          status: 'FAILED',
        }),
    );
  });
}

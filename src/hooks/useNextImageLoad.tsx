import { useCallback, useMemo, useState } from 'react';

/* eslint-disable */
enum ImageLoadingStatus {
  NOT_LOADING,
  IMAGE_COMPONENT_LOADED,
  IMAGE_LOADED,
}
/* eslint-enable */

type LoadHandler = () => void;

function useNextImageLoad(): [boolean, LoadHandler] {
  const [loadingStatus, setLoadingStatus] = useState<ImageLoadingStatus>(
    ImageLoadingStatus.NOT_LOADING,
  );

  const imageIsFullyLoaded = useMemo(
    () => loadingStatus === ImageLoadingStatus.IMAGE_LOADED,
    [loadingStatus],
  );

  const handleImageLoad = useCallback(() => {
    setLoadingStatus((previousStatus) => {
      switch (previousStatus) {
        case ImageLoadingStatus.NOT_LOADING:
          return ImageLoadingStatus.IMAGE_COMPONENT_LOADED;
        case ImageLoadingStatus.IMAGE_COMPONENT_LOADED:
          return ImageLoadingStatus.IMAGE_LOADED;
        default:
          return previousStatus;
      }
    });
  }, []);

  return [imageIsFullyLoaded, handleImageLoad];
}

export default useNextImageLoad;

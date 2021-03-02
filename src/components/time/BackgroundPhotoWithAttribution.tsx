import { FC, useCallback, useEffect, useState } from 'react';

import { RemoveFrom } from 'typings';
import { BackgroundImage, ExternalLink } from 'components/common';
import { Props as BackgroundImageProps } from 'components/common/BackgroundImage';
import {
  withDynamicAttributes,
  withReferralParameters,
} from 'services/client/unsplash';
import {
  Attribution,
  AttributionSide,
} from 'styles/components/time/BackgroundPhotoWithAttribution';
import { useWindowSize } from 'hooks';

const MIN_IMAGE_WIDTH = 1000;

type Props = RemoveFrom<BackgroundImageProps, 'src'> & {
  photo: Unsplash.PhotoWithAttribution;
  host?: {
    name: string;
    website: string;
  };
  attributionStart?: string;
  attributionSide?: AttributionSide;
};

const BackgroundPhotoWithAttribution: FC<Props> = ({
  photo,
  host,
  attributionStart = 'Photo by',
  attributionSide = 'right',
  ...rest
}) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const windowSize = useWindowSize();

  const LinkToCreatorProfile = useCallback(
    () => (
      <ExternalLink
        styleMode="secondaryBeige"
        href={withReferralParameters(photo.creator.profileUrl)}
      >
        {photo.creator.name}
      </ExternalLink>
    ),
    [photo.creator],
  );

  const LinkToHostWebsite = useCallback(
    () =>
      host ? (
        <ExternalLink
          styleMode="secondaryBeige"
          href={withReferralParameters(host.website)}
        >
          {host.name}
        </ExternalLink>
      ) : null,
    [host],
  );

  useEffect(() => {
    setPhotoUrl((currentPhotoUrl) => {
      const rawUrlHasChanged = !currentPhotoUrl?.includes(photo.urls.raw);
      const shouldUpdatePhotoUrl =
        windowSize.innerWidth > 0 &&
        currentPhotoUrl === null &&
        rawUrlHasChanged;

      if (!shouldUpdatePhotoUrl) {
        return currentPhotoUrl;
      }

      const newPhotoUrl = withDynamicAttributes(photo.urls.raw, {
        w: Math.max(windowSize.innerWidth, MIN_IMAGE_WIDTH).toString(),
        auto: 'format',
        fit: 'crop',
        q: '60',
      });

      return newPhotoUrl;
    });
  }, [photo.urls.raw, windowSize.innerWidth]);

  return photoUrl ? (
    <>
      <BackgroundImage
        src={photoUrl}
        blurHash={photo.urls.blurHash}
        {...rest}
      />
      <Attribution side={attributionSide}>
        {attributionStart} <LinkToCreatorProfile />
        {host && (
          <>
            &nbsp;on&nbsp;
            <LinkToHostWebsite />
          </>
        )}
      </Attribution>
    </>
  ) : null;
};

export default BackgroundPhotoWithAttribution;

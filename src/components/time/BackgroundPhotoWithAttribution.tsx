import { FC, useCallback } from 'react';

import { RemoveFrom } from 'typings';
import { BackgroundImage, ExternalLink } from 'components/common';
import { Props as BackgroundImageProps } from 'components/common/BackgroundImage';
import { withReferralParameters } from 'services/client/unsplash';
import { Attribution } from 'styles/components/time/BackgroundPhotoWithAttribution';

type Props = RemoveFrom<BackgroundImageProps, 'src'> & {
  photo: Unsplash.PhotoWithAttribution;
  host?: {
    name: string;
    website: string;
  };
  attributionStart?: string;
};

const BackgroundPhotoWithAttribution: FC<Props> = ({
  photo,
  host,
  attributionStart = 'Photo by',
  ...rest
}) => {
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

  return (
    <>
      <BackgroundImage src={photo.urls.full} {...rest} />
      <Attribution>
        {attributionStart} <LinkToCreatorProfile />
        {host && (
          <>
            &nbsp;on&nbsp;
            <LinkToHostWebsite />
          </>
        )}
      </Attribution>
    </>
  );
};

export default BackgroundPhotoWithAttribution;

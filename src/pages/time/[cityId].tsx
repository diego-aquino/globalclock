import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { Address } from 'typings';
import {
  extractCityLabel,
  parseGeolocationResponseToLocation,
} from 'utils/location';
import { geocode } from 'services/here';

interface PageProps {
  address?: Address;
  localISOTime?: string;
}

const TimePage: FC<PageProps> = (props) => <div />;

interface PageParams extends ParsedUrlQuery {
  cityId: string;
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
  params,
}) => {
  async function generateStaticPropsFromCityId(
    cityId: string | undefined,
  ): Promise<PageProps> {
    if (!cityId) return {};

    const cityLabel = extractCityLabel(cityId);
    if (!cityLabel) return {};

    const geolocationResponse = await geocode(cityLabel);

    const location = parseGeolocationResponseToLocation(geolocationResponse);
    const { address, localDateTime } = location;

    return {
      address,
      localISOTime: localDateTime.toISO(),
    };
  }

  return {
    props: await generateStaticPropsFromCityId(params?.cityId),
  };
};

export default TimePage;

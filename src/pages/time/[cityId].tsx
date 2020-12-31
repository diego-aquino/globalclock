import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { Address, TimeZone } from 'typings';
import {
  extractCityLabel,
  parseGeolocationResponseToLocation,
} from 'utils/location';
import { geocode } from 'services/here';

interface Props {
  address?: Address;
  localISOTime?: string;
  timeZone?: TimeZone;
}

interface Params extends ParsedUrlQuery {
  cityId: string;
}

const TimePage: FC<Props> = (props) => <div />;

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  async function generateStaticPropsFromCityId(
    cityId: string | undefined,
  ): Promise<Props> {
    if (!cityId) return {};

    const cityLabel = extractCityLabel(cityId);
    if (!cityLabel) return {};

    const geolocationResponse = await geocode(cityLabel);
    if (!geolocationResponse) return {};

    const location = parseGeolocationResponseToLocation(geolocationResponse);
    const { address, localDateTime, timeZone } = location;

    return {
      address,
      localISOTime: localDateTime.toISO(),
      timeZone,
    };
  }

  return {
    props: await generateStaticPropsFromCityId(params?.cityId),
  };
};

export default TimePage;

declare namespace Here {
  export type AdditionalData = Array<{
    key: 'StateName' | 'CountryName';
    value: string;
  }>;

  export interface Address {
    city: string;
    state: string;
    country: string;
    additionalData: AdditionalData;
  }

  export interface TimeZone {
    offset: number;
    rawOffset: number;
    nameShort: string;
    nameLong: string;
    nameDstShort: string;
    nameDstLong: string;
    inDaylightTime: boolean;
    dstSavings: number;
    id: string;
  }

  export interface AdminInfo {
    timeZone: TimeZone;
  }

  export interface Location {
    locationId: string;
    address: Address;
    adminInfo: AdminInfo;
  }

  export interface ResultItem {
    location: Location;
  }

  export interface ViewItem {
    result: ResultItem[];
  }

  export interface Response {
    view: ViewItem[];
  }

  export interface GeocodeResponse {
    response: Response;
  }
}

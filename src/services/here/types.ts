interface LocationAdditionalDataItem {
  key: 'CountryName' | 'StateName';
  value: string;
}

interface LocationAddress {
  Label: string;
  Country: string;
  State: string;
  City: string;
  AdditionalData: LocationAdditionalDataItem[];
}

interface LocationResult {
  DisplayPosition: {
    Latitude: number;
    Longitude: number;
  };
  Address: LocationAddress;
  AdminInfo: {
    TimeZoneOffset: string;
    LocalTime: string;
  };
}

export interface GeolocationResponse {
  Response: {
    MetaInfo: {
      Timestamp: string;
    };
    View: [
      {
        Result: Array<{
          Location: LocationResult;
        }>;
      },
    ];
  };
}

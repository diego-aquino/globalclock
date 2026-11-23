declare namespace Here {
  export interface Address {
    city?: string;
    stateCode?: string;
    state?: string;
    countryCode: string;
    countryName: string;
  }

  export interface TimeZone {
    name: string;
  }

  export interface AutocompleteItem {
    id: string;
    address: Address;
  }

  export interface Place extends AutocompleteItem {
    timeZone: TimeZone;
  }

  export interface ItemList<Item> {
    items: Item[];
  }
}

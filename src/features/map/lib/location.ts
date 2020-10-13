import { gmapApi as GoogleMaps } from 'vue2-google-maps';

function getPosition(options?: PositionOptions) {
  return new Promise((resolve: PositionCallback, reject: PositionErrorCallback) => {
    if (!window.navigator.geolocation) {
      Promise.reject(new Error('Unsupported feature [navigation.geolocation]'));
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

function geoCode(location: Coords): Promise<GeocodeResults[]> {
  return new Promise((resolve, reject) => {
    const googleMaps = GoogleMaps();
    const geocoder = new googleMaps.maps.Geocoder();

    geocoder.geocode({ location }, resolve, reject);
  });
}

export type Coords = {
  lat: number;
  lng: number;
};

export type GeocodeResults = {
  // address_components: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
  // geometry: {location: _.I, location_type: "GEOMETRIC_CENTER", viewport: _.vf}
  formatted_address: string;
  place_id: string;
  plus_code: { compound_code: string; global_code: string };
  types: string[];
};

export type ManuallyAddressResponse = {
  // address_components: Array(7) [ {…}, {…}, {…}, … ]
  // html_attributions: Array []
  // opening_hours: Object { open_now: Getter & Setter, periods: (7) […], weekday_text: (7) […], … }
  // photos: Array(10) [ {…}, {…}, {…}, … ]
  // reviews: Array(5) [ {…}, {…}, {…}, … ]

  adr_address: string; // html
  business_status: string;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: {
    location: { lat: () => number; lng: () => number };
    // viewport: {}
  };
  icon: string;
  international_phone_number: string;
  name: string;
  place_id: string;
  plus_code: { compound_code: string; global_code: string };
  price_level: number;
  rating: number;
  reference: string;
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  utc_offset_minutes: number;
  vicinity: string;
  website: string;
};

export { getPosition, geoCode };

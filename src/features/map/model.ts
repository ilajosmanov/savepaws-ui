import {
  createEffect,
  sample,
  createEvent,
  createStore,
  restore,
} from 'effector-logger';
import {
  getPosition,
  geoCode,
  Coords,
  ManuallyAddressResponse,
} from './lib/location';

const fxGetCurrentLocation = createEffect<void, Coords, PositionError>({
  async handler() {
    const { coords } = await getPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });

    return {
      lat: coords.latitude,
      lng: coords.longitude,
    };
  },
});

const fxRunGeoCode = createEffect<Coords, string>({
  async handler(coords) {
    const [geo] = await geoCode(coords);
    return geo.formatted_address;
  },
});

const addressUpdated = createEvent<ManuallyAddressResponse>();
const resetAddress = createEvent();
const zoomUpdated = createEvent<number>();

const $zoom = restore(zoomUpdated, 10);

const $location = createStore({
  lat: 50.4518644,
  lng: 30.5425203,
});

const $address = createStore('');
const $isCoordsEntered = $address.map((state) => !!state);

$location
  .on(fxGetCurrentLocation.doneData, (_, coords) => coords)
  .on(addressUpdated, (_, { geometry }) => ({
    lat: geometry.location.lat(),
    lng: geometry.location.lng(),
  }));

$address
  .on(fxRunGeoCode.doneData, (_, address) => address)
  .on(addressUpdated, (_, address) => address.formatted_address)
  .reset(resetAddress);

sample({
  source: fxGetCurrentLocation.doneData,
  target: fxRunGeoCode,
});

export {
  $location,
  $address,
  $isCoordsEntered,
  $zoom,
  zoomUpdated,
  addressUpdated,
  resetAddress,
  fxGetCurrentLocation,
};

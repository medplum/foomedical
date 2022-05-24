import { useCallback, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import { formatAddress } from '@medplum/core';
import { Address } from '@medplum/fhirtypes';

// google maps API key: choose Maps JavaScript API and Geocoding API
const API_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 40.73061,
  lng: -73.935242,
};

interface AddressMapProps {
  address: Address;
}

const AddressMap = ({ address }: AddressMapProps): JSX.Element | null => {
  const [center, setCenter] = useState(defaultCenter);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const mapRef = useRef<undefined | google.maps.Map>(undefined);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = undefined;
  }, []);

  Geocode.setApiKey(API_KEY);

  const addressString = formatAddress(address);

  Geocode.fromAddress(addressString).then(
    (response) => {
      const location = response.results[0].geometry.location;
      setCenter(location);
    },
    (error) => {
      console.error(error);
    }
  );

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount} />
  ) : (
    <>loading...</>
  );
};

export default AddressMap;

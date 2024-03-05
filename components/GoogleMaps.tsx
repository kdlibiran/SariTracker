"use client";
import React from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function GoogleMaps({
  latitude,
  setLatitude,
  longitude,
  setLongitude,
}: {
  latitude: number | null;
  setLatitude: (latitude: number | null) => void;
  longitude: number | null;
  setLongitude: (longitude: number | null) => void;
}) {
  const { isLoaded } = useJsApiLoader({
    id: "pragmatic-ratio-415914",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const onLoad = React.useCallback(function callback(
    map: google.maps.Map | null,
  ) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: latitude || 0,
      lng: longitude || 0,
    });
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(
    map: google.maps.Map | null,
  ) {
    setMap(null);
  }, []);
  return isLoaded ? (
    <div className="z-0 my-4 ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: latitude || 0, lng: longitude || 0 }}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {latitude && longitude && (
          <MarkerF position={{ lat: latitude, lng: longitude }} />
        )}
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

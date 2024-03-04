"use client";
import React from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/navigation";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 14.6539,
  lng: 121.0685,
};

export default function StoreMap({ data }: { data: any[] | null }) {
  const router = useRouter();
  const { isLoaded } = useJsApiLoader({
    id: "pragmatic-ratio-415914",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const onLoad = React.useCallback(function callback(
    map: google.maps.Map | null,
  ) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map?.fitBounds(bounds);
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
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {data?.map((store) => (
          <MarkerF
            key={store.id}
            onClick={() => {
              router.push(`/store/${store.id}`);
            }}
            position={{ lat: store.latitude, lng: store.longitude }}
          />
        ))}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

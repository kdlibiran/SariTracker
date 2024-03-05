"use client";
import React from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { store } from "@/types/supabase";
const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 14.6539,
  lng: 121.0685,
};

export default function StoreMap({
  data,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
}: {
  data: store[];
  latitude: number | null;
  setLatitude: (latitude: number | null) => void;
  longitude: number | null;
  setLongitude: (longitude: number | null) => void;
}) {
  const router = useRouter();
  const { isLoaded } = useJsApiLoader({
    id: "pragmatic-ratio-415914",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const onLoad = React.useCallback(function callback(
    map: google.maps.Map | null,
  ) {
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
        center={{
          lat: latitude || center.lat,
          lng: longitude || center.lng,
        }}
        zoom={12}
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
      </GoogleMap>
    </div>
  ) : (
    <div>
      <Skeleton className="h-[400px] w-[400px]" />
    </div>
  );
}

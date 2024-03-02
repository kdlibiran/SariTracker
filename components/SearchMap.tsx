"use client";
import GoogleMaps from "@/components/GoogleMaps";
import PlaceSearch from "@/components/PlaceSearch";
import { useState } from "react";
export default function SearchMap() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  return (
    <div>
      <PlaceSearch
        latitude={latitude}
        setLatitude={setLatitude}
        longitude={longitude}
        setLongitude={setLongitude}
      />
      <GoogleMaps
        latitude={latitude}
        setLatitude={setLatitude}
        longitude={longitude}
        setLongitude={setLongitude}
      />
    </div>
  );
}

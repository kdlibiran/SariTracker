"use client";
import PlaceSearch from "@/components/PlaceSearch";
import { useState } from "react";
import StoreMap from "./StoreMap";
import { store } from "@/types/supabase";

export default function SearchStore({ data }: { data: store[] }) {
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
      <StoreMap
        data={data}
        latitude={latitude}
        setLatitude={setLatitude}
        longitude={longitude}
        setLongitude={setLongitude}
      />
    </div>
  );
}

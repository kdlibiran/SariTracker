"use client";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useEffect, useState } from "react";

export default function PlaceSearch({
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
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "ph" },
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setLatitude(lat);
        setLongitude(lng);
      });
    };

  useEffect(() => {
    if (latitude && longitude) {
      console.log(
        `Retrieved Latitude: ${latitude} and Longitude: ${longitude}`,
      );
    }
  });

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="cursor-pointer hover:bg-gray-50"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className="flex flex-col">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        id="location"
        name="location"
        className="rounded-md border bg-inherit px-4 py-2"
        placeholder="Enter Store Location"
      />
      <input type="hidden" name="latitude" value={latitude ?? 0} />
      <input type="hidden" name="longitude" value={longitude ?? 0} />

      {/* We can use the "status" to decide whether we should display the dropdown or not */}

      {status === "OK" && (
        <ul className="rounded-md border bg-inherit px-4 py-2">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
}

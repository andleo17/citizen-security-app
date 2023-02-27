import {
  Children,
  cloneElement,
  isValidElement,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

import { Wrapper } from "@googlemaps/react-wrapper";

interface MapProps extends google.maps.MapOptions {
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function Map({
  children,
  className = "h-full",
  onClick,
  ...options
}: PropsWithChildren<MapProps>) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(new window.google.maps.Map(mapRef.current, options));
    }
  }, [mapRef, map]);

  useEffect(() => {
    if (map) map.setOptions(options);
  }, [options]);

  return (
    <>
      <div
        ref={mapRef}
        className={`text-gray-900 ${className}`}
        onClick={onClick}
      />
      {Children.map(children, (el) => {
        if (isValidElement<{ map: google.maps.Map }>(el)) {
          return cloneElement(el, { map });
        }
        return el;
      })}
    </>
  );
}

export function MapWrapper({ children }: PropsWithChildren) {
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["drawing", "marker"]}
    >
      {children}
    </Wrapper>
  );
}

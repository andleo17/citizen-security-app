import { useEffect, useState } from "react";

export enum OverlayType {
  CIRCLE = "circle",
  MARKER = "marker",
  POLYGON = "polygon",
  POLYLINE = "polyline",
  RECTANGLE = "rectangle",
}

interface DrawManagerProps extends google.maps.drawing.DrawingManagerOptions {
  eventHandler?: Function;
}

function DrawManager({
  eventHandler,
  ...options
}: DrawManagerProps): JSX.Element {
  const [drawManager, setDrawManager] =
    useState<google.maps.drawing.DrawingManager>();

  useEffect(() => {
    if (!drawManager) {
      setDrawManager(new google.maps.drawing.DrawingManager());
    }

    return () => {
      if (drawManager) drawManager.setMap(null);
    };
  });

  useEffect(() => {
    let listener: google.maps.MapsEventListener;
    if (drawManager) {
      drawManager.setOptions(options);
      if (eventHandler) {
        listener = drawManager.addListener("overlaycomplete", eventHandler);
      }
    }

    return () => {
      if (eventHandler && listener) listener.remove();
    };
  }, [drawManager, options]);

  return null;
}

export default DrawManager;

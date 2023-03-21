import type { Point } from "vendor";
import { useEffect, useState } from "react";
import { pointToJson } from "@/Utils/Geometry";

interface HeatMapLayerProps
  extends google.maps.visualization.HeatmapLayerOptions {
  rawData: Point[];
}

function HeatMapLayer({ rawData, ...options }: HeatMapLayerProps): JSX.Element {
  const [heatMap, setHeatMap] =
    useState<google.maps.visualization.HeatmapLayer>();

  useEffect(() => {
    const newHeatMap = new google.maps.visualization.HeatmapLayer(options);

    setHeatMap(newHeatMap);

    return () => newHeatMap?.setMap(null);
  }, []);

  useEffect(() => {
    heatMap?.setOptions({
      ...options,
      data: rawData.map((d) => new google.maps.LatLng(pointToJson(d))),
    });
  }, [options, rawData]);

  return null;
}

export default HeatMapLayer;

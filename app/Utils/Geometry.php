<?php

namespace App\Utils;

use MatanYadaev\EloquentSpatial\Objects\LineString;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Objects\Polygon;

class Geometry
{
  public static function toPoint(string $json): Point
  {
    $decoded = json_decode($json);
    return new Point($decoded->lat, $decoded->lng);
  }

  public static function toLineString(array $json): LineString
  {
    return new LineString(array_map(
      fn ($p) => new Point($p['lat'], $p['lng']),
      $json
    ));
  }

  public static function toPolygon(array $json): Polygon
  {
    return new Polygon([new LineString(array_map(
      fn ($p) => new Point($p['lat'], $p['lng']),
      $json
    ))]);
  }
}

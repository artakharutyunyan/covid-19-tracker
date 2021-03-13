import React from "react";
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
import useScreenSize from "use-screen-size";
import "./Map.css";
import { showDataOnMap } from "../../util";

function ChangeMap({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({ countries, casesType, center, zoom }) {
  const size = useScreenSize();
  return (
    <div style={{ height: size.width >= 900 ? 731 : 400 }} className="map">
      <LeafletMap center={center} zoom={zoom}>
        <ChangeMap center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;

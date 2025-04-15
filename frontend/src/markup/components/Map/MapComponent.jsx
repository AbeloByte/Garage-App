// MapComponent.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapComponent() {
  const position = [9.03, 38.74]; // Example: Addis Ababa

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>🚩 You are here!</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;

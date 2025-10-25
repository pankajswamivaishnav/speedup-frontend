import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getUserContinues } from 'helper/function';

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

// Define a TypeScript type for the location object
type Location = {
  latitude: number;
  longitude: number;
};

const LiveLocationMap: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Add type for the callback parameter
    const watchId = getUserContinues((location: Location) => {
      setPosition([location.latitude, location.longitude]);
      if (mapRef.current) {
        mapRef.current.setView([location.latitude, location.longitude], 15);
      }
    });

    return () => {
      if (watchId && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {position ? (
        <MapContainer center={position} zoom={15} ref={mapRef} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          <Marker position={position} icon={userIcon}>
            <Popup>You are here 📍</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '50px' }}>Getting your location...</p>
      )}
    </div>
  );
};

export default LiveLocationMap;

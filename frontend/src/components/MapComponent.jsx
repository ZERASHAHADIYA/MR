'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = ({ userLocation, hospitals }) => {
  if (!userLocation) return <div className="w-full h-full flex items-center justify-center bg-gray-100">Loading map...</div>;

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* User location marker */}
      <Circle
        center={[userLocation.lat, userLocation.lng]}
        radius={100}
        pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.3 }}
      />
      
      {/* Hospital markers */}
      {hospitals.map((hospital) => {
        const lat = hospital.location?.coordinates?.[1] || hospital.lat || 0;
        const lng = hospital.location?.coordinates?.[0] || hospital.lng || 0;
        return (
          <Marker key={hospital._id || hospital.id} position={[lat, lng]}>
            <Popup>
              <div className="text-center">
                <strong>{hospital.name}</strong>
                <br />
                <span className="text-sm text-gray-600">{hospital.address}</span>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;

"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Property } from "@/data/properties";
import { formatCurrency, getLeadScoreLabel } from "@/lib/utils";

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId: string | null;
  onSelectProperty: (id: string) => void;
  isMover?: boolean;
}

function getMarkerIcon(leadScore: number, isSelected: boolean) {
  const color = isSelected
    ? "#1E40AF"
    : leadScore >= 8
    ? "#DC2626"
    : leadScore >= 5
    ? "#D97706"
    : "#64748B";

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: ${isSelected ? "16px" : "12px"};
      height: ${isSelected ? "16px" : "12px"};
      background: ${color};
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ${isSelected ? "z-index: 1000;" : ""}
    "></div>`,
    iconSize: [isSelected ? 16 : 12, isSelected ? 16 : 12],
    iconAnchor: [isSelected ? 8 : 6, isSelected ? 8 : 6],
  });
}

export default function PropertyMap({
  properties,
  selectedPropertyId,
  onSelectProperty,
  isMover = false,
}: PropertyMapProps) {
  return (
    <MapContainer
      center={[39.0, -84.6]}
      zoom={11}
      className="h-full w-full rounded-lg"
      style={{ minHeight: "500px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={getMarkerIcon(p.leadScore, selectedPropertyId === p.id)}
          eventHandlers={{
            click: () => onSelectProperty(p.id),
          }}
        >
          <Popup>
            <div className="text-xs min-w-[180px]">
              <p className="font-semibold text-slate-900">{p.address}</p>
              <p className="text-slate-500">{p.city}, {p.state} {p.zip}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="font-medium text-blue-800">{formatCurrency(p.homeValue)}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                  p.leadScore >= 8 ? "bg-red-100 text-red-700" :
                  p.leadScore >= 5 ? "bg-amber-100 text-amber-700" :
                  "bg-slate-100 text-slate-600"
                }`}>
                  {p.leadScore} {getLeadScoreLabel(p.leadScore)}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {p.signals.slice(0, 3).map((s) => (
                  <span key={s} className="bg-blue-50 text-blue-700 px-1 py-0.5 rounded text-xs">{s}</span>
                ))}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

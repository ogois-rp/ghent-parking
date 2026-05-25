import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

interface ParkingMapProps {
    lat: number
    lon: number
    name: string
}

export function ParkingMap({ lat, lon, name }: ParkingMapProps) {
    return (
        <div className="h-64 w-full">
            <MapContainer
                center={[lat, lon]}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <Marker position={[lat, lon]}>
                    <Popup>{name}</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
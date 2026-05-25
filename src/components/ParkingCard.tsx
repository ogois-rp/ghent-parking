import { useNavigate } from 'react-router-dom'
import { parseLocationAndDimension } from '../utils/parseLocation'
import type { ParkingRecord } from '../types/parking'

export function ParkingCard({ parking }: { parking: ParkingRecord }) {
  const navigate = useNavigate()

  return (
    <div 
      className="park-card p-5 cursor-pointer border rounded-lg shadow hover:bg-gray-100 transition h-full"
      onClick={() => navigate(`/parking/${encodeURIComponent(parking.name)}`)}
    >
      <h2>{parking.name}</h2>
      <p>Status: {parking.isopennow ? 'Open Now' : 'Closed'}</p>
      <p>Available Spaces: {parking.availablecapacity}</p>
      <p>Address: {parseLocationAndDimension(parking.locationanddimension)?.roadName || 'Address not available'}</p>
    </div>
  )
}
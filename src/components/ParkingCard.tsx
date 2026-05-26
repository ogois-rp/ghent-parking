import { useNavigate } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'
import { parseLocationAndDimension } from '../utils/parseLocation'
import type { ParkingRecord } from '../types/parking'

interface ParkingCardProps {
  parking: ParkingRecord
  isFavourite?: boolean
  onToggleFavourite?: (name: string) => void
}

export function ParkingCard({ parking, isFavourite = false, onToggleFavourite }: ParkingCardProps) {
  const navigate = useNavigate()
  const location = parseLocationAndDimension(parking.locationanddimension)
  const occupancyPercent = Math.round((1 - parking.availablecapacity / parking.totalcapacity) * 100)

  const barColor = occupancyPercent > 85
    ? 'bg-red-500'
    : occupancyPercent > 60
    ? 'bg-amber-500'
    : 'bg-green-600'

  return (
    <div
      className={`flex flex-col gap-3 p-5 rounded-lg border bg-white hover:border-gray-400 transition cursor-pointer h-full ${isFavourite ? 'border-blue-400' : 'border-gray-200'}`}
      onClick={() => navigate(`/parking/${encodeURIComponent(parking.name)}`)}
    >

      <div className="flex items-start justify-between gap-2">
        <h2 className="text-sm font-medium text-gray-900 leading-snug">{parking.name}</h2>
          <button
            className={`flex-shrink-0 ${isFavourite ? 'text-blue-600' : 'text-gray-300 hover:text-blue-400'} transition`}
            onClick={e => { e.stopPropagation(); onToggleFavourite(parking.name) }}
            aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          >
            <Star size={16} fill={isFavourite ? 'currentColor' : 'none'} />
          </button>
      </div>

      <div>
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${parking.isopennow ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${parking.isopennow ? 'bg-green-600' : 'bg-red-500'}`} />
          {parking.isopennow ? 'Open' : 'Closed'}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Available</span>
          <span className="text-xs font-medium text-gray-900">{parking.availablecapacity} / {parking.totalcapacity}</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full">
          <div
            className={`h-1 rounded-full ${barColor}`}
            style={{ width: `${Math.max(0, 100 - occupancyPercent)}%` }}
          />
        </div>
      </div>

      <div className="flex items-start gap-1 text-xs text-gray-400 mt-auto">
        <MapPin size={12} className="flex-shrink-0 mt-0.5" />
        <span>{location?.roadName || 'Address not available'}</span>
      </div>

    </div>
  )
}
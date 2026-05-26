import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Tag, MapPin, User, Star, ExternalLink } from 'lucide-react'
import { parseLocationAndDimension } from '../utils/parseLocation'
import { useFavourites } from '../hooks/useFavourites'
import { ParkingMap } from '../components/ParkingMap'
import { useParkingDetail } from '../hooks/useParkingDetail'

export function ParkingDetail() {
    const { name } = useParams<{ name: string }>()
    const navigate = useNavigate()
    const { parking, loading, error } = useParkingDetail(name!)
    const { toggleFavourite, isFavourite } = useFavourites()

    if (loading) return <div className="text-sm text-gray-500 mt-8 text-center">Loading...</div>
    if (error) return <div className="text-sm text-red-500 mt-8 text-center">Error: {error}</div>
    if (!parking) return <div className="text-sm text-gray-500 mt-8 text-center">Parking not found</div>

    const location = parseLocationAndDimension(parking.locationanddimension)
    const occupancyPercent = Math.round((1 - parking.availablecapacity / parking.totalcapacity) * 100)
    const barColor = occupancyPercent > 85 ? 'bg-red-500' : occupancyPercent > 60 ? 'bg-amber-500' : 'bg-green-600'

    return (
        <div className="max-w-2xl">

            <button
                onClick={() => navigate('/parking')}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition mb-6"
            >
                <ArrowLeft size={14} />
                Back to parkings
            </button>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-medium text-gray-900 mb-3">{parking.name}</h1>
                            <div className="flex flex-wrap gap-2">
                                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${parking.isopennow ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${parking.isopennow ? 'bg-green-600' : 'bg-red-500'}`} />
                                    {parking.isopennow ? 'Open' : 'Closed'}
                                    {parking.openingtimesdescription ? ` · ${parking.openingtimesdescription}` : ''}
                                </span>
                                {parking.freeparking === 1 && (
                                    <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-800">
                                        Free parking
                                    </span>
                                )}
                                {parking.categorie && (
                                    <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                        {parking.categorie}
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            className="text-gray-300 hover:text-blue-600 transition flex-shrink-0"
                            aria-label={isFavourite(parking.name) ? 'Remove from favourites' : 'Add to favourites'}
                            onClick={() => toggleFavourite(parking.name)}
                        >
                            <Star size={20} strokeWidth={2} fill={isFavourite(parking.name) ? 'currentColor' : 'none'} />
                        </button>
                    </div>
                </div>

                <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Available spaces</span>
                        <span className="text-sm font-medium text-gray-900">{parking.availablecapacity} / {parking.totalcapacity}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full mb-1.5">
                        <div
                            className={`h-2 rounded-full transition-all ${barColor}`}
                            style={{ width: `${Math.max(0, 100 - occupancyPercent)}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-400">{occupancyPercent}% occupied</p>
                </div>

                {parking.description && (
                    <div className="p-6 border-b border-gray-100">
                        <p className="text-xs text-gray-400 mb-1.5">About</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{parking.description}</p>
                    </div>
                )}

                <div className="grid grid-cols-2 divide-x divide-y divide-gray-100">
                    <div className="p-4 flex items-start gap-3">
                        <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-400 mb-0.5">Address</p>
                            <p className="text-sm text-gray-900">{location?.roadName ?? 'Not available'}</p>
                        </div>
                    </div>
                    <div className="p-4 flex items-start gap-3">
                        <Tag size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-400 mb-0.5">Type</p>
                            <p className="text-sm text-gray-900">{(parking.type === 'carPark' ? 'Car Park' : parking.type === 'offStreetParkingGround' ? 'Off Street Parking Ground' : 'Not Available')}</p>
                        </div>
                    </div>
                    <div className="p-4 flex items-start gap-3">
                        <Clock size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-400 mb-0.5">Opening hours</p>
                            <p className="text-sm text-gray-900">{parking.openingtimesdescription}</p>
                        </div>
                    </div>
                    <div className="p-4 flex items-start gap-3">
                        <User size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-400 mb-0.5">Operator</p>
                            <p className="text-sm text-gray-900">{parking.operatorinformation}</p>
                        </div>
                    </div>
                    {parking.urllinkaddress && (
                        <div className="col-span-2 p-4 flex items-start gap-3 border-t border-gray-100">
                            <ExternalLink size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">More info</p>
                                <a
                                    href={parking.urllinkaddress}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-700 hover:text-blue-900 transition flex items-center gap-1"
                                >
                                    stad.gent — {parking.name}
                                    <ExternalLink size={11} />
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {parking.location && (
                    <div className="h-64 border-t border-gray-100">
                        <ParkingMap
                            lat={parking.location.lat}
                            lon={parking.location.lon}
                            name={parking.name}
                        />
                    </div>
                )}

            </div>
        </div>
    )
}
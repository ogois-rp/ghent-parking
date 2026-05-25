import { useParams } from 'react-router-dom'
import { parseLocationAndDimension } from '../utils/parseLocation'
import { ParkingMap } from '../components/ParkingMap'
import { useParkingDetail } from '../hooks/useParkingDetail'

export function ParkingDetail() {
    const { name } = useParams<{ name: string }>()
    const  { parking, loading, error } = useParkingDetail(name!)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!parking) return <div>Parking not found</div>

    const location = parseLocationAndDimension(parking.locationanddimension)

    return (
        <>
            <h1>{parking.name}</h1>
            <p>Status: {parking.isopennow ? 'Open' : 'Closed'}</p>
            <p>Available: {parking.availablecapacity} / {parking.totalcapacity}</p>
            <p>Occupation: {parking.occupation}%</p>
            <p>Address: {location?.roadName ?? 'Not available'}</p>
            <p>Phone: {location?.contactDetailsTelephoneNumber ?? 'Not available'}</p>
            <p>Opening hours: {parking.openingtimesdescription}</p>
            <p>Operator: {parking.operatorinformation}</p>
            <p>Free parking: {parking.freeparking ? 'Yes' : 'No'}</p>
            {parking.location && (
                <ParkingMap
                    lat={parking.location.lat}
                    lon={parking.location.lon}
                    name={parking.name}
                />
            )}
        </>
    )
}
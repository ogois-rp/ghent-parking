import { useEffect, useState } from 'react'
import type { ParkingRecord } from '../types/parking'
import parkingService from '../services/parkingService'

export function useParkingDetail(name: string) {
    const [parking, setParking] = useState<ParkingRecord | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        let isMounted = true

        async function fetchParking() {
            try {
                setLoading(true)
                const response = await parkingService.getByName(name)
                if (isMounted) {
                    setParking(response.results[0] || null)
                    setError(null)
                }
            } catch (err) {
                if (isMounted) {
                    setError((err as Error).message)
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchParking()

        return () => {
            isMounted = false
        }
    }, [name])

    return { parking, loading, error }

}
import { useState, useEffect } from 'react';
import type { ParkingRecord } from '../types/parking';
import parkingService from '../services/parkingService'
import type { SortDirection, SortField } from '../types/parking';


export function useParking() {
  const [list, setList] = useState<ParkingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');
  const [committedSearch, setCommittedSearch] = useState('');

const handleSearch = () => setCommittedSearch(search)

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const response = await parkingService.getAll({ search: committedSearch, sortField, sortDirection });
        
        if (isMounted) {
          setList(response.results);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [committedSearch, sortField, sortDirection]);

  return { list, loading, error, search, setSearch, sortField, setSortField, sortDirection, setSortDirection, handleSearch };
}
import { ParkingCard } from '../components/ParkingCard'
import { ParkingFilter } from '../components/ParkingFilter'
import { useParking } from '../hooks/useParking'

export function Parking() {
  const { list, loading, error, search, setSearch, sortField, setSortField, sortDirection, setSortDirection, handleSearch } = useParking()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <h1>Parking</h1>
      <ParkingFilter
        search={search}
        setSearch={setSearch}
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        onSearch={handleSearch}
      />
      {list.length === 0 ? (
        <div>No parkings available</div>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4">
          {list.map(parking => (
            <li key={parking.name} className='h-full'>
              <ParkingCard parking={parking} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
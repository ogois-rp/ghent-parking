import { ParkingCard } from '../components/ParkingCard'
import { ParkingFilter } from '../components/ParkingFilter'
import { useParking } from '../hooks/useParking'
import { useFavourites } from '../hooks/useFavourites'

export function Parking() {
  const { list, loading, error, search, setSearch, sortField, setSortField, sortDirection, setSortDirection, handleSearch } = useParking()
  const { toggleFavourite, isFavourite } = useFavourites()

  return (
    <>
      <h1 className="text-2xl font-medium text-gray-900 mb-1">Parkings</h1>
      <p className="text-sm text-gray-500 mb-6">Real-time availability across Ghent</p>
      <ParkingFilter
        search={search}
        setSearch={setSearch}
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        onSearch={handleSearch}
      />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : list.length === 0 ? (
        <div>No parkings available</div>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4">
          {list.map(parking => (
            <li key={parking.name} className='h-full'>
              <ParkingCard
                parking={parking}
                isFavourite={isFavourite(parking.name)}
                onToggleFavourite={toggleFavourite}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
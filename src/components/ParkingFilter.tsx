import type { SortDirection, SortField } from "../types/parking"

export function ParkingFilter({ search, setSearch, sortField, setSortField, sortDirection, setSortDirection, onSearch }: {
    search: string
    setSearch: (value: string) => void
    sortField: SortField
    setSortField: (value: SortField) => void
    sortDirection: SortDirection
    setSortDirection: (value: SortDirection) => void
    onSearch: () => void
}) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onSearch()
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-4 justify-between">
            <div className="flex w-full md:w-1/3 gap-2">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="border p-2 w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={onSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap"
                >
                    Search
                </button>
            </div>
            <div className="flex gap-2 items-center">
                <p>Sort by:</p>
                <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value as SortField)}
                    className="border p-2"
                >
                    <option value="name">Name</option>
                    <option value="availablecapacity">Available Capacity</option>
                </select>
                <select
                    value={sortDirection}
                    onChange={(e) => setSortDirection(e.target.value as SortDirection)}
                    className="border p-2"
                >
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
            </div>
        </div>
    )
}
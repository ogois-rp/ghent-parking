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
        <div className="flex flex-col md:flex-row gap-3 mb-6 justify-between items-start md:items-center">
            
            <div className="flex w-full md:w-auto gap-2">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full md:w-64 focus:outline-none focus:border-blue-400 transition"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={onSearch}
                    className="bg-blue-700 hover:bg-blue-800 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap transition"
                >
                    Search
                </button>
            </div>

            <div className="flex gap-2 items-center">
                <span className="text-xs text-gray-500 whitespace-nowrap">Sort by</span>
                <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value as SortField)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition"
                >
                    <option value="name">Name</option>
                    <option value="availablecapacity">Available spaces</option>
                </select>
                <select
                    value={sortDirection}
                    onChange={(e) => setSortDirection(e.target.value as SortDirection)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition"
                >
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
            </div>

        </div>
    )
}
import { Link, useLocation, useNavigate } from 'react-router-dom'

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/')

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div
          onClick={() => navigate('/parking')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 bg-blue-800 rounded-md flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="2" y="11" fill="white" fontSize="11" fontWeight="600" fontFamily="sans-serif">P</text>
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900">ParkGent</span>
        </div>

        <nav className="flex items-center gap-1">
          <Link
            to="/parking"
            className={`text-sm px-3 py-1.5 rounded-md transition-colors ${isActive('/parking')
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            Parkings
          </Link>
          <Link
            to="/profile"
            className={`text-sm px-3 py-1.5 rounded-md transition-colors ${isActive('/profile')
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            Profile
          </Link>
        </nav>

      </div>
    </header>
  )
}
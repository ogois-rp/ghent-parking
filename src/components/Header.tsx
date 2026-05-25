import { Link, useLocation, useNavigate } from 'react-router-dom'

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span onClick={() => navigate('/parking')} className="cursor-pointer text-xl font-bold text-blue-600">ParkGent</span>
        <nav className="flex items-center gap-6">
          <Link
            to="/parking"
            className={`text-sm font-medium transition-colors ${
              isActive('/parking')
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Parkings
          </Link>
          <Link
            to="/profile"
            className={`text-sm font-medium transition-colors ${
              isActive('/profile')
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  )
}
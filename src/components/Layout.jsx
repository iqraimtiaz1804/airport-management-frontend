import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Layout() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const navLink = ({ isActive }) => isActive ? 'px-3 py-2 rounded-xl bg-primary-600 text-white' : 'px-3 py-2 rounded-xl hover:bg-slate-100'

  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr]">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold text-primary-700">✈️ Airport MS</div>
          <nav className="ml-4 flex gap-1">
            <NavLink className={navLink} to="/dashboard">Dashboard</NavLink>
            <NavLink className={navLink} to="/users">Users</NavLink>
            <NavLink className={navLink} to="/tickets">Tickets</NavLink>
            <NavLink className={navLink} to="/bookings">Bookings</NavLink>
            <NavLink className={navLink} to="/flights">Flights</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="badge">Signed in as <strong className="ml-1">{currentUser?.name}</strong></span>
            <button className="btn-secondary" onClick={()=>{ logout(); navigate('/login') }}>Logout</button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto w-full p-4">
        <Outlet />
      </main>
    </div>
  )
}

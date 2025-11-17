import { useAuth } from '../context/AuthContext.jsx'
import { useUsers } from '../context/UserContext.jsx'
import { useTickets } from '../context/TicketContext.jsx'

export default function Dashboard() {
  const { currentUser } = useAuth()
  const { users } = useUsers()
  const { tickets } = useTickets()

  const totalBookings = tickets.reduce((acc, t) => acc + t.bookedBy.length, 0)

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <div className="card p-5">
        <h3 className="text-sm text-slate-500">Welcome</h3>
        <div className="text-2xl font-semibold mt-1">{currentUser?.name}</div>
        <p className="text-sm text-slate-600 mt-2">Manage users, tickets and bookings.</p>
      </div>
      <div className="card p-5">
        <div className="text-sm text-slate-500">Users</div>
        <div className="text-3xl font-bold mt-1">{users.length}</div>
      </div>
      <div className="card p-5">
        <div className="text-sm text-slate-500">Tickets</div>
        <div className="text-3xl font-bold mt-1">{tickets.length}</div>
        <div className="text-sm text-slate-600 mt-1">{totalBookings} total bookings</div>
      </div>
    </div>
  )
}

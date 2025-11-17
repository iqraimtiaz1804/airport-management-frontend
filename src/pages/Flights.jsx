import { useAuth } from '../context/AuthContext.jsx'
import { useUsers } from '../context/UserContext.jsx'
import { useTickets } from '../context/TicketContext.jsx'

export default function Flights() {
  const { currentUser } = useAuth()
  const { users } = useUsers()
  const { tickets } = useTickets()

  const me = users.find(u => u.id === currentUser?.id) // in this demo, auth users and CRUD users are separate; this may be undefined
  const myBookings = tickets.filter(t => t.bookedBy.includes(me?.id))

  return (
    <div className="grid gap-4">
      <div className="card p-4">
        <h3 className="text-lg font-semibold">All Flights</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {tickets.map(t => (
            <div key={t.id} className="card p-4">
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">{t.code}</div>
                <div className="badge">{t.status}</div>
              </div>
              <div className="text-slate-600">{t.origin} → {t.destination}</div>
              <div className="text-slate-500 text-sm mt-1">Gate {t.gate || '-'}</div>
              <div className="text-sm mt-1">Departure: {t.time}</div>
              <div className="text-xs text-slate-500 mt-2">Booked by {t.bookedBy.length} user(s)</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4">
        <h3 className="text-lg font-semibold">My Booked Flights</h3>
        {!me && <p className="text-sm text-slate-600">Tip: Create a user entry that matches your logged-in account to see your flights here.</p>}
        <div className="grid gap-3 md:grid-cols-2">
          {myBookings.map(t => (
            <div key={t.id} className="card p-4">
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">{t.code}</div>
                <div className="badge">{t.status}</div>
              </div>
              <div className="text-slate-600">{t.origin} → {t.destination}</div>
              <div className="text-sm mt-1">Departure: {t.time} • Gate {t.gate || '-'}</div>
            </div>
          ))}
          {!myBookings.length && <p className="text-sm text-slate-600">No bookings yet.</p>}
        </div>
      </div>
    </div>
  )
}

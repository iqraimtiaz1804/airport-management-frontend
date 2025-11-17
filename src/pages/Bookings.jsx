import { useState } from 'react'
import { useUsers } from '../context/UserContext.jsx'
import { useTickets } from '../context/TicketContext.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'

export default function Bookings() {
  const { users } = useUsers()
  const { tickets, bookTicket, unbookTicket } = useTickets()
  const [selection, setSelection] = useState({ userId: '', ticketId: '' })
  const [confirm, setConfirm] = useState({ open:false, userId:null, ticketId:null })

  const submit = (e) => {
    e.preventDefault()
    if (!selection.userId || !selection.ticketId) return
    bookTicket(selection.ticketId, selection.userId)
    setSelection({ userId:'', ticketId:'' })
  }

  const bookedRows = tickets.flatMap(t => t.bookedBy.map(uid => ({
    ticket: t, user: users.find(u => u.id === uid)
  })))

  return (
    <div className="grid gap-4">
      <form className="card p-4 grid gap-3 md:grid-cols-3" onSubmit={submit}>
        <div>
          <label className="label">Select User</label>
          <select className="input" value={selection.userId} onChange={e=>setSelection(s=>({ ...s, userId:e.target.value }))}>
            <option value="">-- choose user --</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Select Ticket</label>
          <select className="input" value={selection.ticketId} onChange={e=>setSelection(s=>({ ...s, ticketId:e.target.value }))}>
            <option value="">-- choose ticket --</option>
            {tickets.map(t => <option key={t.id} value={t.id}>{t.code} • {t.origin}→{t.destination} • {t.time}</option>)}
          </select>
        </div>
        <div className="flex items-end">
          <button className="btn-primary w-full">Book Ticket</button>
        </div>
      </form>

      <div className="card p-4 overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="th">User</th>
              <th className="th">Ticket</th>
              <th className="th">Time</th>
              <th className="th w-40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookedRows.map(({ user, ticket }) => (
              <tr key={user.id + ticket.id}>
                <td className="td">{user?.name}</td>
                <td className="td">{ticket.code} — {ticket.origin}→{ticket.destination}</td>
                <td className="td">{ticket.time}</td>
                <td className="td">
                  <div className="flex gap-2">
                    <button className="btn-primary" onClick={()=> setConfirm({ open:true, userId:user.id, ticketId:ticket.id })}>Cancel Booking</button>
                  </div>
                </td>
              </tr>
            ))}
            {!bookedRows.length && (
              <tr><td className="td" colSpan="4">No bookings yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={confirm.open}
        title="Cancel booking?"
        message="This will un-link the user from the ticket."
        onCancel={()=> setConfirm({ open:false, userId:null, ticketId:null })}
        onConfirm={()=> { unbookTicket(confirm.ticketId, confirm.userId); setConfirm({ open:false, userId:null, ticketId:null }) }}
      />
    </div>
  )
}

import { useState } from 'react'
import { useTickets } from '../context/TicketContext.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Tickets() {
  const { tickets, addTicket, updateTicket, deleteTicket } = useTickets()
  const [form, setForm] = useState({ code:'', origin:'', destination:'', time:'', gate:'', status:'On Time' })
  const [editing, setEditing] = useState(null)
  const [confirm, setConfirm] = useState({ open:false, id:null })

  const submit = (e) => {
    e.preventDefault()
    if (!form.code || !form.origin || !form.destination || !form.time) return
    if (editing) { updateTicket(editing, form); setEditing(null) }
    else addTicket(form)
    setForm({ code:'', origin:'', destination:'', time:'', gate:'', status:'On Time' })
  }

  const startEdit = (t) => { setEditing(t.id); setForm({ code: t.code, origin: t.origin, destination: t.destination, time: t.time, gate: t.gate, status: t.status }) }

  if (!tickets.length) {
    return <EmptyState title="No tickets yet" action={<button className="btn-primary mt-4" onClick={()=>{}}>Add one below</button>}>Create flight tickets using the form.</EmptyState>
  }

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-[2fr,1fr]">
      <div className="card p-4 overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Code</th>
              <th className="th">Route</th>
              <th className="th">Time</th>
              <th className="th">Gate</th>
              <th className="th">Status</th>
              <th className="th w-40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.id}>
                <td className="td">{t.code}</td>
                <td className="td">{t.origin} → {t.destination}</td>
                <td className="td">{t.time}</td>
                <td className="td">{t.gate || '-'}</td>
                <td className="td"><span className="badge">{t.status}</span></td>
                <td className="td">
                  <div className="flex gap-2">
                    <button className="btn-secondary" onClick={()=> startEdit(t)}>Edit</button>
                    <button className="btn-primary" onClick={()=> setConfirm({ open:true, id:t.id })}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form className="card p-4" onSubmit={submit}>
        <h3 className="text-lg font-semibold">{editing ? 'Edit Ticket' : 'Add Ticket'}</h3>
        <label className="label mt-3">Flight Code</label>
        <input className="input" value={form.code} onChange={e=>setForm({ ...form, code:e.target.value })} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label mt-3">Origin</label>
            <input className="input" value={form.origin} onChange={e=>setForm({ ...form, origin:e.target.value })} />
          </div>
          <div>
            <label className="label mt-3">Destination</label>
            <input className="input" value={form.destination} onChange={e=>setForm({ ...form, destination:e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label mt-3">Time</label>
            <input className="input" placeholder="HH:MM" value={form.time} onChange={e=>setForm({ ...form, time:e.target.value })} />
          </div>
          <div>
            <label className="label mt-3">Gate</label>
            <input className="input" value={form.gate} onChange={e=>setForm({ ...form, gate:e.target.value })} />
          </div>
        </div>
        <label className="label mt-3">Status</label>
        <select className="input" value={form.status} onChange={e=>setForm({ ...form, status:e.target.value })}>
          <option>On Time</option>
          <option>Delayed</option>
          <option>Boarding</option>
          <option>Cancelled</option>
        </select>
        <div className="flex gap-2 mt-4">
          <button className="btn-primary" type="submit">{editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" className="btn-secondary" onClick={()=>{ setEditing(null); setForm({ code:'', origin:'', destination:'', time:'', gate:'', status:'On Time' }) }}>Cancel</button>}
        </div>
      </form>

      <ConfirmModal
        open={confirm.open}
        title="Delete ticket?"
        message="This will remove the ticket permanently."
        onCancel={()=> setConfirm({ open:false, id:null })}
        onConfirm={()=> { deleteTicket(confirm.id); setConfirm({ open:false, id:null }) }}
      />
    </div>
  )
}

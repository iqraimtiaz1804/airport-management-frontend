import { useState } from 'react'
import { useUsers } from '../context/UserContext.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Users() {
  const { users, addUser, updateUser, deleteUser } = useUsers()
  const [form, setForm] = useState({ name:'', email:'', role:'Passenger' })
  const [editing, setEditing] = useState(null)
  const [confirm, setConfirm] = useState({ open:false, id:null })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    if (editing) { updateUser(editing, form); setEditing(null) }
    else addUser(form)
    setForm({ name:'', email:'', role:'Passenger' })
  }

  const startEdit = (u) => { setEditing(u.id); setForm({ name: u.name, email: u.email, role: u.role }) }

  if (!users.length) {
    return <EmptyState title="No users found" action={<button className="btn-primary mt-4" onClick={()=>{}}>Add one below</button>}>Create your first passenger using the form.</EmptyState>
  }

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-[2fr,1fr]">
      <div className="card p-4 overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Name</th>
              <th className="th">Email</th>
              <th className="th">Role</th>
              <th className="th w-40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td className="td">{u.name}</td>
                <td className="td">{u.email}</td>
                <td className="td">{u.role}</td>
                <td className="td">
                  <div className="flex gap-2">
                    <button className="btn-secondary" onClick={()=> startEdit(u)}>Edit</button>
                    <button className="btn-primary" onClick={()=> setConfirm({ open:true, id:u.id })}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form className="card p-4" onSubmit={submit}>
        <h3 className="text-lg font-semibold">{editing ? 'Edit User' : 'Add User'}</h3>
        <label className="label mt-3">Name</label>
        <input className="input" value={form.name} onChange={e=>setForm({ ...form, name:e.target.value })} />
        <label className="label mt-3">Email</label>
        <input className="input" type="email" value={form.email} onChange={e=>setForm({ ...form, email:e.target.value })} />
        <label className="label mt-3">Role</label>
        <select className="input" value={form.role} onChange={e=>setForm({ ...form, role:e.target.value })}>
          <option>Passenger</option>
          <option>Admin</option>
          <option>Agent</option>
        </select>
        <div className="flex gap-2 mt-4">
          <button className="btn-primary" type="submit">{editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" className="btn-secondary" onClick={()=>{ setEditing(null); setForm({ name:'', email:'', role:'Passenger' }) }}>Cancel</button>}
        </div>
      </form>

      <ConfirmModal
        open={confirm.open}
        title="Delete user?"
        message="This will remove the user permanently."
        onCancel={()=> setConfirm({ open:false, id:null })}
        onConfirm={()=> { deleteUser(confirm.id); setConfirm({ open:false, id:null }) }}
      />
    </div>
  )
}

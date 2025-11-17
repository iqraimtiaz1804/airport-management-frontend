import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    try {
      if (!name || !email || !password) throw new Error('All fields are required')
      register({ name, email, password })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <form onSubmit={onSubmit} className="card w-full max-w-md p-6">
        <h2 className="text-xl font-semibold">Create Account</h2>
        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
        <label className="label mt-4">Full Name</label>
        <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        <label className="label mt-3">Email</label>
        <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <label className="label mt-3">Password</label>
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn-primary w-full mt-4">Register</button>
        <p className="text-sm text-slate-600 mt-3">Already have an account? <Link to="/login" className="text-primary-700 underline">Login</Link></p>
      </form>
    </div>
  )
}

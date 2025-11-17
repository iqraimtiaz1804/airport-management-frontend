import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    try {
      if (!email || !password) throw new Error('All fields are required')
      login({ email, password })
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <form onSubmit={onSubmit} className="card w-full max-w-md p-6">
        <h2 className="text-xl font-semibold">Login</h2>
        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
        <label className="label mt-4">Email</label>
        <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <label className="label mt-3">Password</label>
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn-primary w-full mt-4">Sign In</button>
        <p className="text-sm text-slate-600 mt-3">No account? <Link to="/register" className="text-primary-700 underline">Register</Link></p>
      </form>
    </div>
  )
}

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Splash() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  useEffect(()=>{
    const id = setTimeout(()=> navigate(isAuthenticated ? '/dashboard' : '/login', { replace: true }), 1200)
    return ()=> clearTimeout(id)
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-primary-50 to-white">
      <div className="card p-10 text-center">
        <div className="text-6xl">✈️</div>
        <h1 className="text-2xl font-bold mt-2">Airport Management System</h1>
        <p className="text-slate-600">Loading…</p>
      </div>
    </div>
  )
}

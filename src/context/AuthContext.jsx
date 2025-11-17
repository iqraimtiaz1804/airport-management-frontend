import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { persist, read } from './utils.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => read('auth_users', []))
  const [currentUser, setCurrentUser] = useState(() => read('auth_currentUser', null))

  useEffect(() => persist('auth_users', users), [users])
  useEffect(() => persist('auth_currentUser', currentUser), [currentUser])

  const register = ({ name, email, password }) => {
    if (users.some(u => u.email === email)) throw new Error('Email already registered')
    const user = { id: crypto.randomUUID(), name, email, password }
    setUsers(prev => [...prev, user])
    setCurrentUser({ id: user.id, name: user.name, email: user.email })
  }

  const login = ({ email, password }) => {
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) throw new Error('Invalid credentials')
    setCurrentUser({ id: user.id, name: user.name, email: user.email })
  }

  const logout = () => setCurrentUser(null)

  const value = useMemo(()=> ({
    users, currentUser, isAuthenticated: !!currentUser,
    register, login, logout
  }), [users, currentUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

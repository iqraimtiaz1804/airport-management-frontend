import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { persist, read } from './utils.js'
import { v4 as uuidv4 } from 'uuid'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [users, setUsers] = useState(() => read('ums_users', [
    { id: uuidv4(), name: 'John Doe', email: 'john@example.com', role: 'Passenger' },
    { id: uuidv4(), name: 'Jane Smith', email: 'jane@example.com', role: 'Passenger' }
  ]))

  useEffect(()=> persist('ums_users', users), [users])

  const addUser = (user) => setUsers(prev => [...prev, { ...user, id: uuidv4() }])
  const updateUser = (id, updates) => setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u))
  const deleteUser = (id) => setUsers(prev => prev.filter(u => u.id !== id))

  const value = useMemo(()=>({ users, addUser, updateUser, deleteUser }), [users])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUsers = () => useContext(UserContext)

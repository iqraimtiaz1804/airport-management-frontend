import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { persist, read } from './utils.js'
import { v4 as uuidv4 } from 'uuid'

const TicketContext = createContext(null)

const seed = [
  { id: uuidv4(), code: 'PK-301', origin: 'KHI', destination: 'LHE', time: '10:30', gate: 'A3', status: 'On Time', bookedBy: [] },
  { id: uuidv4(), code: 'PK-477', origin: 'ISB', destination: 'DXB', time: '14:15', gate: 'B1', status: 'Delayed', bookedBy: [] },
  { id: uuidv4(), code: 'EK-603', origin: 'KHI', destination: 'DXB', time: '18:00', gate: 'C2', status: 'Boarding', bookedBy: [] }
]

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(() => read('ams_tickets', seed))

  useEffect(()=> persist('ams_tickets', tickets), [tickets])

  const addTicket = (t) => setTickets(prev => [...prev, { ...t, id: uuidv4(), bookedBy: [] }])
  const updateTicket = (id, updates) => setTickets(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  const deleteTicket = (id) => setTickets(prev => prev.filter(t => t.id !== id))

  const bookTicket = (ticketId, userId) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t
      if (t.bookedBy.includes(userId)) return t
      return { ...t, bookedBy: [...t.bookedBy, userId] }
    }))
  }

  const unbookTicket = (ticketId, userId) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t
      return { ...t, bookedBy: t.bookedBy.filter(id => id !== userId) }
    }))
  }

  const value = useMemo(()=>({ tickets, addTicket, updateTicket, deleteTicket, bookTicket, unbookTicket }), [tickets])

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
}

export const useTickets = () => useContext(TicketContext)

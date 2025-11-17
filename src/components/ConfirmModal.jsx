import { useState } from 'react'

export default function ConfirmModal({ open, title='Are you sure?', message='This action cannot be undone.', onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center p-4 z-50">
      <div className="card max-w-md w-full p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-slate-600 mt-1">{message}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn-primary" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

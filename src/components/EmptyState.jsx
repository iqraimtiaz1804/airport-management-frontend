export default function EmptyState({ title='Nothing here yet', action, children }) {
  return (
    <div className="card p-8 grid place-items-center text-center">
      <div className="text-5xl">🗂️</div>
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-slate-600 text-sm mt-1">{children}</p>
      {action}
    </div>
  )
}

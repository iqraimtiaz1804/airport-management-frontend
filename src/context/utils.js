export const persist = (key, value) => localStorage.setItem(key, JSON.stringify(value))
export const read = (key, fallback) => {
  try { 
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch { return fallback }
}

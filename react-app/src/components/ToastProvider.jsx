import { useState, useCallback } from 'react'
import { ToastCtx } from './toastContext'

let uid = 0
export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((title, desc = '', type = 'info') => {
    const id = ++uid
    setToasts(t => [...t, { id, title, desc, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000)
  }, [])

  const iconMap = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' }

  return (
    <ToastCtx.Provider value={showToast}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span className="toast-icon">{iconMap[t.type]}</span>
            <div>
              <div className="toast-title">{t.title}</div>
              {t.desc && <div className="toast-desc">{t.desc}</div>}
            </div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

import { createContext, useContext, useState, useCallback } from 'react'
import Toast from '../components/UI/Toast'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'info', options = {}) => {
    const id = Date.now() + Math.random()
    const toast = {
      id,
      message,
      type,
      title: options.title,
      duration: options.duration ?? 5000,
    }
    setToasts((prev) => [...prev, toast])
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const success = useCallback((message, options) => showToast(message, 'success', options), [showToast])
  const error = useCallback((message, options) => showToast(message, 'error', options), [showToast])
  const info = useCallback((message, options) => showToast(message, 'info', options), [showToast])
  const warning = useCallback((message, options) => showToast(message, 'warning', options), [showToast])

  return (
    <ToastContext.Provider value={{ success, error, info, warning, showToast }}>
      {children}
      <div className="fixed top-20 right-4 z-50 space-y-2 max-w-md">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

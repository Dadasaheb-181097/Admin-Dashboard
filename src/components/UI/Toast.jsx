import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const colors = {
  success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
}

function Toast({ toast, onClose }) {
  const Icon = icons[toast.type] || Info

  useEffect(() => {
    if (toast.duration > 0) {
      const timer = setTimeout(() => {
        onClose(toast.id)
      }, toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast.id, toast.duration, onClose])

  return (
    <div
      className={`flex items-start space-x-3 p-4 rounded-lg border shadow-lg animate-scale-in ${colors[toast.type]}`}
      style={{ animationDelay: '0ms' }}
    >
      <Icon className="flex-shrink-0 mt-0.5" size={20} />
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-semibold mb-1">{toast.title}</p>
        )}
        <p className="text-sm">{toast.message}</p>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export default Toast

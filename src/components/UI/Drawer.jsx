/**
 * Reusable Drawer Component
 * Slide-in drawer from right/left with animations
 * Fixed positioning to overlay sidebar and header
 * Rendered via Portal to ensure proper positioning
 */
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const Drawer = ({ isOpen, onClose, title, children, position = 'right', size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const sizeClasses = {
    sm: 'w-80',
    md: 'w-96',
    lg: 'w-[28rem]',
    xl: 'w-[32rem]',
  }

  const positionClasses = {
    right: 'right-0',
    left: 'left-0',
  }

  const slideAnimation = position === 'right' 
    ? 'translate-x-full' 
    : '-translate-x-full'

  if (!isOpen) return null

  const drawerContent = (
    <>
      {/* Backdrop - Higher z-index to cover sidebar */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-[100] transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer - Highest z-index, starts from very top of viewport */}
      <div
        className={`
          fixed top-0 bottom-0 ${positionClasses[position]} 
          ${sizeClasses[size]}
          bg-white dark:bg-gray-800 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : slideAnimation}
          z-[101]
          flex flex-col
          border-l border-gray-200 dark:border-gray-700
          ${position === 'left' ? 'border-l-0 border-r' : ''}
        `}
      >
        {/* Header - Fixed at top with minimal padding */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Close drawer"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </>
  )

  // Render via Portal to document.body to avoid parent container constraints
  return createPortal(drawerContent, document.body)
}

export default Drawer

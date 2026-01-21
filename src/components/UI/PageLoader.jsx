import React from 'react'

export default function PageLoader() {
  return (
    <div className="w-full flex items-center justify-center py-16">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-primary-600 dark:border-t-primary-400 animate-spin" />
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Loading…
        </p>
      </div>
    </div>
  )
}


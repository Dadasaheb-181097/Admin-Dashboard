import React from 'react'

export default function ChartDefs() {
  return (
    <defs>
      <linearGradient id="gradPrimary" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} />
        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="gradSuccess" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#10b981" stopOpacity={0.30} />
        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="gradViolet" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.30} />
        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="gradAmber" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.28} />
        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="gradRose" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.26} />
        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
      </linearGradient>
    </defs>
  )
}


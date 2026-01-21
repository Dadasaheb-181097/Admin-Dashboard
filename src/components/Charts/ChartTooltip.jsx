import React from 'react'
import { useChartTheme } from './useChartTheme'

function defaultValueFormatter(value) {
  if (typeof value === 'number') return value.toLocaleString()
  return String(value ?? '')
}

export default function ChartTooltip({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter = defaultValueFormatter,
}) {
  const t = useChartTheme()

  if (!active || !payload || payload.length === 0) return null

  const title = labelFormatter ? labelFormatter(label) : label

  return (
    <div style={t.tooltip}>
      {title != null && (
        <div className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2">
          {title}
        </div>
      )}
      <div className="space-y-1">
        {payload
          .filter((p) => p && p.value != null && p.name)
          .map((p) => (
            <div key={p.dataKey || p.name} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: p.color || '#0ea5e9' }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
                  {p.name}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 tabular-nums">
                {valueFormatter(p.value, p)}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}


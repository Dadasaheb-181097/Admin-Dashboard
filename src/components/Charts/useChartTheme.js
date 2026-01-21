import { useMemo } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

export const chartColors = {
  primary: '#0ea5e9', // sky-500
  success: '#10b981', // emerald-500
  violet: '#8b5cf6', // violet-500
  amber: '#f59e0b', // amber-500
  rose: '#ef4444', // red-500
}

export const chartPalette = [
  chartColors.primary,
  chartColors.success,
  chartColors.violet,
  chartColors.amber,
  chartColors.rose,
]

export function useChartTheme() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return useMemo(() => {
    const tickColor = isDark ? '#94a3b8' : '#64748b' // slate-400 / slate-500
    const gridStroke = isDark ? 'rgba(148,163,184,0.14)' : 'rgba(148,163,184,0.28)'

    const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.96)'
    const tooltipBorder = isDark ? 'rgba(148,163,184,0.22)' : 'rgba(148,163,184,0.25)'
    const tooltipShadow = isDark ? '0 18px 40px rgba(0,0,0,0.55)' : '0 18px 40px rgba(15,23,42,0.12)'

    return {
      isDark,
      tickColor,
      gridStroke,
      axis: {
        axisLine: false,
        tickLine: false,
        tickMargin: 10,
        tick: { fill: tickColor, fontSize: 12 },
      },
      grid: {
        stroke: gridStroke,
        strokeDasharray: '3 3',
      },
      tooltip: {
        backgroundColor: tooltipBg,
        border: `1px solid ${tooltipBorder}`,
        borderRadius: 12,
        boxShadow: tooltipShadow,
        padding: 12,
      },
    }
  }, [isDark])
}

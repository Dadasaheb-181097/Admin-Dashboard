/**
 * Analytics Page
 * Features filter drawer and comprehensive data visualizations
 */
import { useState } from 'react'
import { Filter, Calendar, Download } from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { salesData, revenueData } from '../data/sampleData'
import Drawer from '../components/UI/Drawer'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import ChartTooltip from '../components/Charts/ChartTooltip'
import ChartDefs from '../components/Charts/ChartDefs'
import { useChartTheme, chartPalette, chartColors } from '../components/Charts/useChartTheme'

const categoryData = [
  { name: 'Electronics', value: 45, fullMark: 100 },
  { name: 'Accessories', value: 30, fullMark: 100 },
  { name: 'Furniture', value: 15, fullMark: 100 },
  { name: 'Other', value: 10, fullMark: 100 },
]

function Analytics() {
  const chart = useChartTheme()
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [filters, setFilters] = useState({
    dateRange: 'Last 6 months',
    category: 'All',
    chartType: 'All',
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Deep insights into your business performance</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={() => setIsFilterDrawerOpen(true)} className="flex items-center">
            <Filter size={20} className="mr-2" />
            Filters
          </Button>
          <Button variant="secondary" className="flex items-center">
            <Download size={20} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Revenue Distribution Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-fade-in border-0 shadow-xl" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Revenue by Category</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Distribution breakdown</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                innerRadius={60}
                outerRadius={105}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={3}
                cornerRadius={10}
                stroke={chart.isDark ? 'rgba(15,23,42,0.65)' : '#ffffff'}
                strokeWidth={2}
                animationDuration={1600}
                animationEasing="ease-out"
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || chartPalette[index % chartPalette.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Radar Chart */}
        <Card className="animate-fade-in border-0 shadow-xl" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Category Performance</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Multi-dimensional analysis</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={categoryData}>
              <PolarGrid stroke={chart.gridStroke} />
              <PolarAngleAxis 
                dataKey="name" 
                tick={{ fill: chart.tickColor, fontSize: 12 }}
              />
              <PolarRadiusAxis 
                tick={{ fill: chart.tickColor, fontSize: 12 }}
              />
              <Radar 
                name="Performance" 
                dataKey="value" 
                stroke={chartColors.primary}
                fill={chartColors.primary}
                fillOpacity={chart.isDark ? 0.35 : 0.5}
                strokeWidth={2.5}
                animationDuration={1500}
                animationBegin={120}
                animationEasing="ease-out"
              />
              <Tooltip content={<ChartTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Sales Trend */}
      <Card className="animate-fade-in border-0 shadow-xl" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Sales Trend Analysis</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Multi-metric comparison</p>
          </div>
          <select 
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            <option>Last 6 months</option>
            <option>Last year</option>
            <option>Last 2 years</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid {...chart.grid} />
            <XAxis dataKey="month" {...chart.axis} />
            <YAxis {...chart.axis} />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: chart.gridStroke, strokeWidth: 1 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke={chartColors.primary}
              strokeWidth={3.25}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke={chartColors.success}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
              animationBegin={140}
              animationEasing="ease-out"
            />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke={chartColors.violet}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
              animationBegin={280}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-fade-in border-0 shadow-xl" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Monthly Sales Comparison</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Side-by-side metrics</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <ChartDefs />
              <CartesianGrid {...chart.grid} />
              <XAxis dataKey="month" {...chart.axis} />
              <YAxis {...chart.axis} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: chart.isDark ? 'rgba(148,163,184,0.06)' : 'rgba(148,163,184,0.10)' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar 
                dataKey="sales" 
                fill="url(#gradPrimary)"
                radius={[10, 10, 2, 2]} 
                animationDuration={1400}
                animationEasing="ease-out"
              />
              <Bar 
                dataKey="orders" 
                fill="url(#gradSuccess)"
                radius={[10, 10, 2, 2]} 
                animationDuration={1400}
                animationBegin={160}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="animate-fade-in border-0 shadow-xl" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">User Growth</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Growth trajectory</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <ChartDefs />
              <CartesianGrid {...chart.grid} />
              <XAxis dataKey="month" {...chart.axis} />
              <YAxis {...chart.axis} />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: chart.gridStroke, strokeWidth: 1 }} />
              <Area 
                type="monotone" 
                dataKey="users" 
                stroke={chartColors.violet}
                fillOpacity={1} 
                fill="url(#gradViolet)"
                strokeWidth={3.25}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Filter Drawer */}
      <Drawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Analytics Filters"
        position="right"
        size="md"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>Last 2 years</option>
              <option>All time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option>All</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Furniture</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Chart Type
            </label>
            <select
              value={filters.chartType}
              onChange={(e) => setFilters({ ...filters, chartType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option>All</option>
              <option>Sales</option>
              <option>Orders</option>
              <option>Users</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-3">
              <Button variant="secondary" className="flex-1" onClick={() => {
                setFilters({ dateRange: 'Last 6 months', category: 'All', chartType: 'All' })
                setIsFilterDrawerOpen(false)
              }}>
                Reset
              </Button>
              <Button variant="primary" className="flex-1" onClick={() => setIsFilterDrawerOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default Analytics

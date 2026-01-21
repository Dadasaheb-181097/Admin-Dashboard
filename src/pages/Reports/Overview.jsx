/**
 * Reports Overview Page
 */
import { FileText, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react'
import Card from '../../components/UI/Card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import ChartTooltip from '../../components/Charts/ChartTooltip'
import ChartDefs from '../../components/Charts/ChartDefs'
import { useChartTheme, chartColors } from '../../components/Charts/useChartTheme'

const monthlyData = [
  { month: 'Jan', sales: 45000, orders: 320, revenue: 52000 },
  { month: 'Feb', sales: 52000, orders: 380, revenue: 61000 },
  { month: 'Mar', sales: 48000, orders: 350, revenue: 55000 },
  { month: 'Apr', sales: 61000, orders: 420, revenue: 72000 },
  { month: 'May', sales: 55000, orders: 390, revenue: 64000 },
  { month: 'Jun', sales: 67000, orders: 450, revenue: 79000 },
]

function Overview() {
  const chart = useChartTheme()
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="animate-scale-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">24</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FileText className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </Card>

        <Card className="animate-scale-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$328K</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </Card>

        <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$383K</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <DollarSign className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </Card>

        <Card className="animate-scale-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">2,311</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <ShoppingCart className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid {...chart.grid} />
              <XAxis dataKey="month" {...chart.axis} />
              <YAxis {...chart.axis} />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: chart.gridStroke, strokeWidth: 1 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke={chartColors.primary}
                strokeWidth={3}
                name="Sales"
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1400}
                animationEasing="ease-out"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke={chartColors.success}
                strokeWidth={3}
                name="Revenue"
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1400}
                animationBegin={140}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Orders by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <ChartDefs />
              <CartesianGrid {...chart.grid} />
              <XAxis dataKey="month" {...chart.axis} />
              <YAxis {...chart.axis} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: chart.isDark ? 'rgba(148,163,184,0.06)' : 'rgba(148,163,184,0.10)' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar 
                dataKey="orders" 
                fill="url(#gradPrimary)"
                name="Orders"
                radius={[10, 10, 2, 2]}
                animationDuration={1300}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

export default Overview

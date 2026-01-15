/**
 * Dashboard Overview Page
 * Displays key performance indicators and analytics charts
 */
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { salesData, dashboardStats } from '../data/sampleData'
import Card from '../components/UI/Card'

const StatCard = ({ title, value, change, icon: Icon, index }) => {
  const isPositive = change >= 0
  const iconColors = {
    DollarSign: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    ShoppingCart: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    Users: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    Package: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  }
  
  const iconName = Icon.name || 'DollarSign'
  const colorClass = iconColors[iconName] || iconColors.DollarSign

  return (
    <Card 
      className="animate-scale-in hover:shadow-xl transition-all duration-300" 
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{value}</p>
          <div className="flex items-center">
            {isPositive ? (
              <TrendingUp className="text-green-500 dark:text-green-400 mr-1" size={16} />
            ) : (
              <TrendingDown className="text-red-500 dark:text-red-400 mr-1" size={16} />
            )}
            <span className={`text-sm font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>
        <div className={`p-4 rounded-xl ${colorClass} shadow-sm`}>
          <Icon size={28} />
        </div>
      </div>
    </Card>
  )
}

function Dashboard() {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value)
  }

  // Chart colors for dark mode
  const chartColors = {
    grid: '#e5e7eb',
    gridDark: '#374151',
    text: '#6b7280',
    textDark: '#9ca3af',
    tooltipBg: '#ffffff',
    tooltipBgDark: '#1f2937',
    tooltipBorder: '#e5e7eb',
    tooltipBorderDark: '#374151',
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(dashboardStats.totalRevenue)}
          change={dashboardStats.revenueGrowth}
          icon={DollarSign}
          index={0}
        />
        <StatCard
          title="Total Orders"
          value={dashboardStats.totalOrders.toLocaleString()}
          change={dashboardStats.ordersGrowth}
          icon={ShoppingCart}
          index={1}
        />
        <StatCard
          title="Total Users"
          value={dashboardStats.totalUsers.toLocaleString()}
          change={dashboardStats.usersGrowth}
          icon={Users}
          index={2}
        />
        <StatCard
          title="Total Products"
          value={dashboardStats.totalProducts.toLocaleString()}
          change={dashboardStats.productsGrowth}
          icon={Package}
          index={3}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview - Area Chart */}
        <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Sales Overview</h2>
            <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis 
                dataKey="month" 
                className="text-gray-600 dark:text-gray-400"
                tick={{ fill: 'currentColor' }}
              />
              <YAxis 
                className="text-gray-600 dark:text-gray-400"
                tick={{ fill: 'currentColor' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--tooltip-bg, #ffffff)', 
                  border: '1px solid var(--tooltip-border, #e5e7eb)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  color: 'var(--tooltip-text, #111827)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#0ea5e9" 
                fillOpacity={1} 
                fill="url(#colorSales)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Orders & Users - Line Chart */}
        <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Orders & Users</h2>
            <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis 
                dataKey="month" 
                className="text-gray-600 dark:text-gray-400"
                tick={{ fill: 'currentColor' }}
              />
              <YAxis 
                className="text-gray-600 dark:text-gray-400"
                tick={{ fill: 'currentColor' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--tooltip-bg, #ffffff)', 
                  border: '1px solid var(--tooltip-border, #e5e7eb)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  color: 'var(--tooltip-text, #111827)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Monthly Performance - Bar Chart */}
      <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Monthly Performance</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis 
              dataKey="month" 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--tooltip-bg, #ffffff)', 
                border: '1px solid var(--tooltip-border, #e5e7eb)', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                color: 'var(--tooltip-text, #111827)'
              }}
            />
            <Legend />
            <Bar dataKey="sales" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
            <Bar dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

export default Dashboard

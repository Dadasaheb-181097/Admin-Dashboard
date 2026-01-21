/**
 * Enhanced Modern Dashboard Overview Page
 * Features animated charts, rich content, and modern UI design
 */
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Activity,
  Star,
  Zap
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { salesData, dashboardStats, orders, products } from '../data/sampleData'
import Card from '../components/UI/Card'
import Badge from '../components/UI/Badge'

const StatCard = ({ title, value, change, icon: Icon, index, gradient }) => {
  const isPositive = change >= 0
  const gradients = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    pink: 'from-pink-500 to-pink-600',
    indigo: 'from-indigo-500 to-indigo-600',
  }
  
  const gradientClass = gradients[gradient] || gradients.blue

  return (
    <Card 
      className="relative overflow-hidden group animate-scale-in hover:shadow-2xl transition-all duration-300 border-0" 
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{value}</p>
          <div className="flex items-center">
            {isPositive ? (
              <div className="flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                <TrendingUp className="text-green-600 dark:text-green-400 mr-1" size={14} />
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                  +{Math.abs(change)}%
                </span>
              </div>
            ) : (
              <div className="flex items-center bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg">
                <TrendingDown className="text-red-600 dark:text-red-400 mr-1" size={14} />
                <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                  {Math.abs(change)}%
                </span>
              </div>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
          </div>
        </div>
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradientClass} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="text-white" size={28} />
        </div>
      </div>
    </Card>
  )
}

const RecentActivityItem = ({ order, index }) => {
  const statusColors = {
    'Completed': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    'Processing': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    'Pending': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    'Cancelled': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
  }

  return (
    <div 
      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors animate-fade-in border-b border-gray-100 dark:border-gray-700 last:border-0"
      style={{ animationDelay: `${(index + 1) * 50}ms` }}
    >
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
          {order.customer.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{order.customer}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{order.product}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || statusColors.Pending}`}>
          {order.status}
        </span>
        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">${order.amount.toFixed(2)}</span>
      </div>
    </div>
  )
}

const TopProductCard = ({ product, index }) => {
  return (
    <div 
      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 hover:shadow-lg transition-all duration-300 animate-fade-in border border-gray-200 dark:border-gray-700"
      style={{ animationDelay: `${(index + 1) * 80}ms` }}
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-md">
          <Package className="text-white" size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{product.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">${product.price.toFixed(2)}</p>
        <div className="flex items-center justify-end mt-1">
          <Star className="text-yellow-400" size={12} fill="currentColor" />
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{product.sales} sales</span>
        </div>
      </div>
    </div>
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

  // Recent orders (last 5)
  const recentOrders = orders.slice(0, 5)
  
  // Top products by sales
  const topProducts = [...products].sort((a, b) => b.sales - a.sales).slice(0, 5)

  // Quick stats
  const quickStats = [
    { label: 'Avg Order Value', value: formatCurrency(305.50), icon: DollarSign, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Conversion Rate', value: '3.24%', icon: Activity, color: 'text-green-600 dark:text-green-400' },
    { label: 'Active Sessions', value: '1,234', icon: Zap, color: 'text-purple-600 dark:text-purple-400' },
    { label: 'Response Time', value: '0.8s', icon: Clock, color: 'text-orange-600 dark:text-orange-400' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your business today.</p>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <Badge variant="success">Live</Badge>
            <span className="text-sm text-gray-500 dark:text-gray-400">Last updated: 2 min ago</span>
          </div>
        </div>
      </div>

      {/* Enhanced KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(dashboardStats.totalRevenue)}
          change={dashboardStats.revenueGrowth}
          icon={DollarSign}
          index={0}
          gradient="blue"
        />
        <StatCard
          title="Total Orders"
          value={dashboardStats.totalOrders.toLocaleString()}
          change={dashboardStats.ordersGrowth}
          icon={ShoppingCart}
          index={1}
          gradient="green"
        />
        <StatCard
          title="Total Users"
          value={dashboardStats.totalUsers.toLocaleString()}
          change={dashboardStats.usersGrowth}
          icon={Users}
          index={2}
          gradient="purple"
        />
        <StatCard
          title="Total Products"
          value={dashboardStats.totalProducts.toLocaleString()}
          change={dashboardStats.productsGrowth}
          icon={Package}
          index={3}
          gradient="orange"
        />
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="text-center animate-fade-in" style={{ animationDelay: `${400 + index * 50}ms` }}>
            <stat.icon className={`${stat.color} mx-auto mb-2`} size={24} />
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Charts Grid - Enhanced with Animations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview - Animated Area Chart */}
        <Card className="animate-fade-in border-0 shadow-xl" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Sales Overview</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Revenue trends over time</p>
            </div>
            <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'currentColor', fontSize: 12 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis 
                tick={{ fill: 'currentColor', fontSize: 12 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  padding: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#0ea5e9" 
                fillOpacity={1} 
                fill="url(#colorSales)"
                strokeWidth={3}
                animationDuration={1500}
                animationBegin={0}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Orders & Users - Animated Line Chart */}
        <Card className="animate-fade-in border-0 shadow-xl" style={{ animationDelay: '700ms' }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Orders & Users</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Growth comparison</p>
            </div>
            <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'currentColor', fontSize: 12 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis 
                tick={{ fill: 'currentColor', fontSize: 12 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  padding: '12px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, strokeWidth: 2 }}
                animationDuration={1500}
                animationBegin={200}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, strokeWidth: 2 }}
                animationDuration={1500}
                animationBegin={400}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Section - Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Performance - Animated Bar Chart */}
        <Card className="lg:col-span-2 animate-fade-in border-0 shadow-xl" style={{ animationDelay: '800ms' }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Monthly Performance</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sales and orders breakdown</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'currentColor', fontSize: 12 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis 
                tick={{ fill: 'currentColor', fontSize: 12 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  padding: '12px'
                }}
              />
              <Legend />
              <Bar 
                dataKey="sales" 
                fill="#0ea5e9" 
                radius={[12, 12, 0, 0]} 
                animationDuration={1500}
                animationBegin={0}
              />
              <Bar 
                dataKey="orders" 
                fill="#10b981" 
                radius={[12, 12, 0, 0]} 
                animationDuration={1500}
                animationBegin={200}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Activity */}
        <Card className="animate-fade-in border-0 shadow-xl" style={{ animationDelay: '900ms' }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Recent Activity</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Latest transactions</p>
            </div>
            <ArrowUpRight className="text-gray-400" size={20} />
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {recentOrders.map((order, index) => (
              <RecentActivityItem key={order.id} order={order} index={index} />
            ))}
          </div>
        </Card>
      </div>

      {/* Top Products Section */}
      <Card className="animate-fade-in border-0 shadow-xl" style={{ animationDelay: '1000ms' }}>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Top Products</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Best performing items</p>
          </div>
          <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold flex items-center">
            View All
            <ArrowUpRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {topProducts.map((product, index) => (
            <TopProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Dashboard

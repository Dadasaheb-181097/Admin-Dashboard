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
  Zap,
  Target,
  Globe,
  CheckCircle2
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { salesData, dashboardStats, orders, products } from '../data/sampleData'
import Card from '../components/UI/Card'
import Badge from '../components/UI/Badge'
import ChartTooltip from '../components/Charts/ChartTooltip'
import ChartDefs from '../components/Charts/ChartDefs'
import { useChartTheme, chartColors } from '../components/Charts/useChartTheme'
import CountUp from 'react-countup'

const StatCard = ({ title, value, valueFormatter, change, icon: Icon, index, gradient }) => {
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
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 tabular-nums">
            <CountUp
              end={Number(value) || 0}
              duration={1.0}
              delay={index * 0.09}
              formattingFn={valueFormatter}
              preserveValue
            />
          </p>
          <div className="flex items-center">
            {isPositive ? (
              <div className="flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                <TrendingUp className="text-green-600 dark:text-green-400 mr-1" size={14} />
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                  +<CountUp end={Math.abs(change)} decimals={1} duration={0.9} delay={0.25 + index * 0.09} preserveValue />%
                </span>
              </div>
            ) : (
              <div className="flex items-center bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg">
                <TrendingDown className="text-red-600 dark:text-red-400 mr-1" size={14} />
                <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                  <CountUp end={Math.abs(change)} decimals={1} duration={0.9} delay={0.25 + index * 0.09} preserveValue />%
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
  const chart = useChartTheme()
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

  // Extra dashboard content (realistic “ops” snapshot)
  const trafficSources = [
    { name: 'Organic', value: 42, color: chartColors.primary },
    { name: 'Paid', value: 26, color: chartColors.violet },
    { name: 'Social', value: 18, color: chartColors.success },
    { name: 'Referral', value: 14, color: chartColors.amber },
  ]

  const funnelData = [
    { stage: 'Visited', value: 12000 },
    { stage: 'Added to Cart', value: 6400 },
    { stage: 'Checkout', value: 3200 },
    { stage: 'Paid', value: 2311 },
  ]

  const goals = [
    { label: 'Revenue Goal', current: 280000, target: 350000, color: 'bg-sky-500' },
    { label: 'Orders Goal', current: 911, target: 1200, color: 'bg-emerald-500' },
    { label: 'New Users', current: 328, target: 500, color: 'bg-violet-500' },
  ]

  const goalProgress = (current, target) => Math.min(100, Math.round((current / target) * 100))

  // Quick stats
  const quickStats = [
    {
      label: 'Avg Order Value',
      value: 305.5,
      decimals: 1,
      formatter: (v) => `$${v.toFixed(1)}`,
      icon: DollarSign,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Conversion Rate',
      value: 3.24,
      decimals: 2,
      formatter: (v) => `${v.toFixed(2)}%`,
      icon: Activity,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      label: 'Active Sessions',
      value: 1234,
      decimals: 0,
      formatter: (v) => v.toLocaleString(),
      icon: Zap,
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      label: 'Response Time',
      value: 0.8,
      decimals: 1,
      formatter: (v) => `${v.toFixed(1)}s`,
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-2">
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
          value={dashboardStats.totalRevenue}
          valueFormatter={(v) => formatCurrency(v)}
          change={dashboardStats.revenueGrowth}
          icon={DollarSign}
          index={0}
          gradient="blue"
        />
        <StatCard
          title="Total Orders"
          value={dashboardStats.totalOrders}
          valueFormatter={(v) => v.toLocaleString()}
          change={dashboardStats.ordersGrowth}
          icon={ShoppingCart}
          index={1}
          gradient="green"
        />
        <StatCard
          title="Total Users"
          value={dashboardStats.totalUsers}
          valueFormatter={(v) => v.toLocaleString()}
          change={dashboardStats.usersGrowth}
          icon={Users}
          index={2}
          gradient="purple"
        />
        <StatCard
          title="Total Products"
          value={dashboardStats.totalProducts}
          valueFormatter={(v) => v.toLocaleString()}
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
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100 tabular-nums">
              <CountUp
                end={Number(stat.value) || 0}
                duration={0.9}
                delay={0.45 + index * 0.08}
                decimals={stat.decimals ?? 0}
                formattingFn={stat.formatter}
                preserveValue
              />
            </p>
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
              <ChartDefs />
              <CartesianGrid {...chart.grid} />
              <XAxis dataKey="month" {...chart.axis} />
              <YAxis {...chart.axis} />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: chart.gridStroke, strokeWidth: 1 }} />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke={chartColors.primary}
                fillOpacity={1} 
                fill="url(#gradPrimary)"
                strokeWidth={3.25}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1600}
                animationEasing="ease-out"
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
              <CartesianGrid {...chart.grid} />
              <XAxis dataKey="month" {...chart.axis} />
              <YAxis {...chart.axis} />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: chart.gridStroke, strokeWidth: 1 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke={chartColors.success}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
                animationBegin={120}
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
                animationBegin={260}
                animationEasing="ease-out"
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

      {/* Business Intelligence Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Traffic Sources */}
        <Card className="animate-fade-in border-0 shadow-xl" style={{ animationDelay: '1100ms' }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Traffic Sources</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Where your visitors come from</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
              <Globe className="text-sky-600 dark:text-sky-400" size={20} />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={trafficSources}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={105}
                paddingAngle={3}
                cornerRadius={12}
                stroke={chart.isDark ? 'rgba(15,23,42,0.65)' : '#ffffff'}
                strokeWidth={2}
                animationDuration={1600}
                animationEasing="ease-out"
              >
                {trafficSources.map((entry, index) => (
                  <Cell key={`src-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip valueFormatter={(v) => `${v}%`} />} />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                <tspan x="50%" className="fill-gray-900 dark:fill-gray-100 text-[20px] font-bold">
                  100%
                </tspan>
                <tspan x="50%" dy="20" className="fill-gray-500 dark:fill-gray-400 text-[12px]">
                  Total traffic
                </tspan>
              </text>
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {trafficSources.map((s, idx) => {
              return (
              <div key={s.name} className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{s.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100 tabular-nums">
                  <CountUp end={s.value} duration={0.9} delay={1.2 + idx * 0.09} suffix="%" preserveValue />
                </span>
              </div>
            )})}
          </div>
        </Card>

        {/* Conversion Funnel */}
        <Card className="animate-fade-in border-0 shadow-xl" style={{ animationDelay: '1200ms' }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Conversion Funnel</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">From visit to payment</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
              <Target className="text-violet-600 dark:text-violet-400" size={20} />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={funnelData} layout="vertical" margin={{ top: 8, right: 16, left: 10, bottom: 8 }}>
              <ChartDefs />
              <CartesianGrid {...chart.grid} />
              <XAxis type="number" {...chart.axis} />
              <YAxis type="category" dataKey="stage" {...chart.axis} width={110} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: chart.isDark ? 'rgba(148,163,184,0.06)' : 'rgba(148,163,184,0.10)' }} />
              <Bar
                dataKey="value"
                fill="url(#gradPrimary)"
                radius={[10, 10, 10, 10]}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">Checkout → Paid</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100 tabular-nums">
                <CountUp
                  end={Math.round((funnelData[3].value / funnelData[2].value) * 100)}
                  duration={0.9}
                  delay={1.3}
                  suffix="%"
                  preserveValue
                />
              </p>
            </div>
            <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">Visit → Paid</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100 tabular-nums">
                <CountUp
                  end={Math.round((funnelData[3].value / funnelData[0].value) * 100)}
                  duration={0.9}
                  delay={1.38}
                  suffix="%"
                  preserveValue
                />
              </p>
            </div>
          </div>
        </Card>

        {/* Goals & Insights */}
        <Card className="animate-fade-in border-0 shadow-xl" style={{ animationDelay: '1300ms' }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Goals & Insights</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track targets & quick wins</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={20} />
            </div>
          </div>

          <div className="space-y-5">
            {goals.map((g) => {
              const pct = goalProgress(g.current, g.target)
              return (
                <div key={g.label}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{g.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 tabular-nums">
                      {pct}%
                    </p>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <div className={`h-full ${g.color}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                    <span>
                      <CountUp end={g.current} duration={1.0} delay={1.35} separator="," preserveValue />
                    </span>
                    <span>
                      <CountUp end={g.target} duration={1.0} delay={1.45} separator="," preserveValue />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Today’s insights</p>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Revenue pacing is strong</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">You’re trending above last month by +12.5%.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-amber-500" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Low stock needs attention</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">2 products are close to the threshold.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-sky-500" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Organic traffic leads</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Organic contributes ~42% of total visits.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

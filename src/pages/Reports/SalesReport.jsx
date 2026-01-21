/**
 * Sales Report Page
 */
import { TrendingUp, DollarSign, ShoppingCart, Calendar } from 'lucide-react'
import Card from '../../components/UI/Card'
import Badge from '../../components/UI/Badge'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const salesData = [
  { date: 'Week 1', sales: 12000, target: 15000 },
  { date: 'Week 2', sales: 19000, target: 15000 },
  { date: 'Week 3', sales: 15000, target: 15000 },
  { date: 'Week 4', sales: 22000, target: 15000 },
]

const topProducts = [
  { name: 'Wireless Headphones', sales: 245, revenue: 36750 },
  { name: 'Smart Watch', sales: 189, revenue: 56700 },
  { name: 'Laptop Stand', sales: 312, revenue: 15600 },
  { name: 'USB-C Cable', sales: 456, revenue: 9120 },
  { name: 'Mouse Pad', sales: 278, revenue: 5560 },
]

function SalesReport() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$68,000</p>
              <Badge variant="success" className="mt-2">+15.2%</Badge>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$305.5</p>
              <Badge variant="info" className="mt-2">+5.1%</Badge>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <DollarSign className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">223</p>
              <Badge variant="success" className="mt-2">+8.3%</Badge>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <ShoppingCart className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sales Performance</h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={16} className="mr-2" />
            Last 4 Weeks
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis dataKey="date" className="text-gray-600 dark:text-gray-400" />
            <YAxis className="text-gray-600 dark:text-gray-400" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--tw-color-gray-800)', 
                border: '1px solid var(--tw-color-gray-700)',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#0ea5e9" 
              fillOpacity={1}
              fill="url(#colorSales)"
              name="Actual Sales"
              animationDuration={1000}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#10b981" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target"
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Products */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Product</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Sales</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{product.name}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">{product.sales}</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold text-gray-900 dark:text-gray-100">${product.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default SalesReport

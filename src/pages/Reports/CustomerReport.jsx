/**
 * Customer Report Page
 */
import { Users, UserPlus, TrendingUp, Award } from 'lucide-react'
import Card from '../../components/UI/Card'
import Badge from '../../components/UI/Badge'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const customerData = [
  { month: 'Jan', new: 45, returning: 120 },
  { month: 'Feb', new: 52, returning: 135 },
  { month: 'Mar', new: 38, returning: 142 },
  { month: 'Apr', new: 61, returning: 158 },
  { month: 'May', new: 55, returning: 165 },
  { month: 'Jun', new: 72, returning: 180 },
]

const customerSegments = [
  { name: 'VIP', value: 25, color: '#0ea5e9' },
  { name: 'Regular', value: 45, color: '#10b981' },
  { name: 'New', value: 30, color: '#f59e0b' },
]

const topCustomers = [
  { name: 'John Doe', email: 'john@example.com', orders: 45, spent: 12500, status: 'VIP' },
  { name: 'Jane Smith', email: 'jane@example.com', orders: 38, spent: 9800, status: 'VIP' },
  { name: 'Mike Johnson', email: 'mike@example.com', orders: 32, spent: 7600, status: 'Regular' },
  { name: 'Sarah Williams', email: 'sarah@example.com', orders: 28, spent: 6400, status: 'Regular' },
  { name: 'David Brown', email: 'david@example.com', orders: 22, spent: 5200, status: 'New' },
]

function CustomerReport() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,248</p>
              <Badge variant="success" className="mt-2">+12.5%</Badge>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Users className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">New Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">323</p>
              <Badge variant="info" className="mt-2">+18.2%</Badge>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <UserPlus className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Returning</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">925</p>
              <Badge variant="success" className="mt-2">+8.7%</Badge>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">VIP Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">312</p>
              <Badge variant="purple" className="mt-2">+5.3%</Badge>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Award className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Customer Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--tw-color-gray-800)', 
                  border: '1px solid var(--tw-color-gray-700)',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Bar 
                dataKey="new" 
                fill="#0ea5e9" 
                name="New Customers"
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              />
              <Bar 
                dataKey="returning" 
                fill="#10b981" 
                name="Returning Customers"
                radius={[8, 8, 0, 0]}
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Customer Segments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerSegments}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
              >
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--tw-color-gray-800)', 
                  border: '1px solid var(--tw-color-gray-700)',
                  borderRadius: '8px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Customers */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Customers</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Orders</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Total Spent</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((customer, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{customer.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{customer.email}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">{customer.orders}</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold text-gray-900 dark:text-gray-100">${customer.spent.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant={customer.status === 'VIP' ? 'purple' : customer.status === 'Regular' ? 'info' : 'default'}>
                      {customer.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default CustomerReport

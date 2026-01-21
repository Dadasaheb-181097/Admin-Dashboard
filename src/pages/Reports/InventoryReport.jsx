/**
 * Inventory Report Page
 */
import { Package, AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react'
import Card from '../../components/UI/Card'
import Badge from '../../components/UI/Badge'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import ChartTooltip from '../../components/Charts/ChartTooltip'
import ChartDefs from '../../components/Charts/ChartDefs'
import { useChartTheme, chartColors } from '../../components/Charts/useChartTheme'

const inventoryData = [
  { category: 'Electronics', inStock: 450, lowStock: 25, outOfStock: 5 },
  { category: 'Accessories', inStock: 320, lowStock: 18, outOfStock: 2 },
  { category: 'Clothing', inStock: 280, lowStock: 15, outOfStock: 8 },
  { category: 'Home & Living', inStock: 195, lowStock: 12, outOfStock: 3 },
  { category: 'Sports', inStock: 145, lowStock: 8, outOfStock: 1 },
]

const stockMovement = [
  { month: 'Jan', incoming: 120, outgoing: 95 },
  { month: 'Feb', incoming: 135, outgoing: 110 },
  { month: 'Mar', incoming: 110, outgoing: 125 },
  { month: 'Apr', incoming: 145, outgoing: 130 },
  { month: 'May', incoming: 130, outgoing: 140 },
  { month: 'Jun', incoming: 155, outgoing: 135 },
]

const lowStockItems = [
  { name: 'Wireless Mouse', current: 8, min: 20, category: 'Electronics' },
  { name: 'USB-C Adapter', current: 12, min: 25, category: 'Accessories' },
  { name: 'Laptop Sleeve', current: 15, min: 30, category: 'Accessories' },
  { name: 'Desk Lamp', current: 5, min: 15, category: 'Home & Living' },
  { name: 'Yoga Mat', current: 10, min: 20, category: 'Sports' },
]

function InventoryReport() {
  const chart = useChartTheme()
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Items</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,390</p>
              <Badge variant="info" className="mt-2">+5.2%</Badge>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Package className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">In Stock</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,320</p>
              <Badge variant="success" className="mt-2">94.9%</Badge>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Low Stock</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">78</p>
              <Badge variant="warning" className="mt-2">5.6%</Badge>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <AlertTriangle className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">19</p>
              <Badge variant="danger" className="mt-2">1.4%</Badge>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <TrendingDown className="text-red-600 dark:text-red-400" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Stock by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData}>
              <ChartDefs />
              <CartesianGrid {...chart.grid} />
              <XAxis dataKey="category" {...chart.axis} angle={-35} textAnchor="end" height={70} />
              <YAxis {...chart.axis} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: chart.isDark ? 'rgba(148,163,184,0.06)' : 'rgba(148,163,184,0.10)' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar 
                dataKey="inStock" 
                fill="url(#gradSuccess)" 
                name="In Stock"
                radius={[10, 10, 2, 2]}
                animationDuration={1300}
                animationEasing="ease-out"
              />
              <Bar 
                dataKey="lowStock" 
                fill="url(#gradAmber)" 
                name="Low Stock"
                radius={[10, 10, 2, 2]}
                animationDuration={1300}
                animationBegin={140}
                animationEasing="ease-out"
              />
              <Bar 
                dataKey="outOfStock" 
                fill="url(#gradRose)" 
                name="Out of Stock"
                radius={[10, 10, 2, 2]}
                animationDuration={1300}
                animationBegin={280}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Stock Movement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockMovement}>
              <CartesianGrid {...chart.grid} />
              <XAxis dataKey="month" {...chart.axis} />
              <YAxis {...chart.axis} />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: chart.gridStroke, strokeWidth: 1 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line 
                type="monotone" 
                dataKey="incoming" 
                stroke={chartColors.success}
                strokeWidth={3}
                name="Incoming"
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1400}
                animationEasing="ease-out"
              />
              <Line 
                type="monotone" 
                dataKey="outgoing" 
                stroke={chartColors.rose}
                strokeWidth={3}
                name="Outgoing"
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1400}
                animationBegin={140}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Low Stock Items */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Low Stock Alert</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Product</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Category</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Current Stock</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Min Required</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{item.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{item.category}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">{item.current}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">{item.min}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant="warning">Low Stock</Badge>
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

export default InventoryReport

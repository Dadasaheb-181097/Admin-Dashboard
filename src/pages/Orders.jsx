/**
 * Orders Management Page
 * Features filter modal and order details drawer
 */
import { useState } from 'react'
import { Search, Filter, Download, Eye, Calendar, User, Package, DollarSign, MapPin, Truck } from 'lucide-react'
import { orders } from '../data/sampleData'
import Modal from '../components/UI/Modal'
import Drawer from '../components/UI/Drawer'
import Button from '../components/UI/Button'
import Badge from '../components/UI/Badge'
import Card from '../components/UI/Card'

function Orders() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filters, setFilters] = useState({
    status: 'All',
    dateRange: 'All',
    minAmount: '',
    maxAmount: '',
  })

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setIsDrawerOpen(true)
  }

  const handleApplyFilters = () => {
    // Apply filters logic here
    console.log('Filters applied:', filters)
    setIsFilterModalOpen(false)
  }

  const getStatusBadge = (status) => {
    const variants = {
      'Completed': 'success',
      'Processing': 'info',
      'Pending': 'warning',
      'Cancelled': 'danger',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  const totalRevenue = orders
    .filter(o => o.status === 'Completed')
    .reduce((sum, order) => sum + order.amount, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">View and manage all customer orders</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={() => setIsFilterModalOpen(true)} className="flex items-center">
            <Filter size={20} className="mr-2" />
            Filter
          </Button>
          <Button variant="secondary" className="flex items-center">
            <Download size={20} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="animate-scale-in" style={{ animationDelay: '0ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{orders.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
              <span className="text-primary-600 dark:text-primary-400 font-bold text-xl">O</span>
            </div>
          </div>
        </Card>
        <Card className="animate-scale-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                {orders.filter(o => o.status === 'Completed').length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
              <span className="text-green-600 dark:text-green-400 font-bold text-xl">✓</span>
            </div>
          </div>
        </Card>
        <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Processing</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                {orders.filter(o => o.status === 'Processing').length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">P</span>
            </div>
          </div>
        </Card>
        <Card className="animate-scale-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-xl">$</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search orders by ID, customer, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{order.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 dark:text-gray-400">{order.product}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">${order.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleViewOrder(order)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Filter Modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter Orders"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option>All</option>
              <option>Completed</option>
              <option>Processing</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option>All</option>
              <option>Today</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Min Amount ($)
              </label>
              <input
                type="number"
                value={filters.minAmount}
                onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Max Amount ($)
              </label>
              <input
                type="number"
                value={filters.maxAmount}
                onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                placeholder="10000"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => {
              setFilters({ status: 'All', dateRange: 'All', minAmount: '', maxAmount: '' })
              setIsFilterModalOpen(false)
            }}>
              Reset
            </Button>
            <Button variant="primary" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>

      {/* Order Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Order Details"
        position="right"
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Header */}
            <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                {selectedOrder.id.slice(-2)}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedOrder.id}</h3>
              <div className="mt-3">{getStatusBadge(selectedOrder.status)}</div>
            </div>

            {/* Order Information */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-3">
                  <DollarSign className="text-blue-600 dark:text-blue-400" size={24} />
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Order Amount</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      ${selectedOrder.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center space-x-3 mb-2">
                    <User className="text-gray-400" size={20} />
                    <p className="text-xs text-gray-500 dark:text-gray-400">Customer</p>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{selectedOrder.customer}</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center space-x-3 mb-2">
                    <Package className="text-gray-400" size={20} />
                    <p className="text-xs text-gray-500 dark:text-gray-400">Product</p>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{selectedOrder.product}</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center space-x-3 mb-2">
                    <Calendar className="text-gray-400" size={20} />
                    <p className="text-xs text-gray-500 dark:text-gray-400">Order Date</p>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {new Date(selectedOrder.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Timeline</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Order Placed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                  </div>
                </div>
                {selectedOrder.status === 'Completed' && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Order Completed</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Delivered successfully</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3">
                <Button variant="primary" className="flex-1">
                  <Truck size={18} className="mr-2" />
                  Track Order
                </Button>
                <Button variant="secondary" className="flex-1">
                  <Download size={18} className="mr-2" />
                  Download Invoice
                </Button>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}

export default Orders

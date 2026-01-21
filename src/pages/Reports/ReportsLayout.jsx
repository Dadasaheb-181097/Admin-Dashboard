/**
 * Reports Layout Component
 * Handles nested routing for Reports section
 */
import { Outlet, NavLink } from 'react-router-dom'
import { FileText, TrendingUp, Users, Package } from 'lucide-react'

const reportSubRoutes = [
  { path: '/reports/overview', icon: FileText, label: 'Overview' },
  { path: '/reports/sales', icon: TrendingUp, label: 'Sales Report' },
  { path: '/reports/customers', icon: Users, label: 'Customer Report' },
  { path: '/reports/inventory', icon: Package, label: 'Inventory Report' },
]

function ReportsLayout() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">View detailed reports and analytics</p>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-1 overflow-x-auto">
          {reportSubRoutes.map((route) => {
            const Icon = route.icon
            return (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-semibold'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                  }`
                }
              >
                <Icon size={18} className="mr-2" />
                <span>{route.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Sub-route Content */}
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default ReportsLayout

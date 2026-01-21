import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Sidebar from './Sidebar'
import Header from './Header'

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true) // Mobile sidebar open/close
  const [sidebarCollapsed, setSidebarCollapsed] = useState('expanded') // 'expanded' | 'collapsed' | 'minimal'
  const location = useLocation()

  const breadcrumbs = useMemo(() => {
    const segmentLabel = {
      users: 'Users',
      products: 'Products',
      orders: 'Orders',
      analytics: 'Analytics',
      settings: 'Settings',
      reports: 'Reports',
      overview: 'Overview',
      sales: 'Sales Report',
      customers: 'Customer Report',
      inventory: 'Inventory Report',
      management: 'Management',
      categories: 'Categories',
      brands: 'Brands',
      coupons: 'Coupons',
      reviews: 'Reviews',
    }

    const prettify = (seg) =>
      (seg || '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (m) => m.toUpperCase())

    const parts = (location.pathname || '/').split('/').filter(Boolean)

    const crumbs = [{ label: 'Dashboard', path: '/' }]
    let acc = ''
    for (const seg of parts) {
      acc += `/${seg}`
      crumbs.push({
        label: segmentLabel[seg] || prettify(seg),
        path: acc,
      })
    }
    return crumbs
  }, [location.pathname])

  const showBreadcrumbs = location.pathname !== '/'

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          setSidebarOpen={setSidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
          {showBreadcrumbs && (
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1
                return (
                  <span key={crumb.path} className="flex items-center">
                    {idx > 0 && <ChevronRight size={16} className="mx-2 text-gray-400 dark:text-gray-600" />}
                    {isLast ? (
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{crumb.label}</span>
                    ) : (
                      <Link
                        to={crumb.path}
                        className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </span>
                )
              })}
            </nav>
          )}
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout

import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  FileText,
  Settings2,
  Folder,
  Tag,
  Ticket,
  Star,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react'

const mainMenuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/users', icon: Users, label: 'Users' },
  { path: '/products', icon: Package, label: 'Products' },
  { path: '/orders', icon: ShoppingCart, label: 'Orders' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/reports/overview', icon: FileText, label: 'Reports' },
  { 
    path: '/management', 
    icon: Settings2, 
    label: 'Management',
    subItems: [
      { path: '/management/categories', icon: Folder, label: 'Categories' },
      { path: '/management/brands', icon: Tag, label: 'Brands' },
      { path: '/management/coupons', icon: Ticket, label: 'Coupons' },
      { path: '/management/reviews', icon: Star, label: 'Reviews' },
    ]
  },
]

const settingsMenuItems = [
  { path: '/settings', icon: Settings, label: 'Settings' },
]

// Combined menu items for sub-route checking
const allMenuItems = mainMenuItems.concat(settingsMenuItems)

function Sidebar({ isOpen, setIsOpen, collapsed, setCollapsed }) {
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState(() => {
    // Auto-expand if current path matches any sub-route
    const path = location.pathname
    const expanded = {}
    allMenuItems.forEach(item => {
      if (item.subItems) {
        const isActive = item.subItems.some(subItem => path.startsWith(subItem.path))
        if (isActive) {
          expanded[item.path] = true
        }
      }
    })
    return expanded
  })
  const [hoveredItem, setHoveredItem] = useState(null)
  const [hoverExpand, setHoverExpand] = useState(false)

  // Auto-expand when navigating to sub-routes
  useEffect(() => {
    const path = location.pathname
    allMenuItems.forEach(item => {
      if (item.subItems) {
        const isActive = item.subItems.some(subItem => path.startsWith(subItem.path))
        if (isActive && !expandedItems[item.path]) {
          setExpandedItems(prev => ({
            ...prev,
            [item.path]: true
          }))
        }
      }
    })
  }, [location.pathname, expandedItems])

  const toggleExpand = (path) => {
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }))
  }

  const toggleCollapse = () => {
    if (collapsed === 'expanded') {
      setCollapsed('collapsed')
    } else if (collapsed === 'collapsed') {
      setCollapsed('minimal')
    } else {
      setCollapsed('expanded')
    }
  }

  // Sidebar width based on state (desktop only)
  const sidebarWidthLg = {
    expanded: 'lg:w-64',
    collapsed: 'lg:w-20',
    minimal: 'lg:w-0'
  }

  const isCollapsed = collapsed === 'collapsed'
  const isMinimal = collapsed === 'minimal'
  const isExpanded = collapsed === 'expanded'
  
  // Check if mobile - use state to avoid SSR issues
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // When partially collapsed on desktop, hover should overlay-expand the sidebar
  const isHoverExpanded = !isMobile && isCollapsed && hoverExpand

  // On mobile, always show full width when open
  const effectiveExpanded = isMobile && isOpen ? true : (isExpanded || isHoverExpanded)
  const showTooltips = isCollapsed && !isHoverExpanded

  useEffect(() => {
    if (!isCollapsed) setHoverExpand(false)
  }, [isCollapsed])

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar (desktop reserves width; hover expands as overlay) */}
      <div className={`relative flex-shrink-0 h-full w-0 ${sidebarWidthLg[collapsed]}`}>
        <aside
          onMouseEnter={() => {
            if (!isMobile && isCollapsed) setHoverExpand(true)
          }}
          onMouseLeave={() => {
            if (!isMobile && isCollapsed) {
              setHoverExpand(false)
              setHoveredItem(null)
            }
          }}
          className={`
            fixed lg:absolute inset-y-0 left-0 ${isHoverExpanded ? 'z-50' : 'z-30'}
            w-64 ${isHoverExpanded ? 'lg:w-64' : sidebarWidthLg[collapsed]}
            bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl
            transform transition-all duration-300 ease-in-out
            border-r border-gray-200 dark:border-gray-700
            flex flex-col h-full
            overflow-hidden
            ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
        {/* Header - Fixed at top */}
        <div className={`flex items-center gap-2 h-16 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 transition-all duration-300 
        ${
          effectiveExpanded ? 'px-6' : isCollapsed ? 'px-3 justify-center' : 'px-0'
        }`}>
          {!isMinimal && (
            <>
              {effectiveExpanded ? (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500 dark:bg-primary-600 flex items-center justify-center text-white shadow-md">
                    <LayoutDashboard size={24} />
                  </div>
                  <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400 whitespace-nowrap">
                    Admin Panel
                  </h1>
                </div>
                // null
              ) : (
                <div className="w-8 h-8 rounded-lg bg-primary-500 dark:bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
                  <LayoutDashboard size={20} />
                </div>
                // null
              )}
              {/* Mobile Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={24} />
              </button>
            </>
          )}
        </div>

        {/* Navigation - Scrollable */}
        {!isMinimal && (
          <nav className={`flex-1 overflow-y-auto overflow-x-hidden pb-4 transition-all duration-300 ${
            effectiveExpanded ? 'mt-8 px-4' : 'mt-4 px-2'
          }`}>
            {/* Section Title - Only in expanded state */}
            {effectiveExpanded && (
              <div className="px-4 mb-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  MAIN MENU
                </p>
              </div>
            )}

            {mainMenuItems.map((item, index) => {
              const Icon = item.icon
              // Special handling for Reports to highlight when any sub-route is active
              const isReports = item.path.startsWith('/reports')
              const isReportsActive = isReports && location.pathname.startsWith('/reports')
              
              // Check if item has sub-items (collapsible)
              const hasSubItems = item.subItems && item.subItems.length > 0
              const isItemExpanded = expandedItems[item.path] || false
              const isManagementActive = item.path === '/management' && location.pathname.startsWith('/management')
              const isItemActive = location.pathname === item.path || isReportsActive || isManagementActive

              if (hasSubItems) {
                return (
                  <div 
                    key={item.path} 
                    className="mb-2 relative"
                    onMouseEnter={() => showTooltips && setHoveredItem(item.path)}
                    onMouseLeave={() => showTooltips && setHoveredItem(null)}
                  >
                    {/* Tooltip for collapsed state */}
                    {showTooltips && hoveredItem === item.path && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap animate-fade-in">
                        {item.label}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                      </div>
                    )}

                    {/* Main Menu Item - Collapsible */}
                    <button
                      onClick={() => {
                        if (isCollapsed && !isHoverExpanded) {
                          setCollapsed('expanded')
                        } else {
                          toggleExpand(item.path)
                        }
                      }}
                      className={`w-full flex items-center gap-2 rounded-lg transition-all duration-200 group ${
                        effectiveExpanded ? 'px-4 py-3' : 'px-3 py-3 justify-center'
                      } ${
                        isManagementActive
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold shadow-sm scale-100'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-105'
                      }`}
                    >
                    <div className={`flex items-center ${effectiveExpanded ? '' : 'justify-center'}`}>
                      <Icon size={20} className={effectiveExpanded ? 'mr-3' : ''} />
                      {effectiveExpanded && <span>{item.label}</span>}
                    </div>
                    {effectiveExpanded && (
                        isItemExpanded ? (
                          <ChevronDown size={18} className="transition-transform duration-200" />
                        ) : (
                          <ChevronRight size={18} className="transition-transform duration-200" />
                        )
                      )}
                    </button>

                    {/* Sub-items - Animated Dropdown - Only in expanded state */}
                    {effectiveExpanded && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isItemExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="ml-4 mt-1 space-y-1 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                          {item.subItems.map((subItem) => {
                            const SubIcon = subItem.icon
                            return (
                              <NavLink
                                key={subItem.path}
                                to={subItem.path}
                                className={({ isActive }) =>
                                  `flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                                    isActive
                                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold'
                                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                  }`
                                }
                                onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                              >
                                <SubIcon size={16} className="mr-3" />
                                <span>{subItem.label}</span>
                              </NavLink>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              // Regular menu item (non-collapsible)
              return (
                <div
                  key={item.path}
                  className="mb-2 relative"
                  onMouseEnter={() => showTooltips && setHoveredItem(item.path)}
                  onMouseLeave={() => showTooltips && setHoveredItem(null)}
                >
                  {/* Tooltip for collapsed state */}
                  {showTooltips && hoveredItem === item.path && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap animate-fade-in">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                    </div>
                  )}

                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center rounded-lg transition-all duration-200 group ${
                        effectiveExpanded ? 'px-4 py-3' : 'px-3 py-3 justify-center'
                      } ${
                        isActive || isReportsActive
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold shadow-sm scale-100'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-105'
                      }`
                    }
                    onClick={() => {
                      if (isMobile) setIsOpen(false)
                      if (isCollapsed && !isMobile && !isHoverExpanded) setCollapsed('expanded')
                    }}
                  >
                    <Icon size={20} className={effectiveExpanded ? 'mr-3' : ''} />
                    {effectiveExpanded && <span>{item.label}</span>}
                  </NavLink>
                </div>
              )
            })}

            {/* Settings Section Title - Only in expanded state */}
            {effectiveExpanded && (
              <div className="px-4 mt-6 mb-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  SETTINGS
                </p>
              </div>
            )}

            {/* Settings Menu Items */}
            {settingsMenuItems.map((item, index) => {
              const Icon = item.icon
              const isItemActive = location.pathname === item.path

              return (
                <div
                  key={item.path}
                  className="mb-2 relative"
                  onMouseEnter={() => showTooltips && setHoveredItem(item.path)}
                  onMouseLeave={() => showTooltips && setHoveredItem(null)}
                >
                  {/* Tooltip for collapsed state */}
                  {showTooltips && hoveredItem === item.path && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap animate-fade-in">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                    </div>
                  )}

                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center rounded-lg transition-all duration-200 group ${
                        effectiveExpanded ? 'px-4 py-3' : 'px-3 py-3 justify-center'
                      } ${
                        isActive
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold shadow-sm scale-100'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-105'
                      }`
                    }
                    onClick={() => {
                      if (isMobile) setIsOpen(false)
                      if (isCollapsed && !isMobile && !isHoverExpanded) setCollapsed('expanded')
                    }}
                  >
                    <Icon size={20} className={effectiveExpanded ? 'mr-3' : ''} />
                    {effectiveExpanded && <span>{item.label}</span>}
                  </NavLink>
                </div>
              )
            })}
          </nav>
        )}

        {/* Footer - Fixed at bottom */}
        {!isMinimal && (
          <div className={`flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 transition-all duration-300 ${
            effectiveExpanded ? 'p-4' : 'p-2'
          }`}>
            <div className={`flex items-center ${effectiveExpanded ? 'px-4' : 'justify-center'}`}>
              <div className="w-10 h-10 rounded-full bg-primary-500 dark:bg-primary-600 flex items-center justify-center text-white text-xs font-semibold shadow-md flex-shrink-0">
                DP
              </div>
              {effectiveExpanded && (
                <div className="ml-3 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">Dadaso Patil</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">dadasaheb181097@gmail.com</p>
                </div>
              )}
            </div>
          </div>
        )}
        </aside>
      </div>
    </>
  )
}

export default Sidebar

import { Menu, Bell, Search, Sun, Moon, User, LogOut, Settings, Mail, Phone, ShoppingCart, Package, CheckCircle, AlertCircle, Info, PanelLeftOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import Drawer from '../UI/Drawer'
import Badge from '../UI/Badge'

function Header({ setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) {
  const [notifications] = useState(5)
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false)
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // Sample notifications data
  const notificationList = [
    { id: 1, type: 'order', title: 'New Order Received', message: 'Order #1234 has been placed', time: '2 minutes ago', unread: true, icon: ShoppingCart },
    { id: 2, type: 'product', title: 'Low Stock Alert', message: 'Wireless Mouse is running low (8 items left)', time: '15 minutes ago', unread: true, icon: Package },
    { id: 3, type: 'success', title: 'Payment Received', message: 'Payment of $1,250.00 has been received', time: '1 hour ago', unread: true, icon: CheckCircle },
    { id: 4, type: 'info', title: 'System Update', message: 'Dashboard analytics have been updated', time: '3 hours ago', unread: false, icon: Info },
    { id: 5, type: 'warning', title: 'Review Pending', message: '5 new product reviews are awaiting approval', time: '5 hours ago', unread: false, icon: AlertCircle },
  ]

  const unreadCount = notificationList.filter(n => n.unread).length

  const isCollapsed = sidebarCollapsed === 'collapsed'
  const isMinimal = sidebarCollapsed === 'minimal'
  const isExpanded = sidebarCollapsed === 'expanded'

  const toggleSidebar = () => {
    if (sidebarCollapsed === 'expanded') {
      setSidebarCollapsed('collapsed')
    } else if (sidebarCollapsed === 'collapsed') {
      setSidebarCollapsed('minimal')
    } else {
      setSidebarCollapsed('expanded')
    }
  }

  return (
    <header className="relative z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-6 transition-colors duration-200">
      <div className="flex items-center space-x-2">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu size={24} />
        </button>

        {/* Desktop Sidebar Toggle - Always show on desktop */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex items-center justify-center p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 group"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
          ) : isMinimal ? (
            <PanelLeftOpen size={20} className="group-hover:scale-110 transition-transform" />
          ) : (
            <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>
        </div>

        {/* User Profile */}
        <button
          onClick={() => setIsProfileDrawerOpen(true)}
          className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg px-2 py-1 transition-colors"
          aria-label="User Profile"
        >
          <div className="w-8 h-8 rounded-full bg-primary-500 dark:bg-primary-600 flex items-center justify-center text-white text-xs font-semibold shadow-md">
            DP
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Dadaso Patil</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
          </div>
        </button>
      </div>

      {/* Notification Drawer */}
      <Drawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        title="Notifications"
        size="md"
        position="right"
      >
        <div className="space-y-4">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
            {unreadCount > 0 && (
              <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notificationList.map((notification) => {
              const Icon = notification.icon
              const iconColors = {
                order: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
                product: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30',
                success: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
                warning: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30',
                info: 'text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30',
              }
              
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                    notification.unread
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColors[notification.type] || iconColors.info}`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-semibold mb-1 ${notification.unread ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 flex-shrink-0 ml-2"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* View All Link */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full text-center text-sm text-primary-600 dark:text-primary-400 hover:underline py-2">
              View all notifications
            </button>
          </div>
        </div>
      </Drawer>

      {/* Profile Drawer */}
      <Drawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
        title="Profile"
        size="md"
        position="right"
      >
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
              DP
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Dadaso Patil</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">dadasaheb181097@gmail.com</p>
            <Badge variant="info">Administrator</Badge>
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                Account Information
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <User size={18} className="text-gray-400 dark:text-gray-500 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Full Name</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Dadaso Patil</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <Mail size={18} className="text-gray-400 dark:text-gray-500 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Email</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">dadasaheb181097@gmail.com</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <Phone size={18} className="text-gray-400 dark:text-gray-500 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Mobile</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">7057986041</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <Settings size={18} className="text-gray-400 dark:text-gray-500 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Role</span>
                  </div>
                  <Badge variant="info">Administrator</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
              Quick Actions
            </label>
            <div className="space-y-2">
              <button className="w-full flex items-center px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Settings size={18} className="mr-3 text-gray-400 dark:text-gray-500" />
                <span>Account Settings</span>
              </button>
              <button className="w-full flex items-center px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <User size={18} className="mr-3 text-gray-400 dark:text-gray-500" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
              <LogOut size={18} className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </Drawer>
    </header>
  )
}

export default Header

import { Menu, Bell, Search, Sun, Moon, User, LogOut, Settings, Mail, Phone, ShoppingCart, Package, CheckCircle, AlertCircle, Info, PanelLeftOpen, PanelLeftClose, ChevronsLeft, BarChart3, DollarSign, ClipboardCheck, XCircle, Clock } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import Drawer from '../UI/Drawer'
import Badge from '../UI/Badge'
import { useNavigate } from 'react-router-dom'

function Header({ setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) {
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false)
  const [isSnapshotOpen, setIsSnapshotOpen] = useState(false)
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const snapshotRef = useRef(null)
  const navigate = useNavigate()
  // Sample notifications data
  const [notificationFilter, setNotificationFilter] = useState('all') // all | system | finance | operations
  const [notificationList, setNotificationList] = useState([
    // Required examples
    { id: 1, category: 'operations', type: 'success', title: 'Order delivered', message: 'Order #1842 was delivered successfully', time: '2 min ago', unread: true, icon: CheckCircle },
    { id: 2, category: 'finance', type: 'success', title: 'Payment received', message: 'Invoice #123 payment received (₹12,500)', time: '12 min ago', unread: true, icon: ShoppingCart },
    { id: 3, category: 'operations', type: 'product', title: 'Low stock alert', message: 'Packaging boxes low (only 8 left)', time: '38 min ago', unread: true, icon: Package },
    { id: 4, category: 'system', type: 'warning', title: 'Approval pending', message: '5 product reviews awaiting approval', time: '1 hr ago', unread: false, icon: AlertCircle },
    // A few extra “alive” items
    { id: 5, category: 'system', type: 'info', title: 'System update', message: 'Analytics widgets refreshed', time: '3 hrs ago', unread: false, icon: Info },
  ])

  const recentActivity = useMemo(() => ({
    system: [
      { id: 'a1', message: 'User Rohan updated warehouse settings', time: '5 min ago' },
      { id: 'a2', message: 'Invoice #123 paid', time: '12 min ago' },
      { id: 'a3', message: 'User Sneha changed coupon rules', time: '2 hrs ago' },
    ],
  }), [])

  const unreadCount = useMemo(() => notificationList.filter((n) => n.unread).length, [notificationList])
  const filteredNotifications = useMemo(() => {
    if (notificationFilter === 'all') return notificationList
    return notificationList.filter((n) => n.category === notificationFilter)
  }, [notificationFilter, notificationList])

  const todaysSnapshot = useMemo(() => {
    // Dummy “live” stats (replace later with real API/data)
    return {
      revenueToday: '₹48,320',
      ordersToday: 128,
      pendingApprovals: 7,
      failedPayments: 3,
    }
  }, [])

  const [now, setNow] = useState(() => new Date())
  const dateLabel = useMemo(() => {
    return new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: '2-digit', month: 'short' }).format(now)
  }, [now])
  const timeLabel = useMemo(() => {
    return new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(now)
  }, [now])

  useEffect(() => {
    // Update every 30s (keeps time accurate without constant rerenders)
    const t = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!isSnapshotOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsSnapshotOpen(false)
    }

    const onMouseDown = (e) => {
      const el = snapshotRef.current
      if (!el) return
      if (!el.contains(e.target)) setIsSnapshotOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onMouseDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [isSnapshotOpen])

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
          className="hidden lg:flex items-center justify-center p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 group"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded && <ChevronsLeft size={20} className="group-hover:scale-110 transition-transform" />}
          {isCollapsed && <PanelLeftClose size={20} className="group-hover:scale-110 transition-transform" />}
          {isMinimal && <PanelLeftOpen size={20} className="group-hover:scale-110 transition-transform" />}
        </button>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 pl-11 pr-4 text-sm border border-gray-300 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-700/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      {/* Display today's date with time */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200">
        <Clock size={16} className="text-gray-400 dark:text-gray-500" />
        <span className="text-sm font-semibold">{dateLabel}</span>
        <span className="text-gray-300 dark:text-gray-600">•</span>
        <span className="text-sm tabular-nums">{timeLabel}</span>
      </div>

      <div className="flex items-center space-x-2">
        {/* Business Insights (Quick Stats) */}
        <div className="relative" ref={snapshotRef}>
          <button
            onClick={() => setIsSnapshotOpen((v) => !v)}
            className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
              isSnapshotOpen
                ? 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
            aria-label="Today's snapshot"
            aria-expanded={isSnapshotOpen}
          >
            <BarChart3 size={18} className="text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-semibold">Today</span>
          </button>

          {isSnapshotOpen && (
            <div className="absolute right-0 mt-2 w-[360px] max-w-[90vw] z-[70] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl overflow-hidden animate-fade-in">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/60">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Today’s Snapshot</p>
                    {/* <p className="text-xs text-gray-600 dark:text-gray-400">Small but powerful quick stats</p> */}
                  </div>
                  <button
                    className="text-xs font-semibold text-gray-600 dark:text-gray-300 hover:underline"
                    onClick={() => setIsSnapshotOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="p-4 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                    <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <DollarSign size={16} className="text-green-700 dark:text-green-300" />
                    </span>
                    <span>Revenue Today</span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-gray-900 dark:text-gray-100">{todaysSnapshot.revenueToday}</p>
                </div>

                <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <ShoppingCart size={16} className="text-blue-700 dark:text-blue-300" />
                    </span>
                    <span>Orders Today</span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-gray-900 dark:text-gray-100">{todaysSnapshot.ordersToday}</p>
                </div>

                <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                    <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                      <ClipboardCheck size={16} className="text-amber-700 dark:text-amber-300" />
                    </span>
                    <span>Pending Approvals</span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-gray-900 dark:text-gray-100">{todaysSnapshot.pendingApprovals}</p>
                </div>

                <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                    <span className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                      <XCircle size={16} className="text-red-700 dark:text-red-300" />
                    </span>
                    <span>Failed Payments</span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-gray-900 dark:text-gray-100">{todaysSnapshot.failedPayments}</p>
                </div>
              </div>

              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/60">
                <button
                  className="w-full text-center text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline py-1"
                  onClick={() => {
                    navigate('/analytics')
                    setIsSnapshotOpen(false)
                  }}
                >
                  Go to Analytics
                </button>
              </div>
            </div>
          )}
        </div>

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
            className="relative p-2 rounded-lg transition-all duration-200 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Notifications & activity"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 animate-ping opacity-20"></span>
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
            {user?.avatar || 'A'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.name || 'Admin'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || 'Administrator'}</p>
          </div>
        </button>
      </div>

      {/* Notification Drawer (existing drawer) */}
      <Drawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        title="Notifications & Activity"
        size="md"
        position="right"
      >
        {/* Header + Actions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
            </p>
            <button
              className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline disabled:opacity-50"
              disabled={unreadCount === 0}
              onClick={() => setNotificationList((prev) => prev.map((n) => ({ ...n, unread: false })))}
            >
              Mark all read
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {['all', 'system', 'finance', 'operations'].map((key) => {
              const label = key === 'all' ? 'All' : key === 'system' ? 'System' : key === 'finance' ? 'Finance' : 'Operations'
              const active = notificationFilter === key
              return (
                <button
                  key={key}
                  onClick={() => setNotificationFilter(key)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors border ${
                    active
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Notifications */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">No notifications</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Try a different filter.</p>
              </div>
            ) : (
              filteredNotifications.map((n) => {
                const Icon = n.icon
                const iconColors = {
                  success: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
                  warning: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30',
                  product: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30',
                  info: 'text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30',
                }

                return (
                  <button
                    key={n.id}
                    onClick={() => setNotificationList((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                      n.unread
                        ? 'bg-primary-50/70 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColors[n.type] || iconColors.info}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{n.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{n.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{n.time}</p>
                          </div>
                          {n.unread && <span className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 flex-shrink-0 mt-1"></span>}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>

          {/* Recent Activity */}
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-2">
              Recent activity
            </p>
            <div className="space-y-2">
              {recentActivity.system.map((a) => (
                <div
                  key={a.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/40"
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300">{a.message}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full text-center text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline py-1">
              View all
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
              {user?.avatar || 'A'}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{user?.name || 'Admin'}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{user?.email || 'admin@example.com'}</p>
            <Badge variant="info">{user?.role || 'Administrator'}</Badge>
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
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.name || 'Admin'}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <Mail size={18} className="text-gray-400 dark:text-gray-500 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Email</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.email || 'admin@example.com'}</span>
                </div>
                {user?.mobile && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center">
                      <Phone size={18} className="text-gray-400 dark:text-gray-500 mr-3" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Mobile</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.mobile}</span>
                  </div>
                )}
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <Settings size={18} className="text-gray-400 dark:text-gray-500 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Role</span>
                  </div>
                  <Badge variant="info">{user?.role || 'Administrator'}</Badge>
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
            <button
              onClick={() => {
                logout()
                navigate('/login')
                setIsProfileDrawerOpen(false)
              }}
              className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
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

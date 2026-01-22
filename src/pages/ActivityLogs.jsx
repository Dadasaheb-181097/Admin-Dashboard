import { useState, useEffect } from 'react'
import { Activity, Search, Filter, Download, Clock, User, Shield } from 'lucide-react'
import { activityAPI, exportToCSV } from '../utils/api'
import Card from '../components/UI/Card'
import Badge from '../components/UI/Badge'
import Button from '../components/UI/Button'
import Pagination from '../components/UI/Pagination'
import { useToast } from '../contexts/ToastContext'

function ActivityLogs() {
  const [logs, setLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const { success, error: showError } = useToast()

  useEffect(() => {
    loadLogs()
  }, [])

  useEffect(() => {
    const filtered = logs.filter(log =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredLogs(filtered)
    setCurrentPage(1)
  }, [searchTerm, logs])

  const loadLogs = async () => {
    try {
      setLoading(true)
      const data = await activityAPI.getAll()
      setLogs(data)
      setFilteredLogs(data)
    } catch (err) {
      showError('Failed to load activity logs')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    try {
      exportToCSV(filteredLogs, `activity-logs-${new Date().toISOString().split('T')[0]}.csv`)
      success('Activity logs exported successfully')
    } catch (err) {
      showError('Failed to export logs')
    }
  }

  const getActionBadge = (action) => {
    const variants = {
      'Created': 'success',
      'Updated': 'info',
      'Deleted': 'danger',
      'Login': 'info',
      'Logout': 'warning',
      'Export': 'purple',
    }
    const type = Object.keys(variants).find(k => action.includes(k)) || 'default'
    return <Badge variant={variants[type] || 'default'}>{action}</Badge>
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Activity Logs</h1>
          <p className="text-gray-600 dark:text-gray-400">Track all system activities and user actions</p>
        </div>
        <Button variant="secondary" onClick={handleExport} className="flex items-center">
          <Download size={20} className="mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Search */}
      <Card>
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by user, action, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>
        </div>
      </Card>

      {/* Logs Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No activity logs found
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-semibold">
                          {log.user.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{log.user}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400 max-w-md truncate">
                        {log.details || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">{log.ip}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock size={16} className="mr-2" />
                        {formatDate(log.timestamp)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredLogs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredLogs.length}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </div>
  )
}

export default ActivityLogs

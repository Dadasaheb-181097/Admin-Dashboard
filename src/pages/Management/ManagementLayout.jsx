/**
 * Management Layout Component
 * Handles nested routing for Management section
 */
import { Outlet } from 'react-router-dom'

function ManagementLayout() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Outlet />
    </div>
  )
}

export default ManagementLayout

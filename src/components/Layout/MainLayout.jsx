import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true) // Mobile sidebar open/close
  const [sidebarCollapsed, setSidebarCollapsed] = useState('expanded') // 'expanded' | 'collapsed' | 'minimal'

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
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout

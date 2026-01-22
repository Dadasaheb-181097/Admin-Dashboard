import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('admin_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem('admin_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock authentication - in production, this would be an API call
    if (email === 'dadasaheb181097@gmail.com' && password === 'admin123') {
      const userData = {
        id: 1,
        name: 'Dadaso Patil',
        email: 'dadasaheb181097@gmail.com',
        mobile: '7057986041',
        role: 'Admin',
        avatar: 'DP',
        permissions: ['all'], // Admin has all permissions
      }
      setUser(userData)
      localStorage.setItem('admin_user', JSON.stringify(userData))
      return { success: true, user: userData }
    } else {
      return { success: false, error: 'Invalid email or password' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('admin_user')
  }

  const hasPermission = (permission) => {
    if (!user) return false
    if (user.permissions.includes('all')) return true
    return user.permissions.includes(permission)
  }

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

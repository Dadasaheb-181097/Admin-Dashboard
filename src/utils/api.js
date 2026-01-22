// Mock API service layer
// In production, replace with actual API calls

const API_DELAY = 500 // Simulate network delay

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Users API
export const usersAPI = {
  getAll: async () => {
    await delay(API_DELAY)
    const users = JSON.parse(localStorage.getItem('admin_users') || '[]')
    if (users.length === 0) {
      // Initialize with sample data
      const sampleUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15', avatar: 'JD' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2024-02-20', avatar: 'JS' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', joinDate: '2024-03-10', avatar: 'BJ' },
        { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Moderator', status: 'Active', joinDate: '2024-01-25', avatar: 'AW' },
        { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active', joinDate: '2024-04-05', avatar: 'CB' },
        { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'User', status: 'Active', joinDate: '2024-02-14', avatar: 'DP' },
        { id: 7, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'User', status: 'Inactive', joinDate: '2024-03-22', avatar: 'EH' },
        { id: 8, name: 'Fiona Apple', email: 'fiona@example.com', role: 'User', status: 'Active', joinDate: '2024-04-01', avatar: 'FA' },
      ]
      localStorage.setItem('admin_users', JSON.stringify(sampleUsers))
      return sampleUsers
    }
    return users
  },

  create: async (userData) => {
    await delay(API_DELAY)
    const users = await usersAPI.getAll()
    const newUser = {
      ...userData,
      id: Math.max(...users.map(u => u.id), 0) + 1,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: userData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
    }
    users.push(newUser)
    localStorage.setItem('admin_users', JSON.stringify(users))
    return newUser
  },

  update: async (id, userData) => {
    await delay(API_DELAY)
    const users = await usersAPI.getAll()
    const index = users.findIndex(u => u.id === id)
    if (index === -1) throw new Error('User not found')
    users[index] = { ...users[index], ...userData }
    localStorage.setItem('admin_users', JSON.stringify(users))
    return users[index]
  },

  delete: async (id) => {
    await delay(API_DELAY)
    const users = await usersAPI.getAll()
    const filtered = users.filter(u => u.id !== id)
    localStorage.setItem('admin_users', JSON.stringify(filtered))
    return { success: true }
  },

  deleteMany: async (ids) => {
    await delay(API_DELAY)
    const users = await usersAPI.getAll()
    const filtered = users.filter(u => !ids.includes(u.id))
    localStorage.setItem('admin_users', JSON.stringify(filtered))
    return { success: true, deleted: ids.length }
  },
}

// Products API
export const productsAPI = {
  getAll: async () => {
    await delay(API_DELAY)
    const products = JSON.parse(localStorage.getItem('admin_products') || '[]')
    if (products.length === 0) {
      const sampleProducts = [
        { id: 1, name: 'Laptop Pro 15', category: 'Electronics', price: 1299.99, stock: 45, status: 'In Stock', sales: 234 },
        { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 120, status: 'In Stock', sales: 567 },
        { id: 3, name: 'Mechanical Keyboard', category: 'Accessories', price: 149.99, stock: 78, status: 'In Stock', sales: 189 },
        { id: 4, name: '4K Monitor', category: 'Electronics', price: 399.99, stock: 23, status: 'Low Stock', sales: 98 },
        { id: 5, name: 'USB-C Hub', category: 'Accessories', price: 49.99, stock: 0, status: 'Out of Stock', sales: 312 },
        { id: 6, name: 'Webcam HD', category: 'Electronics', price: 79.99, stock: 56, status: 'In Stock', sales: 201 },
        { id: 7, name: 'Standing Desk', category: 'Furniture', price: 599.99, stock: 12, status: 'Low Stock', sales: 45 },
        { id: 8, name: 'Ergonomic Chair', category: 'Furniture', price: 349.99, stock: 34, status: 'In Stock', sales: 123 },
      ]
      localStorage.setItem('admin_products', JSON.stringify(sampleProducts))
      return sampleProducts
    }
    return products
  },

  create: async (productData) => {
    await delay(API_DELAY)
    const products = await productsAPI.getAll()
    const newProduct = {
      ...productData,
      id: Math.max(...products.map(p => p.id), 0) + 1,
      sales: 0,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock),
    }
    products.push(newProduct)
    localStorage.setItem('admin_products', JSON.stringify(products))
    return newProduct
  },

  update: async (id, productData) => {
    await delay(API_DELAY)
    const products = await productsAPI.getAll()
    const index = products.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Product not found')
    products[index] = { ...products[index], ...productData, price: parseFloat(productData.price), stock: parseInt(productData.stock) }
    localStorage.setItem('admin_products', JSON.stringify(products))
    return products[index]
  },

  delete: async (id) => {
    await delay(API_DELAY)
    const products = await productsAPI.getAll()
    const filtered = products.filter(p => p.id !== id)
    localStorage.setItem('admin_products', JSON.stringify(filtered))
    return { success: true }
  },

  deleteMany: async (ids) => {
    await delay(API_DELAY)
    const products = await productsAPI.getAll()
    const filtered = products.filter(p => !ids.includes(p.id))
    localStorage.setItem('admin_products', JSON.stringify(filtered))
    return { success: true, deleted: ids.length }
  },
}

// Orders API
export const ordersAPI = {
  getAll: async () => {
    await delay(API_DELAY)
    const orders = JSON.parse(localStorage.getItem('admin_orders') || '[]')
    if (orders.length === 0) {
      const sampleOrders = [
        { id: '#ORD-001', customer: 'John Doe', product: 'Laptop Pro 15', amount: 1299.99, status: 'Completed', date: '2024-01-15' },
        { id: '#ORD-002', customer: 'Jane Smith', product: 'Wireless Mouse', amount: 29.99, status: 'Pending', date: '2024-01-16' },
        { id: '#ORD-003', customer: 'Bob Johnson', product: 'Mechanical Keyboard', amount: 149.99, status: 'Processing', date: '2024-01-17' },
        { id: '#ORD-004', customer: 'Alice Williams', product: '4K Monitor', amount: 399.99, status: 'Completed', date: '2024-01-18' },
        { id: '#ORD-005', customer: 'Charlie Brown', product: 'USB-C Hub', amount: 49.99, status: 'Cancelled', date: '2024-01-19' },
        { id: '#ORD-006', customer: 'Diana Prince', product: 'Webcam HD', amount: 79.99, status: 'Completed', date: '2024-01-20' },
        { id: '#ORD-007', customer: 'Ethan Hunt', product: 'Standing Desk', amount: 599.99, status: 'Processing', date: '2024-01-21' },
        { id: '#ORD-008', customer: 'Fiona Apple', product: 'Ergonomic Chair', amount: 349.99, status: 'Completed', date: '2024-01-22' },
      ]
      localStorage.setItem('admin_orders', JSON.stringify(sampleOrders))
      return sampleOrders
    }
    return orders
  },
}

// Activity Logs API
export const activityAPI = {
  getAll: async () => {
    await delay(API_DELAY)
    const logs = JSON.parse(localStorage.getItem('admin_activity_logs') || '[]')
    return logs.reverse() // Most recent first
  },

  log: async (action, details) => {
    const logs = await activityAPI.getAll()
    const user = JSON.parse(localStorage.getItem('admin_user') || '{}')
    const newLog = {
      id: Date.now(),
      user: user.name || 'System',
      action,
      details,
      timestamp: new Date().toISOString(),
      ip: '127.0.0.1',
    }
    logs.unshift(newLog)
    // Keep only last 1000 logs
    if (logs.length > 1000) logs.splice(1000)
    localStorage.setItem('admin_activity_logs', JSON.stringify(logs.reverse()))
    return newLog
  },
}

// Export utilities
export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header]
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value
    }).join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename || 'export.csv'
  link.click()
}

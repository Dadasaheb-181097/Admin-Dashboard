// Sample Users Data
export const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15', avatar: 'JD' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2024-02-20', avatar: 'JS' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', joinDate: '2024-03-10', avatar: 'BJ' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Moderator', status: 'Active', joinDate: '2024-01-25', avatar: 'AW' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active', joinDate: '2024-04-05', avatar: 'CB' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'User', status: 'Active', joinDate: '2024-02-14', avatar: 'DP' },
  { id: 7, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'User', status: 'Inactive', joinDate: '2024-03-22', avatar: 'EH' },
  { id: 8, name: 'Fiona Apple', email: 'fiona@example.com', role: 'User', status: 'Active', joinDate: '2024-04-01', avatar: 'FA' },
]

// Sample Products Data
export const products = [
  { id: 1, name: 'Laptop Pro 15', category: 'Electronics', price: 1299.99, stock: 45, status: 'In Stock', sales: 234 },
  { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 120, status: 'In Stock', sales: 567 },
  { id: 3, name: 'Mechanical Keyboard', category: 'Accessories', price: 149.99, stock: 78, status: 'In Stock', sales: 189 },
  { id: 4, name: '4K Monitor', category: 'Electronics', price: 399.99, stock: 23, status: 'Low Stock', sales: 98 },
  { id: 5, name: 'USB-C Hub', category: 'Accessories', price: 49.99, stock: 0, status: 'Out of Stock', sales: 312 },
  { id: 6, name: 'Webcam HD', category: 'Electronics', price: 79.99, stock: 56, status: 'In Stock', sales: 201 },
  { id: 7, name: 'Standing Desk', category: 'Furniture', price: 599.99, stock: 12, status: 'Low Stock', sales: 45 },
  { id: 8, name: 'Ergonomic Chair', category: 'Furniture', price: 349.99, stock: 34, status: 'In Stock', sales: 123 },
]

// Sample Orders Data
export const orders = [
  { id: '#ORD-001', customer: 'John Doe', product: 'Laptop Pro 15', amount: 1299.99, status: 'Completed', date: '2024-01-15' },
  { id: '#ORD-002', customer: 'Jane Smith', product: 'Wireless Mouse', amount: 29.99, status: 'Pending', date: '2024-01-16' },
  { id: '#ORD-003', customer: 'Bob Johnson', product: 'Mechanical Keyboard', amount: 149.99, status: 'Processing', date: '2024-01-17' },
  { id: '#ORD-004', customer: 'Alice Williams', product: '4K Monitor', amount: 399.99, status: 'Completed', date: '2024-01-18' },
  { id: '#ORD-005', customer: 'Charlie Brown', product: 'USB-C Hub', amount: 49.99, status: 'Cancelled', date: '2024-01-19' },
  { id: '#ORD-006', customer: 'Diana Prince', product: 'Webcam HD', amount: 79.99, status: 'Completed', date: '2024-01-20' },
  { id: '#ORD-007', customer: 'Ethan Hunt', product: 'Standing Desk', amount: 599.99, status: 'Processing', date: '2024-01-21' },
  { id: '#ORD-008', customer: 'Fiona Apple', product: 'Ergonomic Chair', amount: 349.99, status: 'Completed', date: '2024-01-22' },
]

// Sales Data for Charts
export const salesData = [
  { month: 'Jan', sales: 45000, orders: 120, users: 45 },
  { month: 'Feb', sales: 52000, orders: 145, users: 52 },
  { month: 'Mar', sales: 48000, orders: 138, users: 48 },
  { month: 'Apr', sales: 61000, orders: 167, users: 61 },
  { month: 'May', sales: 55000, orders: 152, users: 55 },
  { month: 'Jun', sales: 67000, orders: 189, users: 67 },
]

// Revenue Data
export const revenueData = [
  { name: 'Electronics', value: 125000, color: '#0ea5e9' },
  { name: 'Accessories', value: 85000, color: '#3b82f6' },
  { name: 'Furniture', value: 45000, color: '#8b5cf6' },
  { name: 'Other', value: 25000, color: '#ec4899' },
]

// Dashboard Stats
export const dashboardStats = {
  totalRevenue: 280000,
  totalOrders: 911,
  totalUsers: 328,
  totalProducts: 156,
  revenueGrowth: 12.5,
  ordersGrowth: 8.3,
  usersGrowth: 15.2,
  productsGrowth: 5.7,
}

/**
 * Products Management Page
 * Features modals for add/edit and drawer for product details
 */
import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Package, DollarSign, TrendingUp, Eye } from 'lucide-react'
import { products } from '../data/sampleData'
import Modal from '../components/UI/Modal'
import Drawer from '../components/UI/Drawer'
import Button from '../components/UI/Button'
import Badge from '../components/UI/Badge'
import Card from '../components/UI/Card'

function Products() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
    status: 'In Stock',
  })

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddProduct = () => {
    setFormData({ name: '', category: 'Electronics', price: '', stock: '', status: 'In Stock' })
    setIsAddModalOpen(true)
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status,
    })
    setIsEditModalOpen(true)
  }

  const handleViewProduct = (product) => {
    setSelectedProduct(product)
    setIsDrawerOpen(true)
  }

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product)
    setIsDeleteModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setIsAddModalOpen(false)
    setIsEditModalOpen(false)
    setFormData({ name: '', category: 'Electronics', price: '', stock: '', status: 'In Stock' })
  }

  const handleDelete = () => {
    console.log('Delete product:', selectedProduct)
    setIsDeleteModalOpen(false)
    setSelectedProduct(null)
  }

  const getStatusBadge = (status) => {
    const variants = {
      'In Stock': 'success',
      'Low Stock': 'warning',
      'Out of Stock': 'danger',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your product inventory</p>
        </div>
        <Button variant="primary" onClick={handleAddProduct} className="flex items-center">
          <Plus size={20} className="mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="animate-scale-in" style={{ animationDelay: '0ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Products</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{products.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
              <Package className="text-primary-600 dark:text-primary-400" size={28} />
            </div>
          </div>
        </Card>
        <Card className="animate-scale-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">In Stock</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                {products.filter(p => p.status === 'In Stock').length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
              <Package className="text-green-600 dark:text-green-400" size={28} />
            </div>
          </div>
        </Card>
        <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Low Stock</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                {products.filter(p => p.status === 'Low Stock').length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
              <Package className="text-yellow-600 dark:text-yellow-400" size={28} />
            </div>
          </div>
        </Card>
        <Card className="animate-scale-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Out of Stock</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">
                {products.filter(p => p.status === 'Out of Stock').length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30">
              <Package className="text-red-600 dark:text-red-400" size={28} />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>
          <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Furniture</option>
          </select>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <Card 
            key={product.id} 
            className="hover:shadow-xl transition-all duration-300 animate-scale-in cursor-pointer group"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => handleViewProduct(product)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Package className="text-white" size={32} />
              </div>
              {getStatusBadge(product.status)}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{product.category}</p>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">${product.price.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Stock</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{product.stock}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Sales</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{product.sales}</p>
              </div>
              <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => handleEditProduct(product)}
                  className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Product Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              placeholder="Enter product name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
                <option>Electronics</option>
                <option>Accessories</option>
                <option>Furniture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Product"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Product Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
                <option>Electronics</option>
                <option>Accessories</option>
                <option>Furniture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Product Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Product Details"
        position="right"
        size="lg"
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Package className="text-white" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedProduct.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{selectedProduct.category}</p>
              <div className="mt-3">{getStatusBadge(selectedProduct.status)}</div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="text-blue-600 dark:text-blue-400" size={24} />
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Price</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        ${selectedProduct.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Stock Quantity</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{selectedProduct.stock}</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Sales</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{selectedProduct.sales}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="text-green-600 dark:text-green-400" size={20} />
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Revenue</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      ${(selectedProduct.price * selectedProduct.sales).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3">
                <Button variant="primary" className="flex-1" onClick={() => {
                  setIsDrawerOpen(false)
                  handleEditProduct(selectedProduct)
                }}>
                  <Edit size={18} className="mr-2" />
                  Edit Product
                </Button>
                <Button variant="danger" className="flex-1" onClick={() => {
                  setIsDrawerOpen(false)
                  handleDeleteProduct(selectedProduct)
                }}>
                  <Trash2 size={18} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Product"
        size="sm"
      >
        {selectedProduct && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-gray-100">{selectedProduct.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete Product
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Products

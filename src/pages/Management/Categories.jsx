/**
 * Categories Management Page
 */
import { Folder, Plus, Edit, Trash2 } from 'lucide-react'
import Card from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import Badge from '../../components/UI/Badge'

const categories = [
  { id: 1, name: 'Electronics', slug: 'electronics', products: 45, status: 'Active' },
  { id: 2, name: 'Accessories', slug: 'accessories', products: 32, status: 'Active' },
  { id: 3, name: 'Clothing', slug: 'clothing', products: 28, status: 'Active' },
  { id: 4, name: 'Home & Living', slug: 'home-living', products: 19, status: 'Active' },
  { id: 5, name: 'Sports', slug: 'sports', products: 15, status: 'Inactive' },
]

function Categories() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Categories</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage product categories and organization</p>
        </div>
        <Button variant="primary" className="flex items-center">
          <Plus size={20} className="mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4">
                  <Folder className="text-primary-600 dark:text-primary-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{category.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.slug}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Products</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{category.products}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={category.status === 'Active' ? 'success' : 'default'}>
                  {category.status}
                </Badge>
                <button className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Categories

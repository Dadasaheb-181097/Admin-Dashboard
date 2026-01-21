/**
 * Brands Management Page
 */
import { Tag, Plus, Edit, Trash2 } from 'lucide-react'
import Card from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import Badge from '../../components/UI/Badge'

const brands = [
  { id: 1, name: 'TechCorp', logo: 'TC', products: 89, status: 'Active' },
  { id: 2, name: 'StyleBrand', logo: 'SB', products: 67, status: 'Active' },
  { id: 3, name: 'HomeEssentials', logo: 'HE', products: 45, status: 'Active' },
  { id: 4, name: 'SportMax', logo: 'SM', products: 32, status: 'Active' },
  { id: 5, name: 'LuxuryLine', logo: 'LL', products: 18, status: 'Inactive' },
]

function Brands() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Brands</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage product brands and manufacturers</p>
        </div>
        <Button variant="primary" className="flex items-center">
          <Plus size={20} className="mr-2" />
          Add Brand
        </Button>
      </div>

      {/* Brands Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Brand</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Logo</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Products</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">{brand.name}</td>
                  <td className="py-3 px-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
                      {brand.logo}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">{brand.products}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant={brand.status === 'Active' ? 'success' : 'default'}>
                      {brand.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default Brands

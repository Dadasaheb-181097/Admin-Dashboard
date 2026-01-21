/**
 * Coupons Management Page
 */
import { Ticket, Plus, Edit, Trash2, Copy } from 'lucide-react'
import Card from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import Badge from '../../components/UI/Badge'

const coupons = [
  { id: 1, code: 'SAVE20', discount: '20%', type: 'Percentage', used: 145, limit: 500, status: 'Active', expiry: '2024-12-31' },
  { id: 2, code: 'FLAT50', discount: '$50', type: 'Fixed', used: 89, limit: 200, status: 'Active', expiry: '2024-11-30' },
  { id: 3, code: 'WELCOME10', discount: '10%', type: 'Percentage', used: 234, limit: 1000, status: 'Active', expiry: '2024-12-31' },
  { id: 4, code: 'SUMMER25', discount: '25%', type: 'Percentage', used: 67, limit: 300, status: 'Active', expiry: '2024-10-31' },
  { id: 5, code: 'OLD50', discount: '50%', type: 'Percentage', used: 300, limit: 300, status: 'Expired', expiry: '2024-09-30' },
]

function Coupons() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Coupons</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage discount coupons and promotional codes</p>
        </div>
        <Button variant="primary" className="flex items-center">
          <Plus size={20} className="mr-2" />
          Create Coupon
        </Button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <Card key={coupon.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mr-4">
                  <Ticket className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-mono">{coupon.code}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{coupon.type}</p>
                </div>
              </div>
              <Badge variant={coupon.status === 'Active' ? 'success' : 'default'}>
                {coupon.status}
              </Badge>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Discount</span>
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">{coupon.discount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Used</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{coupon.used} / {coupon.limit}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Expires</span>
                <span className="text-sm text-gray-900 dark:text-gray-100">{coupon.expiry}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Copy size={16} className="mr-2" />
                Copy
              </button>
              <button className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Edit size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Coupons

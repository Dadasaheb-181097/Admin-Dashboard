/**
 * Reviews Management Page
 */
import { Star, CheckCircle, XCircle, Trash2 } from 'lucide-react'
import Card from '../../components/UI/Card'
import Badge from '../../components/UI/Badge'

const reviews = [
  { id: 1, product: 'Wireless Headphones', customer: 'John Doe', rating: 5, comment: 'Excellent quality and sound!', date: '2024-01-15', status: 'Approved' },
  { id: 2, product: 'Smart Watch', customer: 'Jane Smith', rating: 4, comment: 'Great features, battery could be better.', date: '2024-01-14', status: 'Approved' },
  { id: 3, product: 'Laptop Stand', customer: 'Mike Johnson', rating: 5, comment: 'Perfect for my setup!', date: '2024-01-13', status: 'Pending' },
  { id: 4, product: 'USB-C Cable', customer: 'Sarah Williams', rating: 3, comment: 'Works fine but feels cheap.', date: '2024-01-12', status: 'Approved' },
  { id: 5, product: 'Mouse Pad', customer: 'David Brown', rating: 2, comment: 'Not as described, disappointed.', date: '2024-01-11', status: 'Rejected' },
]

function Reviews() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Reviews</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage product reviews and ratings</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{review.product}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">by {review.customer}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                  <Badge 
                    variant={
                      review.status === 'Approved' ? 'success' : 
                      review.status === 'Pending' ? 'warning' : 
                      'danger'
                    }
                  >
                    {review.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {review.status === 'Pending' && (
                  <>
                    <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors">
                      <CheckCircle size={20} />
                    </button>
                    <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                      <XCircle size={20} />
                    </button>
                  </>
                )}
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

export default Reviews

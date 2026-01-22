import { Link } from 'react-router-dom'
import { Home, AlertCircle } from 'lucide-react'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
      <Card className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="text-red-600 dark:text-red-400" size={48} />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary" className="flex items-center mx-auto">
            <Home size={20} className="mr-2" />
            Go to Dashboard
          </Button>
        </Link>
      </Card>
    </div>
  )
}

export default NotFound

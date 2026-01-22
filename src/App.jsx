import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'
import PageLoader from './components/UI/PageLoader'

const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Users = lazy(() => import('./pages/Users'))
const Products = lazy(() => import('./pages/Products'))
const Orders = lazy(() => import('./pages/Orders'))
const Settings = lazy(() => import('./pages/Settings'))
const Analytics = lazy(() => import('./pages/Analytics'))
const ActivityLogs = lazy(() => import('./pages/ActivityLogs'))
const NotFound = lazy(() => import('./pages/NotFound'))

const ReportsLayout = lazy(() => import('./pages/Reports/ReportsLayout'))
const Overview = lazy(() => import('./pages/Reports/Overview'))
const SalesReport = lazy(() => import('./pages/Reports/SalesReport'))
const CustomerReport = lazy(() => import('./pages/Reports/CustomerReport'))
const InventoryReport = lazy(() => import('./pages/Reports/InventoryReport'))

const ManagementLayout = lazy(() => import('./pages/Management/ManagementLayout'))
const Categories = lazy(() => import('./pages/Management/Categories'))
const Brands = lazy(() => import('./pages/Management/Brands'))
const Coupons = lazy(() => import('./pages/Management/Coupons'))
const Reviews = lazy(() => import('./pages/Management/Reviews'))

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/activity-logs" element={<ActivityLogs />} />
                  {/* Reports with nested routes */}
                  <Route path="/reports" element={<ReportsLayout />}>
                    <Route index element={<Overview />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="sales" element={<SalesReport />} />
                    <Route path="customers" element={<CustomerReport />} />
                    <Route path="inventory" element={<InventoryReport />} />
                  </Route>
                  {/* Management with nested routes */}
                  <Route path="/management" element={<ManagementLayout />}>
                    <Route index element={<Navigate to="/management/categories" replace />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="brands" element={<Brands />} />
                    <Route path="coupons" element={<Coupons />} />
                    <Route path="reviews" element={<Reviews />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App

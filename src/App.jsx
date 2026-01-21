import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import Analytics from './pages/Analytics'
import ReportsLayout from './pages/Reports/ReportsLayout'
import Overview from './pages/Reports/Overview'
import SalesReport from './pages/Reports/SalesReport'
import CustomerReport from './pages/Reports/CustomerReport'
import InventoryReport from './pages/Reports/InventoryReport'
import ManagementLayout from './pages/Management/ManagementLayout'
import Categories from './pages/Management/Categories'
import Brands from './pages/Management/Brands'
import Coupons from './pages/Management/Coupons'
import Reviews from './pages/Management/Reviews'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
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
      </Routes>
    </MainLayout>
  )
}

export default App

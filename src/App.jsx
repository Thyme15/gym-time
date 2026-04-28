import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Products from './components/Products'
import Cart from './components/Cart'
import ProductDetail from './components/ProductDetail'
import Wishlist from './components/Wishlist'
import Men from './components/Men'
import Women from './components/Women'
import Search from './components/Search'
import Register from './components/Register'
import AdminAdd from './components/AdminAdd'
import AdminMod from './components/AdminMod'
import About from './components/AboutUs' 
import Accessories from './components/Accessories'
import Shoes from './components/Shoes'

// 🛡️ Component สำหรับป้องกันการเข้าถึงหน้า Admin โดยตรงผ่าน URL
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  // ถ้าไม่มีการ Login หรือ Login แล้วแต่ไม่ใช่สิทธิ admin
  if (!user || user.type !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        
        {/* 🔒 หน้าที่ต้องผ่านการตรวจสอบสิทธิ Admin เท่านั้น */}
        <Route path="/admin/add" element={
          <ProtectedRoute>
            <AdminAdd />
          </ProtectedRoute>
        } />
        <Route path="/admin/mod/:id" element={
          <ProtectedRoute>
            <AdminMod />
          </ProtectedRoute>
        } />
        
        <Route path="/about" element={<About />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/shoes" element={<Shoes />} />
      </Routes>
    </Router>
  )
}

export default App

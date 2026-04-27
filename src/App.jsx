import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
        <Route path="/admin/add" element={<AdminAdd />} />
        <Route path="/admin/mod/:id" element={<AdminMod />} />
        <Route path="/about" element={<About />} />
        <Route path="/accessories" element={<Accessories />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  )
}

export default App

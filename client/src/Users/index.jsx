import '../App.css'
import Home from './assets/pages/Home';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import CategoryPage from './assets/pages/CategoryPage';
import ErrorPage from './assets/pages/ErrorPage';
import ProductPage from './assets/pages/ProductPage';
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './assets/pages/Home/Products';
import { ToastContainer } from "react-toastify";
import Cart from '../Users/Components/Cart'
import "react-toastify/dist/ReactToastify.css"; 
import ProfilePage from './assets/pages/Home/Profilepage';





function App() {




  return (
    <>
    



      <NavigationBar />
      <Routes>
        <>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product-by-category/:category' element={<CategoryPage />} />
          <Route path="/products/:productID" element={<ProductPage />} />
          <Route path='/cart/' element={<Cart />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path='*' element={<ErrorPage />} />
        </>
      </Routes>
      <Footer />
      <ToastContainer/>
    </>
  )
}

export default App

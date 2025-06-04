
import Home from "./pages/Home"
import Footer from "./components/Footer"
import {Footercopy} from "./components/Footercopy"
import Document from "./pages/Document"
import Document1 from "./pages/Document1"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import { Route,Routes,useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === "/login"

  return (
    <>
    {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/document" element={<Document/>}/>
        <Route path="/about" element={<Document1/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  )
}

export default App

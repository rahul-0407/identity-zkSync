
import Home from "./pages/Home"
import Footer from "./components/Footer"
import {Footercopy} from "./components/Footercopy"
import Document from "./pages/Document"
import Document1 from "./pages/Document1"
import Verifier from "./pages/Verifier"
import Owner from "./pages/Owner"
import Policy from "./pages/Policy"
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
        <Route path="/verifier" element={<Verifier/>}/>
        <Route path="/owner" element={<Owner/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/privacy-policy" element={<Policy/>}/>
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  )
}

export default App


import Home from "./pages/Home"
import Footer from "./components/Footer"
import {Footercopy} from "./components/Footercopy"
import Document from "./pages/Document"
// import Document1 from "./pages/Document1"
import Verifier from "./pages/Verifier"
import Owner from "./pages/Owner"
import Policy from "./pages/Policy"
import Terms from "./pages/Terms"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import { Route,Routes,useLocation } from 'react-router-dom'
import { useState , useEffect} from "react"

function App() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  
  const location = useLocation()
  const isLoginPage = location.pathname === "/login"

  if (isMobile) {
    return (
      <div className="bg-neutral-950 ">
    <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full px-4">
            <h1 className=" bg-gradient-to-tl from-indigo-400 via-pink-100 to-gray-100 text-transparent bg-clip-text text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Coming Soon!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">Our website is under construction. We'll be back soon!
            </p>
            <form className="flex flex-col md:flex-row justify-center items-center gap-4">
                <input className="w-full md:w-80  py-2 px-4 border text-gray-800 dark:text-white border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700" type="email" placeholder="Enter your email address"/>
                <button className="bg-[rgba(79,82,255,0.92)] hover:bg-[rgba(68,51,255)] text-white py-2 px-4 border d">Notify Me</button>
            </form>
        </div>
    </div>
</div>
    );
  }

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
        <Route path="/terms-of-use" element={<Terms/>}/>
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  )
}

export default App

import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import { useState } from "react"
import Login from "./components/Login"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line react-refresh/only-export-components
export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  return (
    <div className="min-h-screen bg-gray-50">
      {token === "" ? <Login setToken={setToken} /> : <>
        <Navbar />
        <hr />
        <div className="w-full flex">
          <Sidebar />
          <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] text-base">
            <Routes>
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </>}

      <ToastContainer />
    </div>
  )
}

export default App

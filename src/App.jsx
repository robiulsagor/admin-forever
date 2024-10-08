import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"

import { useEffect, useState } from "react"
import Login from "./components/Login"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line react-refresh/only-export-components
export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  return (
    <div className=" bg-gray-50">
      {token === "" ? <Login setToken={setToken} /> : <>
        <Navbar setToken={setToken} />
        <hr />
        <div className="w-full flex">
          <Sidebar />
          <div className="w-[80%] lg:w-[70%] mx-auto ml-[max(5vw, 25px)] text-base">
            <Routes>
              <Route path="/add" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
            </Routes>
          </div>
        </div>
      </>}

      <ToastContainer closeOnClick autoClose={1000} />
    </div>
  )
}

export default App

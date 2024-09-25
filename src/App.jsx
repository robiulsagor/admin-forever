import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import { useState } from "react"
import Login from "./components/Login"

function App() {
  const [token, setToken] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      {token === "" ? <Login /> : <>
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

    </div>
  )
}

export default App

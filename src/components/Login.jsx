/* eslint-disable react/prop-types */
import { useState } from "react"
import axios from "axios"
import { backendUrl } from "../App"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('sagor@gmail.com')
    const [password, setPassword] = useState('sagor23')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email && password) {
            console.log("ok");
            const res = await axios.post(backendUrl + '/user/admin', {
                email, password
            })
            if (!res.data.success) {
                toast.error(res.data.message || 'Error while logging in!')
            } else {
                setToken(res.data.token)
                navigate("/")
            }
        }

    }

    return (
        <div className="h-screen w-full  flex items-center justify-center">
            <div className="px-8 py-6 bg-white w-full sm:w-[350px] shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">Email Address</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="your@mail.com" className="outline-none border border-gray-300 p-2 px-3 rounded text-gray-600 w-full" required />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}
                            placeholder="your password" className="outline-none border border-gray-300 p-2 px-3 rounded text-gray-600 w-full" required />
                    </div>

                    <button type="submit" className="bg-black text-white rounded-md w-full mt-5 py-2 hover:bg-slate-700">Login</button>

                </form>
            </div>
        </div>
    )
}

export default Login
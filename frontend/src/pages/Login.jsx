import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login({setIsLoggedIn , setUsername}) {
    //const [email, setEmail] = useState("")
    const [username , setUsernameInput] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handlelogin() {
        if (username === "" || password === "") {
            alert("Please fill all the fields")
            return
        }
       setIsLoggedIn(true)
       setUsername(username)
       navigate("/home")
    }

    return (
        <div className="auth-form">
            <h1>Welcome Back</h1>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                autoComplete="off"
                onChange={(e) => setUsernameInput(e.target.value)}
            />

            {/* <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
            /> */}

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handlelogin}>Login</button>
            <p>Don't have an account ? <span onClick={() => navigate("/register")} className="link">Register here</span></p>
        </div>
    )
}

export default Login
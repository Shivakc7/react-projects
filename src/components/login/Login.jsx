import React, { useState } from "react"
import axios from "axios"
import "../../App.css"

const Login = () => {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState({})

  const handleClick = async(e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const  {data} = await axios.get('https://jsonplaceholder.typicode.com/users/1')
      setUser(data)
    } catch (error) {
      setError(true)
      console.log(error)
    }
    setIsLoading(false)

  }

  return (
    <div className="container">
    <span>{user.name}</span>
      <form autoComplete="off">
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button disabled={!username || !password} onClick={handleClick}>{isLoading ? 'please wait' : 'Login'}</button>
        <span
          data-testid="error"
          style={{ visibility: error ? "visible" : "hidden" }}>
          something went wrong
        </span>
      </form>
    </div>
  )
}

export default Login

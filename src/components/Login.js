import React from "react";
import {useState} from "react"
import {Redirect} from "react-router-dom"

function Login({handleLogin, user}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        fetch("/login", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        })
        .then(r => {
            if (r.ok){
                r.json()
                    .then(data => {
                        console.log("Login was sucessful")
                        handleLogin(data)
                        setUsername("")
                        setPassword("")
                        window.location.reload()
            })
            }else {
                console.warn("Login unsucessful")
            }
        })
    }
    if (user){
        return <Redirect to="/posts"/>
    }
    return (
        <div>
             <label>Login: </label>
             <form onSubmit={handleSubmit}>
             <label> Username: </label><br/>
               <input type="text"  id="username-input" 
               onChange={e => setUsername(e.target.value)}
               value={username}
               placeholder="Enter ..."
               /><br/>
               <label> Password: </label><br/>
               <input type="text" id="password-input" 
               onChange={e=> setPassword(e.target.value)}
               value={password}
               placeholder="Enter..."
               />
                <button type="submit">Submit!</button>
                <br/>
             </form>
        </div>
    )
}
export default Login
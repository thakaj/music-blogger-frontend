import React from 'react'
import { useState } from 'react'
import {Redirect} from "react-router-dom"


function SignupPage({handleLogin, user}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState([])
    
    function handleSubmit(e){
        e.preventDefault()
        fetch("/users", {
            method: "Post",
            headers: {
                "Accepts": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username,
                    password,
                    password_confirmation: passwordConfirmation
                }
            })
        })
        .then(r => {
            if (r.ok){
                r.json()
                    .then(user => {
                        handleLogin(user.user)
                        setUsername("")
                        setPassword("")
                        setPasswordConfirmation("")
            })
            }else {
                r.json()
                .then(e => setErrors(e.errors))
            }
        })
    }
    if (user){
        return <Redirect to="/posts"/>
    }

    return (
        <div>
            {errors.length > 0 && (<ul style={{ color: "Black" }}>{errors.map((error) => (<li key={error}>Error: {error}</li>))}</ul>)} 
            <label>Sign Up: </label>
             <form onSubmit={handleSubmit}>
                 
             <label> Create username: </label><br/>
               <input type="text"  id="username-input" 
               onChange={e => setUsername(e.target.value)}
               value={username}
               placeholder="Enter ..."
               /><br/>
               <label> Create Password: </label><br/>
               <input type="text" id="password-input" 
               onChange={e=> setPassword(e.target.value)}
               value={password}
               placeholder="Enter..."
               /><br/>
               <label> Confirm Password </label><br/>
               <input type="text" id="passwordConirmation-input" 
               onChange={e=> setPasswordConfirmation(e.target.value)}
               value={passwordConfirmation}
               placeholder="Enter..."
               />
               <button type="submit">Submit!</button>
           </form>
        </div>
    )
}

export default SignupPage
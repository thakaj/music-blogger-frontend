import React from 'react'
import { useState } from 'react'


function SignupPage(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    
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
                    .then(data => {
                        console.log("Signup was sucessful", data)
                        setUsername("")
                        setPassword("")
                        setPasswordConfirmation("")
            })
            }else {
                console.warn("Signup unsucessful")
            }
        })
    }
   

    return (
        <div>
            <label>Sign Up: </label>
             <form onSubmit={handleSubmit}>
                 
             <label> Create username: </label><br/>
               <input type="text"  id="username-input" 
               onChange={e => setUsername(e.target.value)}
               value={username}
               placeholder="Enter ..."
               /><br/>
               <label> Create password: </label><br/>
               <input type="text" id="password-input" 
               onChange={e=> setPassword(e.target.value)}
               value={password}
               placeholder="Enter..."
               /><br/>
               <label> Confrim Password </label><br/>
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
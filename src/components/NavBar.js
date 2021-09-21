import React from "react"
import {Link} from "react-router-dom"

function NavBar({ user, handleLogout}){

    function handleDelete(){
        fetch("/logout", {
            method: "DELETE" 
        })
        .then(r => r.json())
        .then(() => {
            console.log("logout was sucessful")
            handleLogout()
        })

    }
    return(
        <header>
            <nav>
                <Link to="/posts">Blog Posts</Link>
                <Link to="/">Signup </Link>
                {user ? (<div>  <p>Hello, {user.username}</p>   <button onClick={handleDelete}> Logout</button> </div>) 
                : ( <Link to="/login">Click here to login</Link>)}
            </nav>
        </header>
    )
}
export default NavBar
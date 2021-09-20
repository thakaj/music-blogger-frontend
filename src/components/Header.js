import {Link} from "react-router-dom"

function Header({ user, handleLogout}){

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

    return (
        <header>
            <h1>
                <Link to="/posts">Blog Posts</Link>
            </h1>
            {user ? (
                <div>
                    <p>Hello, {user.username}</p>
                    <button onClick={handleDelete}>Logout</button>
                </div>
            ) : ( 
                <Link to="/login">Click here to login</Link>
            )}
        </header>
    )
}
export default Header
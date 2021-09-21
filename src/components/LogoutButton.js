import React from 'react'



function LogoutButton({handleLogout}){
    
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

        <button onClick={handleDelete}>Logout</button>
    )

}
export default LogoutButton
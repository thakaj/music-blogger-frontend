import React from "react"
import {useState} from "react"


//validates :body, presence: true 
//validates :title, presence: true

function PostForm({addNewPost, title, setTitle, setBody, body, id, setId, editPost, setHandleErrors}){
    const [errors, setErrors] = useState([])
    
    function handleSubmit(e){
      e.preventDefault()
      if(id) {
        handleEdit()
    } else {
        handleCreate()
    }
}
    function handleEdit(){
        fetch(`/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({title, body})
        })
        .then(r => {
            if (r.ok){
                r.json()
                .then(data =>{
                    setBody("")
                    setTitle("")
                    setId("")
                    editPost(data)
                })
            }else {
                r.json()
                .then(e => setHandleErrors(e.errors))
            }
        })
    }
    

    function handleCreate(){
        fetch(`/posts/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({title, body})
        })
        .then(r => {
            if (r.ok){
                r.json()
                .then(data =>{
                    setBody("")
                    setTitle("")
                    addNewPost(data)
                })
            }else {
                r.json()
                .then(e => setErrors(e.errors))
            }
        })
    }

    return (
        <div>
           {errors.length > 0 && (<ul style={{ color: "red" }}>{errors.map((error) => (<li key={error}>{error}</li>))}</ul>)} 
           <form onSubmit={handleSubmit}>
               <label>Title: </label>
               <input type="text"  id="title" name="title"
               onChange={e => setTitle(e.target.value)}
               value={title}
               placeholder="Enter post title..."
               />
               <label>Body: </label>
               <input type="text" id="body" name="body"
               onChange={e=> setBody(e.target.value)}
               value={body}
               placeholder="What do you want to post about?"
               />
               <button type="submit">Submit!</button>
           </form>
       </div>
    )
}

export default PostForm
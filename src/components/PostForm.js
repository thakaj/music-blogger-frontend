import React from "react"


//validates :body, presence: true 
//validates :title, presence: true

function PostForm({addNewPost, title, setTitle, setBody, body, id, setId, editPost, setHandleErrors, handleErrors}){
    
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
                    if (handleErrors){
                        setHandleErrors([])
                    }
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
                    if (handleErrors){
                        setHandleErrors([])
                    }
                    addNewPost(data)
                })
            }else {
                r.json()
                .then(e => setHandleErrors(e.errors))
            }
        })
    }

    return (
        <div>
           {/* {errors.length > 0 && (<ul style={{ color: "Black" }}>{errors.map((error) => (<li key={error}>Error: {error}</li>))}</ul>)}  */}
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
               placeholder="Enter the body of your post"
               />
               <button type="submit" >Submit!</button>
           </form>
       </div>
    )
}

export default PostForm
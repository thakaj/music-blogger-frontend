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
                    alert("Your post has been updated!")
                })
            }else {
                r.json()
                .then(e =>{ 
                    setHandleErrors(e.errors)
                    setId("")
                })
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
                    alert("Your post has been created!")
                })
            }else {
                r.json()
                .then(e => setHandleErrors(e.errors))
            }
        })
    }
    function handleClear(){
        setTitle("")
        setBody("")
        setId("")
    }
    return (
        <div>
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
               <button type="submit" >Post Submission</button>
               <button type="button" onClick={handleClear}>Reset Inputs</button>
           </form>
       </div>
    )
}

export default PostForm
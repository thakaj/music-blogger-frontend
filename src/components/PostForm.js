import React from "react"
import {useState} from "react"


//validates :body, presence: true 
//validates :title, presence: true

function PostForm({addNewPost, id, editPost}){
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [formData, setFormData] = useState({ title: "", body: "" })


    function handleEdit(e){
        e.preventDefault()
        fetch(`/posts/${id}`,{
            method: "POST",
            headers: {"Content-Type": "application/json",
        },
        body: JSON.stringify({title, body}),
    })
    .then((r)=> { 
        if (r.ok) {
            r.json()
            .then(data => {
                setTitle("")
                setBody("")
                editPost(data)
            })
        } else {
            r.json()
            .then(e => setErrors(e))
        }
    })

    }

    function onSubmit(e){
        e.preventDefault()
        fetch("/posts",{
            method: "POST",
            headers: {"Content-Type": "application/json",
        },
        body: JSON.stringify({title, body}),
    })
    .then((r)=> { 
        if (r.ok) {
            r.json()
            .then(data => {
                setTitle("")
                setBody("")
                addNewPost(data)
            })
        } else {
            r.json()
            .then(e => setErrors(e))
        }
    })
}
    function handleChange(e){
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    


    return (
       <div>
           {errors.length > 0 && errors.map(e=> <alert>{e}</alert>)}
           <form onSubmit={onSubmit}>
               <label>Title: </label>
               <input type="text"  id="title" name="title"
               onChange={handleChange}
               value={formData.title}
               placeholder="Enter post title..."
               />
               <label>Body: </label>
               <input type="text" id="body" name="body"
               onChange={handleChange}
               value={formData.body}
               placeholder="What do you want to post about?"
               />
               <button type="submit">Submit!</button><button onclick={handleEdit} type="edit">Edit</button>
           </form>
       </div>
    )
}

export default PostForm
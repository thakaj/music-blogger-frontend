import React from 'react'
import PostForm from './PostForm'
import {useEffect, useState} from 'react'
import {Redirect} from "react-router-dom"

function PostList({user}){
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [id, setId] = useState("")
    const [posts, setPosts] = useState([])
    const [handleErrors, setHandleErrors] = useState([])

    useEffect(()=>{
        fetch("/posts")
        .then((r)=> r.json())
        .then((data) => {
            console.log(data)
            setPosts(data)
        })
    },[])
    function addNewPost(newPost){
        const updatePosts = [...posts, newPost]
        setPosts(updatePosts)
    }
    function destroyPost(destroyPostId){
        const destroyPost = posts.filter(post => post.id !== destroyPostId)
        setPosts(destroyPost)
    }
    function editPost(post){
        setPosts(previousPost => {
            return previousPost.map(p => {
                return post.id === p.id ? post : p
            })
        })
    }
    function handleEditButton(post){
        setBody(post.body)
        setTitle(post.title)
        setId(post.id)
    }
    function handleDelete(post){
        fetch(`/posts/${post.id}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(r => {
            if (r.ok){
                r.json()
                .then(data =>{
                    console.log(data)
                    if (handleErrors){
                        setHandleErrors([])
                    }
                    destroyPost(data.id)
                    alert("Your post has been deleted!")
                })
            }else {
                r.json()
                .then(e => setHandleErrors(e.errors))
            }
        })
    }
    if (!user){
        return <Redirect to="/login"/>
    }
    return (
        <div>
            {handleErrors.length > 0 &&<h2 style={{ color: "black" }}>Error: {handleErrors}</h2>}
            <PostForm user={user} addNewPost={addNewPost} title={title} setTitle={setTitle} body={body}
             setBody={setBody} id={id} setId={setId} editPost={editPost} setHandleErrors={setHandleErrors} handleErrors={handleErrors}/>
            <div>{posts.body}</div>
            {posts.map(post => 
            <div key={post.id}>
            <article>
            <h1>Username: {post.user.username}</h1>
            <h2>Title: {post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => handleEditButton(post)} type="edit">Edit</button>
            <button onClick={()=> handleDelete(post)}>Delete</button>
            </article>
            </div>
            )}
        </div>
    )
}

export default PostList
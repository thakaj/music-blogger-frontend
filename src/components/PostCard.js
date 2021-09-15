import React from "react"
import PostForm from './PostForm'
import {useEffect, useState} from 'react'

function PostCard(){
    const [posts, setPosts] = useState([])
   
    useEffect(()=>{
        fetch(`/posts`)
        .then((r)=> r.json())
        .then((data) => {
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



    return (
        <div>
            <article>
            <PostForm 
            addNewPost={addNewPost}
            id={posts.id}
            editPost={editPost} 
            />
            </article>
        </div>
    )
}
export default PostCard
import React from 'react'
import {useEffect, useState} from 'react'
import PostCard from './PostCard'

function PostList(){
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
            <PostCard/>
        </div>
    )
}

export default PostList
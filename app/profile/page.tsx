'use client'
import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import Profile from '@components/Profile'
import axios from "axios"

const MyProfile = () => {
    const user = useUser()
   const [posts,setPosts]=useState([])

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/users/${user?.user?.primaryEmailAddress?.emailAddress}/post`);
            setPosts(response.data);
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        }
        if(user?.user?.primaryEmailAddress?.emailAddress) fetchPost();
      }, []);


    const hadleEdit=()=>{

    }

    const handleDelete= async()=>{

    }
    return (
        <Profile
            name="my"
            desc="Welcome to Your Profile"
            data={posts}
            handleEdit={hadleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile
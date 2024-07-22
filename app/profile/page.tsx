'use client'
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Profile from '@components/Profile';
import axios from "axios";
import { useRouter } from "next/navigation"; 

const MyProfile = () => {
  const { user } = useUser();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${user?.primaryEmailAddress?.emailAddress}/post`);
        console.log(response.data, "res data");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    if (user?.primaryEmailAddress?.emailAddress) fetchPost();
  }, [user]);

  const handleEdit = (post: any) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post: string) => {
    
  }

  return (
    <Profile
      name="my"
      desc="Welcome to Your Profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;

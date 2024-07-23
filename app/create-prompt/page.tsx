'use client'
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import Form from "@components/Form"
import { FormEvent, useState } from "react"
import axios from "axios"

const CreatePrompt = () => {
    const router=useRouter()
    const user = useUser()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    })
    const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
    
        try {
            const userDetails = {
                email: user?.user?.primaryEmailAddress?.emailAddress,
                username: user?.user?.fullName,
                image: user?.user?.imageUrl
            };
    
            const response = await axios.post('/api/prompt/new', {
                prompt: post.prompt,
                userId: userDetails,
                tag: post.tag
            },);

            if(response.status==200){
                router.push('/')
            }
    
        
            console.log('Prompt created successfully', response.data);
    
        } catch (error) {
            console.error('Error creating prompt', error);
        } finally {
            setSubmitting(false);
        }
    }
    
    return (
        <>
            <Form
                type="Create"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={createPrompt}
            />
        </>
    )
}

export default CreatePrompt
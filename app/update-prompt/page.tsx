'use client'
import { useUser } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@components/Form"
import { FormEvent, useEffect, useState } from "react"
import axios from "axios"

const UpdatePrompt = () => {
    const router = useRouter()
    const user = useUser()
    const searchParams = useSearchParams()
    const promptId = searchParams.get("id")
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await axios.get(`/api/prompt/${promptId}`)
            const data = response.data
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if (promptId) getPromptDetails()

    }, [promptId])



    const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        if (!promptId) return alert("prompt ID not found")

        try {
            const userDetails = {
                email: user?.user?.primaryEmailAddress?.emailAddress,
                username: user?.user?.fullName,
                image: user?.user?.imageUrl
            };

            const response = await axios.patch(`/api/prompt/${promptId}`, {
                prompt: post.prompt,
                tag: post.tag
            },);

            if (response.status == 200) {
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
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </>
    )
}

export default UpdatePrompt
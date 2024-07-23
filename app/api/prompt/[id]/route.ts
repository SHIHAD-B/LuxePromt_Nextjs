import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";
import { NextRequest } from "next/server";
import User from "@models/user";


export const GET = async (req: NextRequest, { params }: any) => {
    try {
        await connectToDb();

        const prompt = await Prompt.findById(params?.id).populate({
            path: "creator",
            model: User,
        });
        if (!prompt) return new Response("prompt not found", { status: 404 })
        const headers = new Headers();
        headers.set('Cache-Control', 's-maxage=10, stale-while-revalidate=59');

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response('failed to fetch prompt', { status: 500 });
    }
}

export const PATCH = async (req: NextRequest, { params }: any) => {
    const body = await req.json();
    const { prompt, tag }: any = body;

    try {
        await connectToDb()

        const existingPrompt = await Prompt.findOne({ _id: params?.id })

        if (!existingPrompt) return new Response("Prompt not found", { status: 404 })

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()
        const headers = new Headers();
        headers.set('Cache-Control', 's-maxage=10, stale-while-revalidate=59');

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        console.log("failed to update prompt", error)
        return new Response("failed to update prompt", { status: 500 })
    }
}


export const DELETE = async (req: NextRequest, { params }: any) => {
    try {

        await connectToDb()

        await Prompt.findByIdAndDelete(params.id)
        const headers = new Headers();
        headers.set('Cache-Control', 's-maxage=10, stale-while-revalidate=59');
        return new Response("prompt deleted successfull", { status: 200 })
    } catch (error) {
        console.log("failed to delete prompt")
        return new Response("failed to delete prompt", { status: 500 })
    }
}
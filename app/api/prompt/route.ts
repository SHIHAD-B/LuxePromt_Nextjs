import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";
import { NextRequest } from "next/server";
import User from "@models/user";

export const dynamic="force-dynamic"

export const GET= async(req:NextRequest)=>{
 try {
    await connectToDb();

    const prompts= await Prompt.find().populate({
        path: "creator",
        model: User,
      });

    return new Response(JSON.stringify(prompts), { status: 200});
 } catch (error) {
    console.log(error)
    return new Response('failed to fetch prompt', { status: 500});
 }
}
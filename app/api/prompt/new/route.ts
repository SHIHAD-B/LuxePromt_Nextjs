import { connectToDb } from "@utils/database";
import User from "@models/user";
import Prompt from "@models/prompt";
import { NextRequest } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { prompt, userId, tag } = body;
    
        await connectToDb();

        let creator;
        const userExists = await User.findOne({ email: userId?.email });

        if (userExists) {
            creator = userExists._id;
        } else {
            const newUser = await User.create(userId);
            creator = newUser._id;
        }

        const data = {
            creator: creator,
            prompt: prompt,
            tag: tag
        };

        const newPrompt = await Prompt.create(data);
        return new Response(JSON.stringify(newPrompt), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error('Error creating prompt:', error);
        return new Response('Internal Server Error...', { status: 500 });
    }
};

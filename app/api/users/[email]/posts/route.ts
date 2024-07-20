import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";
import { NextRequest } from "next/server";
import User from "@models/user";

export const GET = async (req: NextRequest, { params }: any) => {
    try {
        await connectToDb();
        const user = await User.findOne({ email: params.email })
        let prompts = null
        if (user) {

            prompts = await Prompt.find({ creator: user._id }).populate({
                path: "creator",
                model: User,
            });
        }

        if (prompts) {
            return new Response(JSON.stringify(prompts), { status: 200 });

        } else {
            return new Response("something went wrong", { status: 500 });

        }
    } catch (error) {
        console.log(error)
        return new Response('failed to fetch prompt', { status: 500 });
    }
}
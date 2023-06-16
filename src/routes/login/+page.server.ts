import type { Actions } from "../$types";
import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
export const actions : Actions = {
    default: async ({locals, request}) => {
        const {username, password} = Object.fromEntries(await request.formData()) as Record<string, string>

        if(!username || !password){
            throw fail(402, {msg: "Invalid Username or Password"});
        }
        
        try{
            const key = await auth.useKey("username", username, password)
            console.log(key)
            const session = await auth.createSession(key.userId)
            locals.auth.setSession(session);
        }catch(err){
            return fail(400)
        }
        throw redirect(302, "/");
    }
}
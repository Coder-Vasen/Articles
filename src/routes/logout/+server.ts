import type { RequestHandler } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";
import {auth} from "$lib/server/lucia"
export const POST: RequestHandler = async ({locals}) => {
    try {
        const {session} = await locals.auth.validateUser();
        if(!session) return fail(402, {msg:"Unable to logout"});
        await auth.invalidateSession(session.sessionId)
        locals.auth.setSession(null);
    } catch (error) {
        console.log(error);
    }
    throw redirect(302, '/')
}   
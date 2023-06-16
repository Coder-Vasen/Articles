import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({locals}) =>{
    const {user, session} = await locals.auth.validateUser()
    
    return {user}
}
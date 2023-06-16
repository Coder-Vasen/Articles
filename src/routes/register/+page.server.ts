import type {Actions} from "./$types";
import {prisma} from "$lib/server/prisma"
import {auth} from "$lib/server/lucia"
import { fail } from "assert";
import { redirect } from "@sveltejs/kit";

export const actions:Actions = {
    default: async ({locals, request}) => {
        const {username, name, password} = Object.fromEntries(await request.formData()) as Record<string, string>

        try{
            const user = await auth.createUser({
                primaryKey: {
                    providerId: "username",
                    providerUserId: username,
                    password
                },
                attributes: {
                    username,
                    name
                }
            })

            const session = await auth.createSession(user.userId);
            locals.auth.setSession(session)
        }catch(err){
            return fail("Unable to create User");
        }
        throw redirect(302, '/')
    }
}
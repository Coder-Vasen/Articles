import lucia from "lucia-auth"
import {sveltekit} from "lucia-auth/middleware"
import prisma from "@lucia-auth/adapter-prisma"
import {dev} from "$app/environment"
import {prisma as pClient} from "$lib/server/prisma"


export const auth = lucia({
    adapter: prisma(pClient),
    env: dev ? "DEV" : "PROD",
    transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
            name: userData.name
		};
	},
    middleware: sveltekit()
})

export type Auth = typeof auth;
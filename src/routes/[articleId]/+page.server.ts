
import { error, redirect } from "@sveltejs/kit";
import type {Actions, PageServerLoad} from "./$types"
import {prisma} from "$lib/server/prisma"
import { fail } from "@sveltejs/kit"
export const load :PageServerLoad = async ({params, locals}) => {
    const {user, session} = await locals.auth.validateUser();
    if(!user || !session) throw redirect(302, '/login')
    const getArticle = async () => {
        let isUnAuthorized = false;
        const article = await prisma.article.findUniqueOrThrow({
            where: {id: Number(params.articleId)}
        });
        try{
            if (user?.userId !== article.userId) isUnAuthorized = true;
            console.log(article.userId, user?.userId)
        }catch(err) {
            console.log(err);
            fail(405, {msg: "Unable to find the article"});
        }
        if(isUnAuthorized) throw error(403, "Unauthorized User Access");
        return article
    }
    return {
        article: await getArticle()
    }
}


export const actions: Actions ={
    editArticle: async ({url, request, locals}) => {
        const id = url.searchParams.get("id");
        const {title, content} = Object.fromEntries(await request.formData()) as Record<string, string>;
        let UnauthorizedError = false;
        try{
            const {user} = await locals.auth.validateUser();
            const article = await prisma.article.findUniqueOrThrow({
                where: {
                    id: Number(id)
                }
            });
            console.log(article.userId, user?.userId)
            if (user?.userId !== article.userId) UnauthorizedError = true;
            await prisma.article.update({
                where: {id: Number(id)},
                data: {title, content}
            })
        }catch(err) {
            console.log(err.message)
            fail("Unable to edit the article")
        }
        if(UnauthorizedError) throw error(403, "Unauthorized user")
        throw redirect(302,'/')
    }
}
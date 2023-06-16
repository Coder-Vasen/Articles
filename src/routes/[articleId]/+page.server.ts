
import { error, redirect } from "@sveltejs/kit";
import type {Actions, PageServerLoad} from "./$types"
import {prisma} from "$lib/server/prisma"
import { fail } from "assert";
export const load :PageServerLoad = async ({params, locals}) => {
    const {user} = await locals.auth.validateUser();

    const getArticle = async () => {
        try{
            const article = await prisma.article.findUniqueOrThrow({
                where: {id: Number(params.articleId)}
            });
            if (user?.userId !== article.userId) throw error(403, "Unauthorized User");
            console.log(article)
            return article
        }catch(err) {
            console.log(err);
            throw error(405, "Unable to find the article");
        }
        throw redirect(301, "/")
    }
    return {
        article: await getArticle()
    }
}


export const actions: Actions ={
    editArticle: async ({url, request, locals}) => {
        const id = url.searchParams.get("id");
        const {title, content} = Object.fromEntries(await request.formData()) as Record<string, string>;
        try{
            const article = await prisma.article.findUniqueOrThrow({
                where: {
                    id: Number(id)
                }
            });
            const {user} = await locals.auth.validateUser();
            if (user?.userId !== article.userId) throw error(403, "Unauthorized user")
            await prisma.article.update({
                where: {id: Number(id)},
                data: {title, content}
            })
        }catch(err) {
            fail("Unable to edit the article")
        }
    }
}
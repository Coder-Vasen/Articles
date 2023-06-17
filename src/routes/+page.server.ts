import {redirect, type Actions, error}  from "@sveltejs/kit";
import {prisma} from "$lib/server/prisma";
// import { fail } from "assert";
import type { PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
export const load:PageServerLoad = async ({locals}) => {
    const {session, user} = await locals.auth.validateUser();
    if (!session || !user){
        throw redirect(302, '/login');
    }
    let articles = await prisma.article.findMany() as Array<Object>;
    return {articles:articles.map(article => {
      
        if (user.userId == article.userId) return {...article, selfUser: true}
        return {...article, selfUser: false}   
        
    })}
    
    
}


export const actions: Actions = {
    createArticle: async ({request, locals}) => {
        const {user} = await locals.auth.validateUser()
        const {title, content} = Object.fromEntries(await request.formData()) as Record<string, string>
        console.log(title, content)
        try{
            await prisma.article.create(
                {
                    data: {title, content, userId: user?.userId, author_name: user?.name}
                }
            )
        }catch(err){
            fail(404,{msg: "Unable to create the Article Please try again later."})   
        }
        return {status: 201}
    },
    deleteArticle: async ({url, locals}) => {
        const id = url.searchParams.get("id")
        const {user} = await locals.auth.validateUser()
        try {
            const article = await prisma.article.findUniqueOrThrow({
                where: {
                    id: Number(id)
                }
            })
            if (article.userId !== user?.userId) throw error(403,"Unauthorized User")
            else await prisma.article.delete({
                where:{
                    id: Number(id)
                }
            })
        } catch (error) {
            console.log(error)
            fail("Unable to delete the article")
        }
        return {status: 201}
    }
}
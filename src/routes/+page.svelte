<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageData } from "./$types";

    export let data: PageData;
    // console.log(data, Object.values(data.articles))
    let submitButton: HTMLButtonElement;

    function handleSubmit(e: KeyboardEvent){
        if (e.ctrlKey && e.key =="Enter") submitButton.click();
    }
</script>

<div class="grid" style="max-height: 100vh">
    <div style="max-height: 100vh">
        <h2>Articles: </h2>
        {#each Object.values(data.articles) as article}
            <article>
                <header>{article.title}</header>
                <p>{article.content}</p>
                <form action="?/deleteArticle&id={article.id}" method="post" use:enhance>
                    <button class="outline secondary" type="submit">Delete Articles</button>
                </form>
                {#if article.selfUser}
                <a href="/{article.id}" role="button" class="outline constrast" style="width: 100%;">Edit Article</a>
                {/if}
                <footer>by {article.author_name}</footer>
            </article>
        {:else}
        <div style="display: flex; height: 100%; align-items: center;">
            <h3>There is no articles at the moment</h3> 
        </div>
        {/each}
        
    </div>
    <form action="?/createArticle" method="post" use:enhance>
        <h3>New Articles:</h3>
        <label for="title">Title</label>
        <input type="text" id="title" name="title" on:keydown={handleSubmit} required>
        <label for="content">Content</label>
        <textarea name="content" id="content" rows={5} required on:keydown={handleSubmit}></textarea>
        <button type="submit" bind:this={submitButton}>Add Article</button>
    </form>
</div>
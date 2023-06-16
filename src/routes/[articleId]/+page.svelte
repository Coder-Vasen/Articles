<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData;

    $: ({article} = data)

    let submitButton: HTMLButtonElement;

    function handleSubmit(e: KeyboardEvent){
        if (e.ctrlKey && e.key =="Enter") submitButton.click();
    }
</script>

<form action="?/editArticle&id={article.id}" method="post">
    <h3>Edit Article: {article.title}</h3>
    <label for="title">Title</label>
    <input type="text" id="title" name="title" value="{article.title}">
    <label for="content">Content</label>
    <textarea name="content" id="content" rows={5} value="{article.content}"></textarea>
    <button type="submit" bind:this={submitButton}>Edit Article</button>
</form>
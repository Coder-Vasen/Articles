<script lang="ts">
	import { page } from "$app/stores";
	console.log($page.error?.message)
</script>

<h1>{$page.error?.message}</h1>
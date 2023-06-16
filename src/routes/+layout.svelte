<script lang="ts">
	import '@picocss/pico'
	import type { LayoutData } from './$types';
	import { enhance } from '$app/forms';

	export let data: LayoutData
</script>

<div class="container">
	<nav>
		<ul>
			<li>
				<strong>
					<a href="/"> Blogly </a>
				</strong>
			</li>
		</ul>
		<ul>
			
			{#if !data.user}
				<li><a href="/register">Register</a></li>
				<li><a href="/login" role="button">Login</a></li>
			{:else}
				<li><a href="/">Home</a></li>
				<form action="/logout" method="post" use:enhance>
					<button type="submit" class="secondary outline constrast">Logout</button>
				</form>
			{/if}
		</ul>
	</nav>
	<slot />
</div>
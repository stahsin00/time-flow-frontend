<script>
	let menuItems = ['Home', 'Dashboard', 'Settings'];
</script>

<a href="/">
	<header>
		<img src="/clock-solid.svg" alt="Logo" class="logo" />
		<div class="heading">TimeFlow</div>
		<!-- <nav>
        <ul>
            {#each menuItems as item}
                <li>{item}</li>
            {/each}
        </ul>
    </nav> -->
	</header>
</a>

<style>
	header {
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		padding: 15px;
		background-color: #6200ea;
		color: white;
	}

	nav ul {
		display: flex;
		list-style: none;
		padding: 0;
	}

	nav li {
		margin-right: 15px;
		cursor: pointer;
	}

	nav li:hover {
		text-decoration: underline;
	}

	.logo {
		max-height: 2.5rem;
	}

	.heading {
		font-size: 2rem;
		font-weight: bold;
		padding-left: 0.5rem;
		font-family: Arial, sans-serif;
	}
</style>

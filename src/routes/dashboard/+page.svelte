<script>
	import Header from '../../lib/components/Header.svelte';
	import Nav from '../../lib/components/Nav.svelte';
	import Graph from '../../lib/components/Graph.svelte';
	import BigText from '../../lib/components/BigText.svelte';
	import AdviceCard from '../../lib/components/AdviceCard.svelte';
	import PieChart from '../../lib/components/PieChart.svelte';
	import BarChart from '../../lib/components/BarChart.svelte';
	import Footer from '../../lib/components/Footer.svelte';

	let selection = 'D';

	// Placeholder data for now, we'll update this later
	let eventData = {
		event_type: 'eating food',
		event_start: 'September 21, 2024 at 10:09:57 AM UTC-7'
	};

	let adviceList = [
		{ text: 'Take short breaks every hour.' },
		{ text: 'Stay hydrated and eat regularly.' },
		{ text: 'Break down tasks into smaller pieces.' }
	];
</script>

<!-- Header component -->
<Header />

<main>
	<!-- Big text component (placeholder for now) -->
	<BigText eventType={eventData.event_type} eventStart={eventData.event_start} />

	<!-- Placeholder for graph and pie chart components -->
	<Graph />

	<!-- <BarChart/> -->
	<BarChart />

	<!-- <Stats {selection}/> -->
	<div>
		<span>Broken down by category: </span>
		<br />
		<div id="piechartdiv">
			<Nav bind:selection />
			<div class="piechart-placeholder">
				<PieChart {selection} />
			</div>
		</div>
	</div>

	<!-- Advice cards -->
	 <div>
		<span>Advice for you: </span>
		<br />
		<section class="advice-section">
			{#each adviceList as advice}
				<AdviceCard adviceText={advice.text} />
			{/each}
		</section>
	 </div>
	
</main>

<Footer/>

<!-- <button on:click={() => mockData()}>TEMP</button> -->

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
		font-family: Arial, sans-serif;
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.graph-placeholder,
	.piechart-placeholder {
		background-color: #f0f0f0;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
	}

	.advice-section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 15px;
		margin-top: 5px;
	}

	@media (max-width: 600px) {
		main {
			padding: 10px;
		}

		.piechart-placeholder {
			height: 100%;
		}
	}

	:global(body) {
		/* this will apply to <body> */
		margin: 0;
		padding: 0;
	}

	#piechartdiv {
		border: 3px solid black;
		border-radius: 5px;
		margin-top: 5px;
	}
</style>

<script>
	import { onMount } from 'svelte';
	import { Chart, TimeScale, BarController, BarElement } from 'chart.js';
	import 'chartjs-adapter-date-fns'; // Adapter for handling dates in Chart.js
	import { getLast24Hours } from '../firebase';
	import { listenForDocument } from '../firebase.js'; // Import the reusable listener function

	Chart.register(TimeScale, BarController, BarElement);

	let chartCanvas;
	let chart = null; // Keep track of the current chart instance
	let events = [];
	let unsubscribe;

	const docPath = 'metadata/current_event';

	const colorMap = {
		STUDY: '#3498db',
		WORK: '#5b59f7',
		READ: '#7f8cfd',
		EXERCISE: '#9b59b6',
		EAT: '#2c3e99',
		RESEARCH: '#6c5ce7',
		GAME: '#a29bfe',
		CODE: '#8e44ad',
		CLEAN: '#4d73ff',
		SLEEP: '#5e35b1',
    BAD: 'grey',
    GOOD: 'yellow',
    NEUTRAL: '#222',
    GREAT: 'orange'
	};

	// Define available time options and selected time
	const timeOptions = [5, 10, 30, 60, 120]; // Minutes
	let selectedTime = 10; // Default value (10 minutes)

	onMount(async () => {
		unsubscribe = await listenForDocument(docPath, async (event) => {
      console.log("FETCHING NEW DATA FOR BARCHART")
			let querySnapshot = await getLast24Hours();
			events = []; // Reset events before adding new ones
			querySnapshot.docs.forEach((doc) => {
				let e_data = doc.data();
				events.push({
					label: e_data.event_type[2],
					data: e_data.event_type,
					start: e_data.event_start.toDate(),
					end: e_data.event_end.toDate(),
					duration: e_data.duration
				});
			});

			console.log('EVENTS', events);

			// Draw the chart with initial data
			drawChart();
		});
	});

	// Function to draw or update the chart
	function drawChart() {
		// If no events, return early to avoid crashing
		if (events.length === 0) {
			console.log('No events data available.');
			return;
		}

		const now = new Date();
		const timeRange = new Date(now.getTime() - selectedTime * 60 * 1000); // Calculate the new time range

		// Destroy the chart if it exists to avoid overlapping charts
		if (chart) {
			chart.destroy();
		}

		const ctx = chartCanvas.getContext('2d');
		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: events.map((e) => e.data), // This can be the event type or description
				datasets: [
					{
						data: events.map((e) => ({
							x: e.start,
							y: 0.5, // Arbitrary Y value to keep it uniform for the bar chart
							duration: (e.end - e.start) / (60 * 1000), // Duration in minutes
							label: e.data // The actual event label
						})),
						backgroundColor: events.map((e) => {
                const eventType = e.data[1];
                return colorMap[eventType] || 'grey';
            }),
						barThickness: 20
					}
				]
			},
			options: {
				indexAxis: 'x',
				scales: {
					x: {
						type: 'time',
						time: { unit: 'minute' },
						min: timeRange,
						max: now,
						title: { display: true, text: 'Time' }
					},
					y: { display: false }
				},
				plugins: {
					tooltip: {
						callbacks: {
							label: (tooltipItem) => {
								let eventLabel = tooltipItem.raw.label;
								let duration = tooltipItem.raw.duration;
								return `${eventLabel}: ${duration} minutes`;
							}
						}
					},
					legend: { display: false }
				},
				parsing: {
					xAxisKey: 'x',
					yAxisKey: 'y'
				}
			}
		});
	}

	// Watch for changes to `selectedTime` and redraw the chart
	$: selectedTime, drawChart();

	// Helper function to handle changes in the dropdown
	function handleTimeChange(event) {
		selectedTime = event.target.value;
	}
</script>

<!-- HTML for the dropdown and chart -->
<div id="barchartdiv">
	<span>
		Your last
		<select on:change={handleTimeChange} bind:value={selectedTime}>
			{#each timeOptions as time}
				<option value={time}>{time} minutes</option>
			{/each}
		</select>
		were spent...
	</span>
	<br />
	<canvas bind:this={chartCanvas} width="800" height="100"></canvas>
</div>

<style>
	canvas {
		border: 3px solid black;
		border-radius: 5px;
		margin-top: 5px;
	}

	#barchartdiv {
		width: 100%;
	}
</style>

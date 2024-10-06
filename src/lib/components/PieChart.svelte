<script>
	// Import necessary modules and functions from Svelte and external libraries
	import { onMount } from 'svelte';  // Svelte lifecycle method to run code when the component is mounted
	import Chart from 'chart.js/auto';  // Chart.js for creating visual charts
	import { getDay, getMonth, getWeek, getYear, queryDocument } from '../firebase';

    export let selection = 'D'; //TODO

	// Variables to hold the chart and the canvas DOM element
	let chart;
	let canvas;

	// A color map to associate event types with specific colors
	const colorMap = {
        "STUDY": '#3498db',   // Bright Blue
        "WORK": '#5b59f7',    // Vibrant Periwinkle
        "READ": '#7f8cfd',    // Electric Sky Blue
        "EXERCISE": '#9b59b6',// Rich Amethyst
        "EAT": '#2c3e99',     // Deep Blue
        "RESEARCH": '#6c5ce7',// Bright Lavender
        "GAME": '#a29bfe',    // Soft Orchid
        "CODE": '#8e44ad',    // Vivid Purple
        "CLEAN": '#4d73ff',   // Bold Light Blue
        "SLEEP": '#5e35b1'    // Dark Royal Purple
    }

	$: if (selection) {
        renderChart();
    }

	// onMount lifecycle method to fetch data and create the chart when the component is mounted
	onMount(() => {
        renderChart(); // Render chart when the component is mounted
	});

    // Function to render the chart
    async function renderChart() {
        // Destroy the previous chart if it exists
        if (chart) {
            chart.destroy();
        }

        let querySnapshot;
        switch (selection) {
            case 'D':
                querySnapshot = await getDay();
                break;
            case 'W':
                querySnapshot = await getWeek();
                break;
            case 'M':
                querySnapshot = await getMonth();
                break;
            case 'Y':
                querySnapshot = await getYear();
                break;
        }

		// Function to process Firestore data into a format usable by Chart.js
		function parseFireStoreData(querySnapshot) {
			const eventTypeCounts = {};

            querySnapshot.docs.forEach((doc) => {
                const data = doc.data();
                const eventType = data.event_type;

                // Convert Firebase Timestamps to JavaScript Date objects
				const eventDate = data.event_start.toDate();
				const endDate = data.event_end.toDate();

				// Calculate the duration of the event in hours
				const hours = (endDate - eventDate) / (1000 * 60 * 60);

                if (eventTypeCounts[eventType]) {
                    eventTypeCounts[eventType] += hours;
                } else {
                    eventTypeCounts[eventType] = hours;
                }
            });

            const totalHours = Object.values(eventTypeCounts).reduce((sum, hours) => sum + hours, 0);

            const chartData = {
                labels: Object.keys(eventTypeCounts).map(type => {
                    const splitType = type.split(',');
                    return splitType[1];
                }),
                datasets: [
                    {
                        data: Object.values(eventTypeCounts).map(hours => (hours / totalHours) * 100),
                        backgroundColor: Object.keys(eventTypeCounts).map(type => {
                            const splitType = type.split(',');
                            return colorMap[splitType[1]] || 'grey';
                        })
                    }
                ]
            };

            return chartData;
		}

		// Chart.js configuration
		const config = {
            type: 'pie',
            data: parseFireStoreData(querySnapshot),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right'
                    },
                    title: {
                        display: false,
                    }
                }
            },
        };

		// Create the Chart.js chart on the canvas
		chart = new Chart(canvas, config);
    }
</script>





<!-- Canvas wrapper for the chart -->
<div class="canvasWrapper">
	<canvas bind:this={canvas}></canvas>
</div>


<style>
	/* Styling for the canvas wrapper */
	.canvasWrapper {
		width: 100%; 
        max-width: 25rem; 
		height: 100%;  
		display: flex;
		justify-content: center; 
	}

	/* Styling for the canvas */
	canvas {
		width: 100%;  
		height: auto;
        padding: 1rem; 
	}
    
</style>

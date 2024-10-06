<script>
	// Import necessary modules and functions from Svelte and external libraries
	import { onMount } from 'svelte'; // Svelte lifecycle method to run code when the component is mounted
	import Chart from 'chart.js/auto'; // Chart.js for creating visual charts
	import { initializeApp } from 'firebase/app'; // Firebase app initialization
	import {
		query,
		collection,
		getDocs,
		orderBy,
		getFirestore,
		where,
		Timestamp
	} from 'firebase/firestore'; // Firebase Firestore functions for querying the database

	import {firebaseConfig} from "../firebase_creds.js";
	

	// Initialize Firebase and Firestore database
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	// Labels for the days of the week to display on the chart's X-axis
	const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	// Variables to hold the chart and the canvas DOM element
	let chart;	
	let canvas;

	// A color map to associate event types with specific colors
	const colorMap = {
		STUDY: '#3498db', // Bright Blue
		WORK: '#5b59f7', // Vibrant Periwinkle
		READ: '#7f8cfd', // Electric Sky Blue
		EXERCISE: '#9b59b6', // Rich Amethyst
		EAT: '#2c3e99', // Deep Blue
		RESEARCH: '#6c5ce7', // Bright Lavender
		GAME: '#a29bfe', // Soft Orchid
		CODE: '#8e44ad', // Vivid Purple
		CLEAN: '#4d73ff', // Bold Light Blue
		SLEEP: '#5e35b1' // Dark Royal Purple
	};

	// onMount lifecycle method to fetch data and create the chart when the component is mounted
	onMount(async () => {
		// Get the current date and set it to yesterday (for demo purposes; TODO to adjust this logic)
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate() - 1); // Subtract one day from the current date

		// Calculate the start and end of the current week (Sunday to Saturday)
		const startOfWeek = new Date(currentDate);
		startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
		startOfWeek.setHours(0, 0, 0, 0); // Set to the start of the day (midnight)

		const endOfWeek = new Date(startOfWeek);
		endOfWeek.setDate(startOfWeek.getDate() + 6);
		endOfWeek.setHours(23, 59, 59, 999); // Set to the end of the day (11:59 PM)

		// Convert the start and end of the week to Firebase Timestamps for querying Firestore
		const startOfWeekTimestamp = Timestamp.fromDate(startOfWeek);
		const endOfWeekTimestamp = Timestamp.fromDate(endOfWeek);

		// Query Firestore for events within the week, ordered by event start time
		let querySnapshot;
		try {
			const eventsQuery = query(
				collection(db, 'test'), // Query the 'events' collection
				where('event_start', '>=', startOfWeekTimestamp), // Filter by start time after or equal to the start of the week
				where('event_start', '<=', endOfWeekTimestamp), // Filter by end time before or equal to the end of the week
				orderBy('event_start') // Order results by event start time
			);

			// Get the documents that match the query
			querySnapshot = await getDocs(eventsQuery);
			// Log each event's data (for debugging)
			querySnapshot.forEach((doc) => {
				// console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
			});
		} catch (error) {
			// Handle errors in fetching data from Firestore
			console.error('Error fetching Firestore data:', error);
		}

		// Function to process Firestore data into a format usable by Chart.js
		function parseFireStoreData() {
			// Map each document to an object that Chart.js can use for rendering datasets
			let prevEnd;
			let prevDay;
			const temp = [];

			querySnapshot.docs.forEach((doc) => {
				const data = doc.data(); // Extract the document's data

				// Convert Firebase Timestamps to JavaScript Date objects
				const eventDate = data.event_start.toDate();
				const endDate = data.event_end.toDate();

				// Calculate the duration of the event in hours
				const hours = (endDate - eventDate) / (1000 * 60 * 60);

				// console.log(`start: ${eventDate} - end: ${endDate}; hours: ${hours}`);

				// Get the day of the week for the event (0 = Sunday, 6 = Saturday)
				const weekDay = eventDate.getDay();
				if (prevDay && prevDay == weekDay) {
					let dif = (eventDate - prevEnd) / (1000 * 60 * 60);
					const weekArray = new Array(7).fill(0);
					weekArray[weekDay] = dif;
					temp.push({
						label: '', // Label for the dataset (e.g., event type)
						data: weekArray, // Data array (hours for each day of the week)
						backgroundColor: 'rgba(0,0,0,0)', // Color of the bars, with fallback to grey
						tooltip: {
							enabled: false
						}
					});
				}
				prevDay = weekDay;
				prevEnd = endDate;

				// Initialize an array for the week with zero hours
				const weekArray = new Array(7).fill(0);

				// Assign the hours to the corresponding day if the event lasts more than 1 hour
				weekArray[weekDay] = hours;
				// console.log(weekArray);

				// Return the dataset object for Chart.js
				temp.push({
					label: data.event_type[1], // Label for the dataset (e.g., event type)
					data: weekArray, // Data array (hours for each day of the week)
					backgroundColor: colorMap[data.event_type[1]] || 'grey' // Color of the bars, with fallback to grey
				});
			});

			// Log the processed data for debugging
			// console.log(temp);

			// Return the final datasets array
			return temp;
		}

		// Chart.js data configuration
		const data = {
			labels: labels, // X-axis labels (days of the week)
			datasets: parseFireStoreData() // Processed data from Firestore
		};

		// Chart.js configuration
		const config = {
			type: 'bar', // Bar chart
			data: data, // Chart data
			options: {
				plugins: {
					legend: {
						display: false // Disable the legend
					}
				},
				responsive: true, // Make the chart responsive
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: true,
						callbacks: {
							label: function (tooltipItem) {
								const dataset = tooltipItem.dataset;
								const data = tooltipItem.raw;

								if (dataset.label === '' || data === 0) {
									return null;
								}

								return `${dataset.label}: ${data}`;
							}
						}
					}
				},
				scales: {
					x: {
						stacked: true // Stack bars on the X-axis
					},
					y: {
						stacked: true, // Stack bars on the Y-axis
						min: 0, // Minimum Y-axis value (hours)
						max: 23.98, // Maximum Y-axis value (hours)
						reverse: true, // Reverse the Y-axis (start from top)
						ticks: {
							stepSize: 1, // One hour per tick
							callback: function (value) {
								// Custom label for hours (12-hour format with AM/PM)
								if (value === 23.98) return '';
								const hour = value % 12 || 12;
								const period = value < 12 ? 'AM' : 'PM';
								return `${hour}:00 ${period}`;
							}
						}
					}
				}
			}
		};

		// Create the Chart.js chart on the canvas
		chart = new Chart(canvas, config);

		// Cleanup function to destroy the chart when the component is unmounted
		return () => {
			chart.destroy();
		};
	});
</script>

<!-- Canvas wrapper for the chart -->
<div id="graphdiv">
	<span> Last week at a glance: </span>
	<br />
	<div class="canvasWrapper">
		<canvas bind:this={canvas}></canvas>
	</div>
</div>

<style>
	/* Styling for the canvas wrapper */
	.canvasWrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		border: 3px solid black;
    border-radius: 5px;
	margin-top: 5px;
	}

	/* Styling for the canvas */
	canvas {
		width: 85vw;
		height: 100%;
	}

</style>

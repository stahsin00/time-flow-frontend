<script>
    import { onMount, onDestroy } from 'svelte';
    import { listenForDocument } from '../firebase.js'; // Import your listener function

    let currentMood = []; // Array to hold the current mood values
    let unsubscribe; // Variable to hold the unsubscribe function
    const docPath = 'metadata/mood'; // Replace with your actual path

    // Asynchronous onMount function
    onMount(async () => {
        unsubscribe = await listenForDocument(docPath, (moodData) => {
            console.log("Received mood data:", moodData); // Log the received mood data

            if (!moodData || !moodData.mood) {
                currentMood = ["No mood data available"]; // Handle no mood data
            } else {
                currentMood = moodData.mood; // Update current mood with the fetched data
            }
        });
    });

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe(); // Unsubscribe from the listener when the component is destroyed
        }
    });
</script>

<style>
    .mood-container {
        padding-left: 10px;
        border: 3px solid;
        border-radius: 5px;
    }
</style>

<div class="mood-container">
    <h2>Current Mood: {currentMood[1]} {currentMood[4]}</h2>
</div>

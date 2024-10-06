// src/stores/backgroundStore.js
import { writable } from 'svelte/store';
import { getMoodData } from './firebase.js'; // Import your Firebase function

// Default background color
export const backgroundColor = writable('#ffffff');

// Mood store
export const mood = writable([]);

// Function to fetch mood data from Firebase
export const fetchMoodData = async () => {
    try {
        const moodData = await getMoodData(); // Assume this fetches mood data from Firebase
        mood.set(moodData); // Update the mood store
    } catch (error) {
        console.error('Error fetching mood data:', error);
    }
};

// Fetch mood data when the store is first imported
fetchMoodData();

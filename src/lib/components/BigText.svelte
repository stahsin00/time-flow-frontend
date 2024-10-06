<script>
  import { onMount, onDestroy } from "svelte";
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import { listenForDocument } from "../firebase.js"; // Import the reusable listener function
  
  dayjs.extend(utc);
  
  let eventType = "loading...";
  let eventDuration = ""; // Changed from eventStart to eventDuration
  let unsubscribe; // Variable to hold the unsubscribe function
  const docPath = 'metadata/current_event'; // Replace with your actual path
  let emoji = "";

  // Asynchronous onMount function
  onMount(async () => {
    unsubscribe = await listenForDocument(docPath, async (event) => {
      console.log("Received event data:", event); // Log the received event data

      if (!event || !event.current_event) {
        eventType = "Idling";
        eventDuration = ""; // No duration if idling
      } else {
        eventType = event.current_event[2]; // "down" in this case
        emoji = event.current_event[4]
        eventDuration = await formatEventDuration(event.event_start); // Calculate the duration asynchronously
      }
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe(); // Unsubscribe from the listener when the component is destroyed
    }
  });

  // Asynchronous function to calculate and format the event duration
  async function formatEventDuration(eventStartTimestamp) {
    const eventStart = dayjs(eventStartTimestamp.toDate()); // Convert Firestore Timestamp to Date
    const now = dayjs(); // Current time

    // Calculate the difference in milliseconds
    const diffInMillis = now.diff(eventStart);
    
    // Calculate hours and minutes
    const hours = Math.floor(diffInMillis / (1000 * 60 * 60)); // Convert to hours
    const minutes = Math.floor((diffInMillis % (1000 * 60 * 60)) / (1000 * 60)); // Convert remaining milliseconds to minutes

    return `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
</script>

<div class="big-text">
  {#if eventType === "Idling"}
    {eventType}...
  {:else}
    <span class="small">Currently working on:</span>
    <br>
   {emoji} {eventType.charAt(0).toUpperCase() + eventType.slice(1)} for {eventDuration} {emoji}
  {/if}
</div>

<style>
  .big-text {
    font-size: 2rem;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    background-color: rgb(179, 190, 186);
    border: 3px solid black;
    border-radius: 5px;
    width: 100%;
  }

  .small {
    font-size: 1.2rem;
    font-weight: normal;
  }

  @media (max-width: 600px) {
    .big-text {
      font-size: 1.5rem;
    }
  }
</style>

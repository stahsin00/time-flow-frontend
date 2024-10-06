<script>
    export let selection;
</script>

<div class="navWrapper">
    <!-- <span>Your time broken down:</span>
    <br> -->
    <nav>
        <button class:selected={selection === 'D'}  on:click={() => {selection = 'D'}}>Day</button>
        <button class:selected={selection === 'W'}  on:click={() => {selection = 'W'}}>Week</button>
        <button class:selected={selection === 'M'}  on:click={() => {selection = 'M'}}>Month</button>
        <button class:selected={selection === 'Y'}  on:click={() => {selection = 'Y'}}>Year</button>
    </nav>
</div>

<style>
    .navWrapper {
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    flex: auto;
    flex-direction: column;
}

nav {
    display: flex;
    gap: 1rem; /* Adjusts the spacing between buttons */
    justify-content: center;
    align-items: center;
    height: 3rem;
}

button {
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #111;
    color: white;
    padding: 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin: 1rem;
    gap: 200px;
    flex: 1; /* Allows buttons to expand and fill available space */
    max-width: 10rem; /* Restricts buttons from growing too large */
    font-size: larger;
    transition: all ease-out 250ms;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button.selected {
    background-color: #6200ea;
}

button:not(.selected):hover {
    cursor: pointer;
    background-color: #444;
}

</style>

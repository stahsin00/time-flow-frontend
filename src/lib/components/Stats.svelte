<script>
	import Graph from "./Graph.svelte";

    export let selection = null;

    const testData = [
        { name: 'Sleep', startTime: '2023-10-05T22:00:00Z' },
        { name: 'Study', startTime: '2023-10-06T09:00:00Z' },
        { name: 'Exercise', startTime: '2023-10-06T07:00:00Z' },
        { name: 'Work', startTime: '2023-10-06T10:00:00Z' },
        { name: 'Leisure', startTime: '2023-10-06T18:00:00Z' },
        { name: 'Reading', startTime: '2023-10-06T20:00:00Z' },
        { name: 'Meals', startTime: '2023-10-06T12:00:00Z' },
        { name: 'Study', startTime: '2023-10-06T17:00:00Z' },
        { name: 'Leisure', startTime: '2023-10-06T08:00:00Z' },
        { name: 'Chores', startTime: '2023-10-06T15:00:00Z' },
    ];

    function displayStats() {
        const sortedData = [...testData].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        const nameHours = sortedData.reduce((acc, curr, index) => {
            const currentStart = new Date(curr.startTime);
            const nextStart = index < sortedData.length - 1 ? new Date(sortedData[index + 1].startTime) : new Date();

            const durationInHours = (nextStart - currentStart) / (1000 * 60 * 60);

            acc[curr.name] = (acc[curr.name] || 0) + durationInHours;

            return acc;
        }, {});

        return Object.entries(nameHours).map(([name, hours]) => ({ name, hours: hours.toFixed(2) }));
    }

</script>

<Graph />
{selection}
<!-- <div>
    {#each displayStats() as { name, hours }, index}
        <p key={index}>
            {name}: {hours} hours
        </p>
    {/each}
</div> -->

<style>

</style>

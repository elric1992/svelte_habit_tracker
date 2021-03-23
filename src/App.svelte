<script lang="ts">
    import {format} from "date-fns";
    import {send, state} from "./HabitMachine";
    import Day from "./Day.svelte";

    $: currentDate = $state.context.currentDate;
    $: currentMonth = $state.context.currentMonth;

    document.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "ArrowLeft":
                send({ type: "NAVIGATE", direction: "BACK" });
                break;
            case "ArrowRight":
                send({ type: "NAVIGATE", direction: "FORWARD" });
                break;
            case "Home":
                send({ type: "NAVIGATE", direction: "HOME" });
                break;
        }
    });
</script>

<main>
    <h1><b>Habit control</b></h1>
    <h2>{format(currentDate, 'MMMM - yyyy')}</h2>
    <div>
        <button on:click={() => send({type: 'NAVIGATE', direction: 'BACK'})}>Back</button>
        <button on:click={() => send({type: 'NAVIGATE', direction: 'HOME'})}>Home</button>
        <button on:click={() => send({type: 'NAVIGATE', direction: 'FORWARD'})}>Forward</button>
    </div>
    <div class="grid auto-fit">
        {#each currentMonth as day}
            <Day {day}/>
        {/each}
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        /*max-width: 240px;*/
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        /*font-size: 4em;*/
        font-weight: 100;
    }

    .grid {
        display: grid;
        grid-gap: 2vw;
        margin: 5px;
    }

    .grid > div {
        font-size: 5vw;
        padding: .5em;
        background: gold;
        text-align: center;
    }

    .auto-fill {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    .auto-fit {
        grid-template-columns: repeat(auto-fit, minmax(50px, 2fr));
    }
</style>

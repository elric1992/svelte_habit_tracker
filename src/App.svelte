<script lang="ts">
    import {format} from "date-fns";
    import {state} from "./HabitMachine";

    $: currentDate = $state.context.currentDate;
</script>

<main>
    <div>
        <h1>Habit control</h1>
        <h2>{format(currentDate, 'MMMM - yyyy')}</h2>

        <div>
            <button></button>
        </div>
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

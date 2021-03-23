<script lang="ts">
    import {format} from "date-fns";

    export let day: Date;
</script>


<div class="day">{format(day, 'EEE. do')}</div>

<style>
    div.day {
        width: 100%;
        border: 1px solid black;
        margin: 2px;
        padding: 5px;
        border-radius: 10px;
        background-color: #ffebcd;
    }
    div.day:hover {
        background-color: #999999;
    }
</style>





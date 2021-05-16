<script lang="ts">
    import { onMount } from "svelte";
    export let page: "gif" | "empty" = tsvscode.getState()?.page || "empty";
    

</script>

<style>
    div{
        color: orange;
    }
</style>
<div>
    <img src="https://puu.sh/HFIvw/55e8fda839.gif" alt="">
</div>
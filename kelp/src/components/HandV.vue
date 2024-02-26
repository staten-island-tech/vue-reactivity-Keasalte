<template>
<div class = "value">
<p>Value: {{value.val}}</p>
</div>


</template>

<script setup>
const value = defineProps(['val'])
console.log(value);


</script>

<style scoped>


</style>

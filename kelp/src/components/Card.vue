<template>
  <div class="card">
    <img :src="`${props.card.value}_of_${props.card.suit}.png`" />
  </div>
</template>

<script setup>
const props = defineProps(["card", "who"]);
console.log(props.card);
</script>

<style scoped>

</style>

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
img {
  min-height: 350px;
  max-height: 350px;
  min-width: 250px;
  max-width: 250px;
}
</style>

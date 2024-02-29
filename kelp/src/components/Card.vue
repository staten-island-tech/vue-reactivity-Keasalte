<template>
  <div class="card">
    <img src="/moonshine.jpg" v-if="i === 1 && !show" />
    <img :src="`${props.card.value}_of_${props.card.suit}.png`" v-else />
  </div>
</template>

<script setup>
const props = defineProps(["card", "who", "i", "show"]);

console.log(props.card);
</script>

<style scoped></style>

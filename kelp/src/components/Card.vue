<template>
  <div class="card">
    <p>this is {{ props.card.suit }}</p>
    <p>its value is {{ props.card.value }}</p>
    <p>real value is {{ props.card.realvalue }}</p>
  </div>
</template>

<script setup>
const props = defineProps(["card", "who"]);
console.log(props.card);

</script>

<style scoped>
* {
  background-color: rgb(240, 193, 193);
}
.card {
  border: 2px solid black;
}
</style>

<template>
  <div class="value">
    <p>Value: {{ value.val }}</p>
  </div>
</template>

<script setup>
const value = defineProps(["val", "who"]);
console.log(value);
</script>

<style scoped></style>

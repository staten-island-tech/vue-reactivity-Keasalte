<script setup>
cards = {
  heart: ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"],
  diamond: ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"],
  club: ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"],
  spade: ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"],
};

//Numerical value of cards -> The class (heart, club,etc) ->
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

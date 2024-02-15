<script setup>
import { compileScript } from "vue/compiler-sfc";
import Card from "../components/Card.vue";
import { ref, setBlockTracking } from "vue";

function createCards() {
  const cards = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
  const r = [];
  const suits = ["heart", "spade", "club", "diamond"];

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < cards.length; i++) {
      r.push({ value: cards[i], suit: suits[j] });
    }
  }

  for (let index = 0; index < 10; index++) {
    for (let i = 0; i < r.length; i++) {
      // picks the random number between 0 and length of the deck
      let shuffle = Math.floor(Math.random() * r.length);

      //swap the current with a random position taken from stackoverflow https://stackoverflow.com/questions/73603123/function-for-shuffling-a-deck-of-cards-js
      [r[i], r[shuffle]] = [r[shuffle], r[i]];
    }
  }
  return r;
}
let deck = createCards();
realvalueinator(deck);

const ph = ref([]);
const w = ref([]);

const playerhand = ph.value;
const winner = w.value;

function wait(ms) {
  return new Promise((joever) => {
    setTimeout(() => {
      joever("it's joever");
    }, ms);
  });
}

function realvalueinator(dude) {
  dude.forEach((s) => {
    switch (s.value) {
      case "king":
        s.realvalue = 10;
        break;
      case "queen":
        s.realvalue = 10;
        break;
      case "jack":
        s.realvalue = 10;
        break;
      case "ace":
        s.realvalue = 11;
        break;
      default:
        s.realvalue = s.value;
    }
  });
}

function addvalues(hand) {
  console.log(hand);
  const values = Array.from(hand).reduce(
    (accumulator, currentValue) => accumulator + currentValue.realvalue,
    0
  );
  return values;
}

let dealervalue = 0;
let playervalue = 0;

async function deak(hand, val) {
  console.log(hand);
  hand.push(deck[deck.length - 1]);
  deck.pop();
  realvalueinator(hand);
  val = addvalues(hand);
  if (val > 21) {
    hand.forEach((card) => {
      if (card.value === "ace" && val > 21) {
        card.realvalue = 1;
        val = addvalues(hand);
      }
    });
  }
  await wait(700);
}

function checkwinfail(handvalue) {
  if (handvalue === 21) {
    console.log("win");
  } else if (handvalue > 21) {
    console.log("lose");
  } else {
    console.log("neither");
  }
}

function riggedcheck(hand) {
  console.log("howdy");
  const handvalue = addvalues(hand);
  if (handvalue === 21) {
    console.log("win");
  } else if (handvalue > 21) {
    console.log("rigging time!");
    realvalueinator(hand);
    hand[1].realvalue = 0;
    let cheatnum = 21 - addvalues(hand);
    const possiblecheats = deck.filter((card) => card.realvalue === cheatnum);
    if (possiblecheats.length > 0) {
      hand[1] = possiblecheats[0];
    } else {
      realvalueinator(hand);
      console.log("winner lose haha");
    }
    console.log(addvalues(hand));
  } else {
    console.log("neither");
    console.log(hand);
  }
}

async function startgame(event) {
  event.target.style.display = "none";
  deak(playerhand, playervalue);
  await wait(700);
  deak(winner, dealervalue);
  await wait(700);
  deak(playerhand, playervalue);
  await wait(700);
  deak(winner, dealervalue);
  realvalueinator(playerhand);
  realvalueinator(winner);
  console.log(playerhand, winner);
  playervalue = addvalues(playerhand);
  dealervalue = addvalues(winner);
  console.log(playervalue, dealervalue);
  checkwinfail(playervalue);
  document.querySelector("#dealbutton").style.display = "block";
}

function deal() {
  deak(playerhand, playervalue);
  checkwinfail(playervalue);
  deak(winner, dealervalue);
  riggedcheck(winner);
}
</script>

<template>
  <main>
    <div class="hand">
      <Card :card="cardObject" who="dealer" v-for="cardObject in w" />
    </div>
    <div class="hand">
      <Card :card="cardObject" who="player" v-for="cardObject in ph" />
    </div>
  </main>
  <button @click="startgame">Start Game!</button>
  <button @click="deal" style="display: none" id="dealbutton">deal!</button>
</template>

<style>
.hand {
  display: flex;
  gap: 10px;
  margin: 10px;
}
</style>

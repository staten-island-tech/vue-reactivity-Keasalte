<script setup>
import Card from "../components/Card.vue";
import Value from "../components/HandV.vue";
import { ref, setBlockTracking } from "vue";

function createCards() {
  const cards = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
  const r = [];
  const suits = ["hearts", "spades", "clubs", "diamonds"];

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
  playervalue = addvalues(playerhand);
  dealervalue = addvalues(winner);
}

function checkwinfail(handvalue) {
  if (handvalue === 21) {
    beattheodds();
  } else if (handvalue > 21) {
    bust();
  } else {
    console.log("keep play");
  }
}

function riggedcheck(hand) {
  const handvalue = addvalues(hand);
  if (handvalue === 21) {
    winnerwin();
  } else if (handvalue > 21) {
    console.log("rigging time!");
    hand[1].realvalue = 0;
    let cheatnum = 21 - addvalues(hand);
    console.log(cheatnum);
    const possiblecheats = deck.filter((card) => card.realvalue === cheatnum);
    if (possiblecheats.length > 0) {
      hand[1] = possiblecheats[0];
    } else {
      beattheodds();
    }
    winnerwin();
  } else {
    console.log("neither");
  }
}

async function startgame(event) {
  event.target.style.display = "none";
  deak(playerhand, playervalue);
  deak(winner, dealervalue);
  deak(playerhand, playervalue);
  deak(winner, dealervalue);
  document.querySelector("#dealbutton").style.display = "block";
}

function deal() {
  deak(playerhand, playervalue);
  checkwinfail(playervalue);
  deak(winner, dealervalue);
  riggedcheck(winner);
}

function beattheodds() {
  document.querySelector("body").insertAdjacentHTML(
    "beforeend",
    `<dialog class="cc">
      <h2 class = "text">You Win!</h2>
      <button alt = "click escape to return" id="close" class="button-1" autofocus> click to return </button>
     </dialog>`
  );
  document.querySelector("dialog").showModal();
  document.querySelector("dialog").addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
    }
  });
  document.getElementById("close").addEventListener("click", function () {
    reset();
    this.parentElement.remove();
  });
}

function winnerwin() {
  document.querySelector("body").insertAdjacentHTML(
    "beforeend",
    `<dialog class="cc">
      <h2 class = "text">You Suck!</h2>
      <button alt = "click escape to return" id="close" class="button-1" autofocus> click to return </button>
     </dialog>`
  );
  document.querySelector("dialog").showModal();
  document.querySelector("dialog").addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
    }
  });
  document.getElementById("close").addEventListener("click", function () {
    reset();
    this.parentElement.remove();
  });
}

function bust() {
  document.querySelector("body").insertAdjacentHTML(
    "beforeend",
    `<dialog class="cc">
      <h2 class = "text">Busted!</h2>
      <button alt = "click escape to return" id="close" class="button-1" autofocus> click to return </button>
     </dialog>`
  );
  document.querySelector("dialog").showModal();
  document.querySelector("dialog").addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
    }
  });
  document.getElementById("close").addEventListener("click", function () {
    reset();
    this.parentElement.remove();
  });
}

function reset() {
  w.value.splice(0, w.value.length);
  ph.value.splice(0, ph.value.length);
  dealervalue = 0;
  playervalue = 0;
  document.querySelector("#startbutton").style.display = "block";
  document.querySelector("#dealbutton").style.display = "none";
  let deck = createCards();
  realvalueinator(deck);
}
</script>

<template>
  <main>
    <div class="hand">
      <h2>Dealer</h2>
      <Card :card="cardObject" who="dealer" v-for="cardObject in w" />
      <Value :val="dealervalue" />
    </div>
    <div class="hand">
      <h2>Playerhand</h2>
      <Card :card="cardObject" v-for="cardObject in ph" />
      <Value :val="playervalue" />
    </div>
  </main>
  <button @click="startgame" id="startbutton">Start Game!</button>
  <button @click="deal" style="display: none" id="dealbutton">deal!</button>
</template>

<style>
.hand {
  display: flex;
  gap: 10px;
  margin: 10px;
}
</style>

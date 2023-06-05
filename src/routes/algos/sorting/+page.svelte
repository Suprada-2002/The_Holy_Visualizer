<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import alogrithms, { content } from "./algorithm.js";

  let name = $page.url.searchParams.get("q");
  console.log($page);
  const algo = alogrithms[name];
  if (typeof algo == "undefined") console.error("invalid name of algorithim");

  let timeOutId;
  let buttonString = "Slow Down";
  let buttonSecString = "Speed Up";
  let resolveFunction;


  // button logic
  let delayTime = 500;
  let paramsDelay = $page.url.searchParams.get("delay")
  let handleClick = () => {};
  let handleSecClick = () => {};


  // first letter to uppercase
  const description = content[name];
  name = name.split("");
  name[0] = name[0].toUpperCase();
  name = name.join("");

  let bars = [];
  onMount(() => {
    const handleIncrease= () => {
      if (delayTime <= 100) buttonSecString = "Maximum Speed";
      else delayTime = delayTime - 100;
    }
    const handleReset = () => {
      delayTime = 500;
      buttonString = "Slow Down"
      buttonSecString = "Speed Up"
      handleClick = handleSlowDown;
      handleSecClick = handleIncrease;
      handleNext();
    }
    const handleNext = () => {
      clearTimeout(timeOutId);
      resolveFunction();
    }
    const handleSlowDown = () => {
      buttonString = "Next Step"
      buttonSecString = "Reset"
      handleClick = handleNext;
      delayTime = 10000;
      handleSecClick = handleReset;
    }

    if (paramsDelay) {
      delayTime = paramsDelay
      if (delayTime >= 10000) {
        buttonString = "Next Step";
        buttonSecString = "Reset";
        handleClick = handleNext;
        handleSecClick = handleReset;
      } else handleClick = handleSlowDown;
    } else {
      handleClick = handleSlowDown;
      handleSecClick = handleIncrease;
    }

    const n = Math.floor(window.innerWidth / 70);
    bars = initRandomBars(n);
    const delay = (ms) => {
      return new Promise(res => {
          resolveFunction = res;
          timeOutId = setTimeout(res, ms)
        });
    }
    const update = async (newBars) => { 
      bars = newBars;
      await delay(delayTime);
      for (const bar of bars) bar.hl = 0;
    }
    const end = () => {
      console.log("Finished") 
      buttonString = "Restart"
      handleClick = () => {
        window.location.href
        = `${$page.url.pathname}?q=${name.toLowerCase()}&delay=${delayTime}`;
      }
    }
    algo(bars, update, end);
  });

  function initRandomBars(n) {
    const bars = [];
    for (let i = 0; i < n; i++) {
      const rand = Math.floor(Math.random() * 100);
      bars.push({
        number: rand,
        height: ((rand / 100) * 45) + 10,
      });
    }
    return bars;
  }
</script>


<section id="content">
  <h1> {name} Sort </h1>
  <p>
    {#each Object.entries(description.time) as [scenerio, complexity]}
      {scenerio} case: O({complexity[0]}) comparision and O({complexity[1]}) swaps<br>
    {/each}
  </p>
  <button on:click={handleClick}> {buttonString} </button>
  <button on:click={handleSecClick}> {buttonSecString} </button>
</section>
<section id="visuals">
  {#each bars as {height, number, hl}}
  <div style="height: {height}vh;" class={"hl" + hl}>{number}</div>
  {/each}
</section>

<style lang="scss">
  h1 {
    @include heading;
  }
  #content {
    @include section($content-section-height, $section-width);
  }
  #visuals {
    @include section($visual-section-height, $section-width);
    @include flex(row);
    justify-content: center;
    align-items: end;
    gap: 10px;
  }
  div {
    @include shadow;
    @include flex(column);
    align-items: center;
    width: 5vw;
    max-width: 40px;
    border-radius: 2%;
    border: 4px solid #000;
  }
  .hl-1 {
    border-color: transparent;
  }
  .hl1 {
    border-color: $hl;
  }
  .hl2 {
    border-color: red;
  }
</style>

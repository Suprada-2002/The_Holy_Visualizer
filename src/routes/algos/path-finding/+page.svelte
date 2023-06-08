<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import algorithims, { content } from "./algorithim.js";

  let name = $page.url.searchParams.get("q");
  const algo = algorithims[name];
  if (typeof algo == "undefined") console.error("invalid name of algorithim");

  let timeOutId;
  let buttonString = "Slow Down";
  let buttonSecString = "Speed Up";
  let resolveFunction;

  // button logic
  let delayTime = 500;
  let paramsDelay = $page.url.searchParams.get("delay");
  let handleClick = () => {};
  let handleSecClick = () => {};

  // first letter to uppercase
  const description = content[name];
  name = name.split("");
  name[0] = name[0].toUpperCase();
  name = name.join("");

  let canvas;
  onMount(() => {
    const ctx = canvas.getContext("2d");
    const handleIncrease = () => {
      if (delayTime <= 100) buttonSecString = "Maximum Speed";
      else delayTime = delayTime - 100;
    };
    const handleReset = () => {
      delayTime = 500;
      buttonString = "Slow Down";
      buttonSecString = "Speed Up";
      handleClick = handleSlowDown;
      handleSecClick = handleIncrease;
      handleNext();
    };
    const handleNext = () => {
      clearTimeout(timeOutId);
      resolveFunction();
    };
    const handleSlowDown = () => {
      buttonString = "Next Step";
      buttonSecString = "Reset";
      handleClick = handleNext;
      delayTime = 10000;
      handleSecClick = handleReset;
    };

    if (paramsDelay) {
      delayTime = paramsDelay;
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

    const n = 50;
    const map = initMap(n);
    const delay = (ms) => {
      return new Promise((res) => {
        resolveFunction = res;
        timeOutId = setTimeout(res, ms);
      });
    };
    const update = async (map) => {
      console.log(canvas.height, canvas.width);
      ctx.clearRect(0,0,canvas.height, canvas.width);
      const cellSize = Math.floor(canvas.height / n);
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          switch (map[i][j]) {
            case 0:
              ctx.fillStyle = "#bbb";
              break;
            case -1:
              ctx.fillStyle = "#202020";
              break;
            case 2:
              ctx.fillStyle = "red";
              break;
            case 1:
              ctx.fillStyle = "green";
              map[i][j] = 0;
              break;
          }
          ctx.fillRect(cellSize*i, cellSize*j, cellSize - 1, cellSize - 1);
        }
      }
      await delay(delayTime);
    };
    const end = () => {
      console.log("Finished");
      buttonString = "Restart";
      handleClick = () => {
        window.location.href = `${
          $page.url.pathname
        }?q=${name.toLowerCase()}&delay=${delayTime}`;
      };
    };
    algo(map, update, end);
  });

  function initMap(n) {
    const map = [];
    for (let i = 0; i < n; i++) {
      map[i] = [];
      for (let j = 0; j < n; j++) {
        if (Math.random() > 0.9) map[i][j] = -1;
        else map[i][j] = 0;
      }
    }
    return map;
  }
</script>

<section id="content">
  <h1>{name} Algorithim</h1>
  <button on:click="{handleClick}">{buttonString}</button>
  <button on:click="{handleSecClick}">{buttonSecString}</button>
</section>
<section id="visuals">
  <canvas height="600px" width="600px" bind:this="{canvas}"></canvas>
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
  canvas {
    border: 1px solid $fg;
  }
</style>

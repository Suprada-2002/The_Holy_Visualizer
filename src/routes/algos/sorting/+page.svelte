<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import alogrithms, { content } from "./algorithm.js";

  let name = $page.url.searchParams.get("q");
  const algo = alogrithms[name];
  if (typeof algo == "undefined") console.error("invalid name of algorithim");

  // first letter to uppercase
  const description = content[name];
  name = name.split("");
  name[0] = name[0].toUpperCase();
  name = name.join("");

  let bars = [];
  onMount(() => {
    const n = Math.floor(window.innerWidth / 70);
    bars = initRandomBars(n);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const update = async (newBars) => { 
      bars = newBars;
      await delay(500);
      for (const bar of bars) bar.hl = 0;
    }
    const end = () => console.log("Finished");

    algo(bars, update, end, 500);
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
    border: 4px solid $tri;
  }
  .hl1 {
    border-color: $hl;
  }
  .hl2 {
    border-color: red;
  }
</style>

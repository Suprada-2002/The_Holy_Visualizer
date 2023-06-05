<script>
  import { page } from "$app/stores";
  import alogrithms, { content } from "./algorithm.js";

  let name = $page.url.searchParams.get("q");
  const algo = alogrithms[name];
  if (typeof algo == "undefined") console.error("notounf");

  // first letter to uppercase
  const description = content[name];
  console.log(name);
  name = name.split("");
  name[0] = name[0].toUpperCase();
  name = name.join("");

  let bars = initRandomBars(10);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const update = async (newBars) => { 
    bars = newBars;
    await delay(500);
    for (const bar of bars) bar.hl = 0;
  }
  const end = () => console.log("Finished");

  algo(bars, update, end, 500);

  function initRandomBars(n) {
    const bars = [];
    for (let i = 0; i < n; i++) {
      const rand = Math.floor(Math.random() * 100);
      bars.push({
        number: rand,
        height: (rand / 100) * 80,
      });
    }
    return bars;
  }
</script>

<h1> {name} Sort </h1>
<p>
  {#each Object.entries(description.time) as [scenerio, complexity]}
  {scenerio} is O({complexity}) <br>
  {/each}
</p>
<section>
  {#each bars as {height, number, hl}}
  <div style="height: {height}vh;" class={"hl" + hl}>{number}</div>
  {/each}
</section>

<style lang="scss">
  main {
    @include fullscreen;
    @include flex(row);
    @include flex-center;
  }
  section {
    @include section(80vh, 90vw);
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
    border-radius: 2%;
    border: 4px solid $tri;
  }
  .hl1 {
    border-color: $hl;
  }
</style>

<script>
    const serchingLink = [
      {
        title: "Bubble Sort",
        href: "algos/sorting?q=bubble",
        desc: "Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the input list element by element, comparing the current element with the one after it, swapping their values if needed."
      },
      {
        title: "Selection Sort",
        href: "algos/sorting?q=selection",
        desc:"selection sort is an in-place comparison sorting algorithm. It has an O(n²) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar insertion sort."
      },
      {
        title: "Merge Sort",
        href: "algos/sorting?q=merge",
        desc:" merge sort is an efficient, general-purpose, and comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output"
      }
    ]
  </script>

<main>
    <div class="hero">
        <h2>Welcome to the one and all Visualizer</h2>
        <p>Feel free to snoop around</p>
    </div>
    <div class="searchingAlgo">
        <div class="algo">
            {#each serchingLink as {title, href, desc}}
            <h4>{title}</h4>
            <p class="title"><a {href} >view</a></p>
            <p>{desc}</p>
            {/each}
      </div>
    </div>
</main>

<style lang="scss">
    .hero{
        display: grid;
        place-content: center;
        text-align: center;
        padding: 20px 0px;
    }
    .searchingAlgo {
        @include flex(row);
    }
</style>

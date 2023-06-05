async function bubble(bars, update, end) {
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < bars.length - 1; i++) {
      bars[i].hl = 1;
      bars[i + 1].hl = 1;
      await update(bars);
      if (bars[i].number > bars[i + 1].number) {
        const temp = bars[i];
        bars[i] = bars[i + 1];
        bars[i + 1] = temp;
        swapped = true;
        bars[i + 1].hl = 2;
        await update(bars);
      }
    }
  }
  await end();
}

async function selection(bars, update, end) {
  for (let i = 0; i < bars.length; i++) {
    let minValue = bars[i].number;
    let minIndex = i;
    for (let j = i + 1; j < bars.length; j++) {
      if (minValue > bars[j].number) {
        minValue = bars[j].number;
        minIndex = j;
      }
      bars[i].hl = 1;
      bars[j].hl = 1;
      bars[minIndex].hl = 2;
      await update(bars);
    }

    bars[i].hl = 2;
    bars[minIndex].hl = 2;
    const temp = bars[i];
    bars[i] = bars[minIndex];
    bars[minIndex] = temp;
    await update(bars);
  }
  await end();
}

function markUnFocused(bars, start, end) {
  for (let i = 0; i < bars.length; i++) {
    if (i < start || end < i) bars[i].hl = -1;
  }
}

async function mergeSort(bars, start, end, update) {
  bars[start].hl = 1;
  bars[end - 1].hl = 1;
  await update(bars);
  if (end - start == 1) return bars;

  const divider = Math.floor((end - start) / 2) + start;
  const left = await mergeSort(bars, start, divider, update);
  const right = await mergeSort(bars, divider, end, update);

  let leftIndex = start;
  let rightIndex = divider;
  const newBars = [];

  // merging
  while (true) {
    bars[leftIndex].hl = 2;
    bars[rightIndex].hl = 2;
    markUnFocused(bars, start, end);
    await update(bars);
    if (left[leftIndex].number < right[rightIndex].number) {
      newBars.push(left[leftIndex]);
      leftIndex++;
    } else {
      newBars.push(right[rightIndex]);
      rightIndex++;
    }
    if (leftIndex == divider || rightIndex == end) break;
  }

  // adding leftovers
  if (leftIndex != divider) {
    for (; leftIndex < divider; leftIndex++) {
      bars[leftIndex].hl = 2;
      markUnFocused(bars, start, end)
      await update(bars);
      newBars.push(left[leftIndex]);
    }
  } else if (rightIndex != end) {
    for (; rightIndex < end; rightIndex++) {
      bars[leftIndex].hl = 2;
      markUnFocused(bars, start, end)
      await update(bars);
      newBars.push(right[rightIndex]);
    }
  }

  //copying
  for (let i = 0; i < newBars.length; i++) bars[start + i] = newBars[i];
  markUnFocused(bars, start, end);
  await update(bars);
  return bars;
}

async function merge(bars, update, end, delay) {
  await mergeSort(bars, 0, bars.length, update);
  await update(bars);
  await end();
}

export const content = {
  bubble: {
    time: {
      best: ["n", "1"],
      worst: ["n^2", "n^2"],
    },
  },
  selection: {
    time: {
      best: ["n^2", "1"],
      worst: ["n^2", "n"],
    },
  },
  merge: {
    time: {
      worst: ["n - 1", "?"],
    },
  },
};

export default { bubble, selection, merge };

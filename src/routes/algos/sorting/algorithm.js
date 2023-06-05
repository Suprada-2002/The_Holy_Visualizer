async function bubble(bars, update, end, delay) {
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
  end();
}

async function selection(bars, update, end, delay) {
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
};

export default { bubble, selection };

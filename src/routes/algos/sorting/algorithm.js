async function bubble(bars, update, end, delay) {
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < bars.length - 1; i++) {
      if (bars[i].number > bars[i + 1].number) {
        const temp = bars[i];
        bars[i] = bars[i + 1];
        bars[i + 1] = temp;
        swapped = true;
        bars[i].hl = 1;
        await update(bars);
      }
    }
  };
  end();
}

export const content = {
  "bubble": {
    time: {
      best: "1",
      worst: "n^2"
    }
  }
};

export default { bubble };

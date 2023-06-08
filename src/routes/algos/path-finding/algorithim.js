class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  } 
  equal(p) {
    return this.x == p.x && this.y == p.y
  }
  dist(p, x, y) {
    return Math.sqrt(Math.pow(p.x + x - this.x, 2) + Math.pow(p.y + y - this.y, 2));
  }
}

async function dijkstra(map, update, end) {
  // inital setup
  const randCord = () => Math.floor(Math.random() * map.length)
  const goal = new Point(randCord(), randCord());
  map[goal.x][goal.y] = 2;
  const head = new Point(randCord(), randCord());
  map[head.x][head.y] = 2;
  const path = [head];

  while (!goal.equal(head)) {
    const dir  = bestDir(map, goal, path[path.length - 1]);
    path.push(dir);
    for (const cell of path) map[cell.x][cell.y] = 1;
    await update(map);
  }

  await end();
}

function bestDir(map, goal, head) {
  let bestDist = Infinity;
  let bestx = 0, besty = 0;
  for (let x = -1; x < 1; x++) {
    for (let y = -1; y < 1; y++) {
      if (x || y) {
        const dist = goal.dist(head, x, y);
        if (bestDist > dist) {
          bestDist = dist;
          bestx = head.x + x;
          besty = head.y + y;
        }
      }
    }
  }
  return new Point(bestx, besty);
}

export const content = {}
export default { dijkstra };

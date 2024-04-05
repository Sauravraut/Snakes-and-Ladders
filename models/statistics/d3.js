import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 1300 - margin.left - margin.right,
  height = 550 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

export default function createPositionGraph(players, maxTileNumber = 100) {
  // TODO pass maxTurn pos 0 is not always the winner
  const maxTurn = players[0].history.pos.length;

  const x = createXAxis(maxTurn);
  const y = createYAxis(maxTileNumber);
  players.forEach((player) => createLine(x, y, player));
}

function createXAxis(XMax) {
  const x = d3.scaleLinear().domain([0, XMax]).range([0, width]);
  svg
    .append("g")
    .call(
      d3.axisBottom(x).tickFormat((d) => {
        return "Turn " + d;
      })
    )
    .attr("transform", `translate(0, ${height})`);
  return x;
}

function createYAxis(YMax) {
  const y = d3.scaleLinear().domain([0, YMax]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));
  return y;
}

function createLine(x, y, player) {
  const data = player.history.pos.map((val, i) => ({ turn: i, pos: val }));

  const line = d3
    .line()
    .x((d) => x(d.turn))
    .y((d) => y(d.pos));
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", player.color)
    .attr("stroke-width", "2")
    .attr("d", line);
}

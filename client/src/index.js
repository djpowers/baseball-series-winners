import * as d3 from 'd3';

const margin = {
  top: 10,
  right: 10,
  bottom: 20,
  left: 25,
};

const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const teams = [
  'LAD',
  'CLE',
  'HOU',
  'WAS',
  'BOS',
  'ARI',
  'CHC',
  'NYY',
  'COL',
  'MIL',
  'MIN',
  'STL',
  'TB',
  'KC',
  'LAA',
  'TEX',
  'SEA',
  'MIA',
  'TOR',
  'BAL',
  'PIT',
  'OAK',
  'ATL',
  'SD',
  'NYM',
  'CIN',
  'CWS',
  'PHI',
  'DET',
  'SF',
];

const dropDown = d3
  .select('body')
  .append('select')
  .attr('name', 'team-list');

const options = dropDown
  .selectAll('option')
  .data(teams)
  .enter()
  .append('option');

options.text(d => d).attr('value', d => d);

function updateChart() {
  d3.request(`/api/seasons/${new Date().getFullYear() - 1}/${
    d3.select('[name=team-list]').node().value
  }`).get((error, request) => {
    const data = JSON.parse(request.response).teamgamelogs.gamelogs;

    const extentY = d3.extent(
      data,
      d => -1 * parseInt(d.stats.RunDifferential['#text'], 10),
    );

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const yScale = d3
      .scaleLinear()
      .domain(extentY)
      .range([0, height]);

    svg.call(d3.axisLeft(yScale));

    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.game.date))
      .range([0, width]);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      // .attr('transform', `translate(0, ${height / 2})`)
      .call(d3.axisBottom(xScale));

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.game.date))
      .attr('y', (d) => {
        const runDiff = parseInt(d.stats.RunDifferential['#text'], 10);
        return yScale(Math.min(0, -1 * runDiff));
      })
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => {
        const runDiff = parseInt(d.stats.RunDifferential['#text'], 10);
        return Math.abs(yScale(runDiff) - yScale(0));
      })
      .classed('win', d => parseInt(d.stats.Wins['#text'], 10))
      .classed('loss', d => parseInt(d.stats.Wins['#text'], 10) === 0);
  });
}

updateChart();

d3.select('[name=team-list]').on('change', () => {
  d3.select('svg').remove();
  updateChart();
});

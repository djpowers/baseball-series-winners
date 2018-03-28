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

updateChart();

function updateChart() {
  d3
    .request(`/api/seasons/${new Date().getFullYear() - 1}/${
      d3.select('[name=team-list]').node().value
    }`)
    .get((error, request) => {
      const data = JSON.parse(request.response).teamgamelogs.gamelogs;
      console.log(data);

      const extentX = d3.extent(data, d => new Date(d.game.date));
      const extentY = d3.extent(data, d =>
        parseInt(d.stats.RunDifferential['#text']));

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
        .range([height, 0]);

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
        .attr('y', d => yScale(parseInt(d.stats.RunDifferential['#text'])))
        .attr('width', d => xScale.bandwidth())
        .attr(
          'height',
          d => height - yScale(parseInt(d.stats.RunDifferential['#text'])),
        )
        .classed('win', d => parseInt(d.stats.Wins['#text']))
        .classed('loss', d => parseInt(d.stats.Wins['#text']) === 0);
    });
}

d3.select('[name=team-list]').on('change', () => {
  d3.select('svg').remove();
  updateChart();
});

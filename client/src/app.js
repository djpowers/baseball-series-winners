const margin = {
  top: 10,
  right: 10,
  bottom: 20,
  left: 25,
};

const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

d3
  .request(`/api/seasons/${new Date().getFullYear() - 1}/bos`)
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
      );
  });

function graphLine(data) {
  let margin = { top: 10, right: 30, bottom: 30, left: 60 };
  let width = window.innerWidth - margin.left - margin.right;
  let height = 600 - margin.top - margin.bottom;

  const numOfDataPoints = data.length;

  let xScale = d3
    .scaleLinear()
    .domain([0, numOfDataPoints - 1])
    .range([0, width]);
  let yScale = d3
    .scalePow()
    .domain([0, Math.max(...data) + Math.min(...data)])
    .range([height, 0]);

  let line = d3
    .line()
    .x(function (d, i) {
      return xScale(i);
    })
    .y(function (d) {
      return yScale(d);
    })
    .curve(d3.curveMonotoneX);

  let svg = d3
    .select('.d3-line')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  svg.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));
  svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));

  svg.append('path').datum(data).attr('class', 'line').attr('d', line);

  svg
    .selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', function (d, i) {
      return xScale(i);
    })
    .attr('cy', function (d) {
      return yScale(d);
    })
    .attr('r', 5)
    .on('mouseover', function (a, b, c) {
      console.log(a);
      this.attr('class', 'focus');
    })
    .on('mouseout', function () {});
}

function afterRequestLoads() {
  const covidData = JSON.parse(this.response);
  d3.select('#current-cases-text').html(`${d3.format(',')(covidData[0].positive)}`);
  const date = covidData[0].date.toString();
  const formattedDate = `${date.substring(4, 6)}/${date.substring(6, 8)}/${date.substring(0, 4)}`;
  d3.select('#current-cases-date').html(`<i>Updated: ${formattedDate}</i>`);

  let arrDate = covidData.map(function (element) {
    return element.date;
  });
  console.log(arrDate);

  let arrPositive = covidData.map(function (element) {
    return element.positive;
  });
  console.log(arrPositive);

  graphLine(arrPositive.reverse());
}

let request = new XMLHttpRequest();
request.open('GET', 'https://covidtracking.com/api/v1/us/daily.json');
request.onload = afterRequestLoads;
request.send();

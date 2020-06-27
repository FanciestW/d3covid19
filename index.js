function graphLine(data) {
  let margin = { top: 10, right: 30, bottom: 30, left: 60 };
  let width = 560 - margin.left - margin.right;
  let height = 560 - margin.top - margin.bottom;

  let svg = d3
    .select('.d3-line')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
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
}

let request = new XMLHttpRequest();
request.open('GET', 'https://covidtracking.com/api/v1/us/daily.json');
request.onload = afterRequestLoads;
request.send();

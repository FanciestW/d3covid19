let request = new XMLHttpRequest();
request.open('GET', 'https://covidtracking.com/api/v1/us/current.json');

request.onload = function () {
  const data = JSON.parse(this.response);
  d3.select('#current-cases-text').html(`${d3.format(',')(data[0].positive)}`);
  const date = data[0].date.toString();
  const formattedDate = `${date.substring(4, 6)}/${date.substring(6, 8)}/${date.substring(0, 4)}`;
  d3.select('#current-cases-date').html(`<i>Updated: ${formattedDate}</i>`);
};

request.send();

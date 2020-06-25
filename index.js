function afterRequestLoads() {
  
  const data = JSON.parse(this.response);
  d3.select('#current-cases-text').html(`${d3.format(',')(data[2].positive)}`);
  const date = data[2].date.toString();
  const formattedDate = `${date.substring(4, 6)}/${date.substring(6, 8)}/${date.substring(0, 4)}`;
  d3.select('#current-cases-date').html(`<i>Updated: ${formattedDate}</i>`);

  let arrDate = data.map(function(element) {
    return element.date;
  });
  console.log(arrDate);

  let arrPositive = data.map(function(element) {
    return element.positive;
  });
  console.log(arrPositive);
}

let request = new XMLHttpRequest();
request.open('GET', 'https://covidtracking.com/api/v1/us/daily.json');
request.onload = afterRequestLoads;
request.send();

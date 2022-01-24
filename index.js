const axios = require('axios')

// requirements:
// 1 See a list of all starships
// 2 Filter list by price
// 3 Sort list by price
// 4 Search list
// 5 See individual starship
// 6 See info on pilots attached to individual starships

async function main () {
  // first working attempt
  // const p1 = await axios
  //   .get('https://swapi.dev/api/starships')
  //   .then(a => a.data.results)
  // const p2 = await axios
  //   .get('https://swapi.dev/api/starships/?page=2')
  //   .then(a => a.data.results)
  // const p3 = await axios
  //   .get('https://swapi.dev/api/starships/?page=3')
  //   .then(a => a.data.results)
  // const p4 = await axios
  //   .get('https://swapi.dev/api/starships/?page=4')
  //   .then(a => a.data.results)
  // const data = [].concat(p1, p2, p3, p4)

  // console.log(data)

  let data = await axios
    .get('https://swapi.dev/api/starships')
    .then(a => a.data)
  let ships = [].concat(data.results)
  do {
    data = await axios.get(data.next).then(a => a.data)
    ships = ships.concat(data.results)
  } while (data.next)
  console.log(ships)
}

main()

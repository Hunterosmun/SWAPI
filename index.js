const axios = require('axios')

// requirements:
// 1 See a list of all starships
// 2 Filter list by price
// 3 Sort list by price
// 4 Search list
// 5 See individual starship
// 6 See info on pilots attached to individual starships

async function main () {
  const ships = await axios.get('https://swapi.dev/api/starships')

  console.log(ships)
}

main()

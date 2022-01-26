const axios = require('axios')

export default async function main () {
  let data = await axios
    .get('https://swapi.dev/api/starships')
    .then(a => a.data)
  let ships = [].concat(data.results)
  do {
    data = await axios.get(data.next).then(a => a.data)
    ships = ships.concat(data.results)
  } while (data.next)

  ships = ships.map(ship => {
    if (ship.cost_in_credits !== 'unknown') {
      ship.cost_in_credits = +ship.cost_in_credits
      return ship
    } else {
      ship.cost_in_credits = -1
      return ship
    }
  })

  return ships
}

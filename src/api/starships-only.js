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

  console.log(ships)

  return ships
}

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

  // next I need to put in every pilot & film
  // I think I'll try to cache it as I go
  ships.map(ship => {
    ship.pilots = getPilots(ship)
  })
  console.log(ships)

  return ships
}

const getPilots = ship => {
  if (ship.pilots.length < 1) return ship
  const fetchedPilots = ship.pilots.map(
    async pilot => await axios.get(pilot).then(a => a.data)
  )
  return Promise.all(fetchedPilots)
}

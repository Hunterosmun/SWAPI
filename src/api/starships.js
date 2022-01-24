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
  for (let i = 0; i < ships.length; ++i) {
    ships[i].pilots = await getPilots(ships[i].pilots)
  }
  console.log(ships)

  return ships
}

const getPilots = async pilots => {
  if (pilots.length < 1) return pilots
  const fetchedPilots = []
  for (let i = 0; i < pilots.length; ++i) {
    fetchedPilots.push(await axios.get(pilots[i]).then(a => a.data))
  }
  return fetchedPilots
}

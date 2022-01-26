const axios = require('axios')

export default async function main (url) {
  let ship = await axios.get(url).then(s => s.data)

  ship.pilots = await getPart(ship.pilots)
  ship.films = await getPart(ship.films)

  return ship
}

const getPart = async arr => {
  const fetchedParts = []
  for (let i = 0; i < arr.length; ++i) {
    fetchedParts.push(await axios.get(arr[i]).then(a => a.data))
  }
  return fetchedParts
}

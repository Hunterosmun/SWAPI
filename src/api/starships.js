const axios = require('axios')

const memo = {}

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
    ships[i].pilots = await getPart(ships[i].pilots)
    ships[i].films = await getPart(ships[i].films)
  }
  console.log(ships)
  console.log(memo)

  return ships
}

const getPart = async arr => {
  if (arr.length < 1) return arr
  const fetchedParts = []
  for (let i = 0; i < arr.length; ++i) {
    if (!(arr[i] in memo)) {
      memo[arr[i]] = await axios.get(arr[i]).then(a => a.data)
    }
    fetchedParts.push(memo[arr[i]])
  }
  return fetchedParts
}

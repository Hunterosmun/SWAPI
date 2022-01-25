import React from 'react'

import './App.css'
import fetchStarships from './api/starships-only'
import ShipSearch from './modules/starship-search'

// requirements:
// - [x] 1 See a list of all starships
// - [ ] 2 Filter list by price
// - [ ] 3 Sort list by price
// - [ ] 4 Search list
// - [x] 5 See individual starship
// - [x] 6 See info on pilots attached to individual starships

// load starships first, then, when they go into a specific thing, load that starships pilots

function App () {
  const [starships, setStarships] = React.useState([])
  React.useEffect(() => {
    fetchStarships().then(e => setStarships(e))
  }, [])
  return <ShipSearch ships={starships} />
}

export default App

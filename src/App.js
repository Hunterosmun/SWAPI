import React from 'react'

import './App.css'
import fetchStarships from './api/starships'
import ShipBox from './modules/shipview'

// requirements:
// 1 See a list of all starships
// 2 Filter list by price
// 3 Sort list by price
// 4 Search list
// 5 See individual starship
// 6 See info on pilots attached to individual starships

function App () {
  const [starships, setStarships] = React.useState('')
  React.useEffect(() => {
    fetchStarships().then(e => setStarships(e))
  }, [])
  return (
    <div>
      {starships.map(ship => (
        <ShipBox key={ship.name} ship={ship} />
      ))}
    </div>
  )
}

export default App

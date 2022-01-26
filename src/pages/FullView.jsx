import React from 'react'

import fetchStarships from '../api/starships-full'
import ShipBox from '../modules/shipview-full'

function FullView () {
  const [starships, setStarships] = React.useState([])

  React.useEffect(() => {
    fetchStarships().then(e => setStarships(e))
  }, [])

  return (
    <div>
      {starships.map(ship => {
        return <ShipBox key={ship.name} ship={ship} />
      })}
    </div>
  )
}

export default FullView

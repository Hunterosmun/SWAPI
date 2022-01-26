import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { useParams } from 'react-router-dom'

import fetchStarship from '../api/starship-single-detail'

function SingleShip () {
  const [ship, setDetails] = React.useState({})
  const { url } = useParams()
  console.log('hello?!')

  React.useEffect(() => {
    fetchStarship(url).then(e => setDetails(e))
  }, [])

  return <ShipBox ship={ship} />
}

export default SingleShip

function ShipBox ({ ship }) {
  return (
    <BoxOne>
      {Object.keys(ship).map(key => {
        if (key === 'created' || key === 'edited' || key === 'url') return <></>
        if (key === 'pilots' || key === 'films') {
          return ship[key].length > 0 ? (
            <div>
              {_.startCase(key)}:
              <ul>
                {ship[key].map(indiv => (
                  <li key={indiv}>
                    {indiv.title || <PilotBox pilot={indiv} />}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )
        }
        return (
          <div key={ship[key]}>
            {_.startCase(key)}: {ship[key]}
          </div>
        )
      })}
    </BoxOne>
  )
}

function PilotBox ({ pilot }) {
  const [active, setActive] = React.useState(false)
  return !active ? (
    <button onClick={() => setActive(!active)}>{pilot.name}</button>
  ) : (
    <div>
      <button onClick={() => setActive(!active)}>Off</button>
      {Object.keys(pilot).map(cha => {
        return (
          <div>
            {_.startCase(cha)}: {pilot[cha]}
          </div>
        )
      })}
    </div>
  )
}

const BoxOne = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  box-sizing: border-box;
  margin: 8px auto;
  max-width: 520px;
  position: relative;

  & ul {
    margin: 0;
  }
  & > button {
    position: absolute;
    right: 40px;
    top: 16px;
  }
`

import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { useLocation, Link } from 'react-router-dom'

import fetchStarship from '../api/starship-single-detail'

function SingleShip () {
  const [ship, setDetails] = React.useState({})
  let location = useLocation()
  let url = location.search.substring(1)

  React.useEffect(() => {
    fetchStarship(url).then(e => setDetails(e))
  }, [url])

  return <ShipBox ship={ship} />
}

export default SingleShip

function ShipBox ({ ship }) {
  return (
    <>
      <BoxOne>
        {Object.keys(ship).map(key => {
          if (key === 'created' || key === 'edited' || key === 'url')
            return <></>
          if (key === 'pilots' || key === 'films') {
            return ship[key].length > 0 ? (
              <div key={key}>
                {_.startCase(key)}:
                <ul>
                  {ship[key].map((indiv, i) => (
                    <li key={i}>{indiv.title || <PilotBox pilot={indiv} />}</li>
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
        <StyledLink to='/'>
          <button onClick={() => {}}>Return</button>
        </StyledLink>
      </BoxOne>
    </>
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
  background-color: #eee;
  & ul {
    margin: 0;
  }
`

const StyledLink = styled(Link)`
  position: absolute;
  right: 40px;
  top: 16px;
`

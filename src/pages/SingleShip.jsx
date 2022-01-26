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
        {Object.keys(ship)
          .filter(key => key !== 'created' && key !== 'edited' && key !== 'url')
          .map(key => {
            if ((key === 'pilots' || key === 'films') && ship[key].length > 0) {
              return (
                <div key={key}>
                  {_.startCase(key)}:
                  <ul>
                    {ship[key].map(indiv => (
                      <li key={indiv.title || indiv.name}>
                        {indiv.title || <PilotBox pilot={indiv} />}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
            return (
              <div key={key}>
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
      {Object.keys(pilot)
        .filter(
          key =>
            key !== 'homeworld' &&
            key !== 'films' &&
            key !== 'species' &&
            key !== 'vehicles' &&
            key !== 'starships' &&
            key !== 'created' &&
            key !== 'edited' &&
            key !== 'url'
        )
        .map(cha => {
          return (
            <div key={cha}>
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

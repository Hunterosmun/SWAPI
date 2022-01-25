import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

export default function ShipBox ({ ship }) {
  const [active, setActive] = React.useState(false)

  return (
    <BoxOne>
      {!active && <div>Name: {ship.name}</div>}
      <button onClick={() => setActive(!active)}>
        {!active ? 'Details' : 'Off'}
      </button>
      {active && (
        <>
          {Object.keys(ship).map(key => {
            if (key === 'created' || key === 'edited' || key === 'url')
              return <></>
            if (key === 'pilots' || key === 'films') {
              return ship[key].length > 0 ? (
                <div>
                  {_.startCase(key)}:
                  <ul>
                    {ship[key].map(indiv => (
                      <li>{indiv.title || <PilotBox pilot={indiv} />}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <></>
              )
            }
            return (
              <div>
                {_.startCase(key)}: {ship[key]}
              </div>
            )
          })}
        </>
      )}
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
        if (
          cha === 'homeworld' ||
          cha === 'films' ||
          cha === 'species' ||
          cha === 'vehicles' ||
          cha === 'starships' ||
          cha === 'created' ||
          cha === 'created' ||
          cha === 'edited' ||
          cha === 'url'
        )
          return <></>
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

import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

export default function ShipBox ({ ship }) {
  const [active, setActive] = React.useState(false)

  return (
    <ShipStyle>
      {!active && <div>Name: {ship.name}</div>}
      <button onClick={() => setActive(!active)}>Details</button>
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
                      <li>{indiv.name || indiv.title}</li>
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
    </ShipStyle>
  )
}

const ShipStyle = styled.div`
  border: 1px solid #ccc;
  padding: 4px;
  box-sizing: border-box;
  margin: 8px auto;
  max-width: 700px;

  & ul {
    margin: 0;
  }
`

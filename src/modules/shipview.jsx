import React from 'react'
import styled from 'styled-components'

export default function ShipBox ({ ship }) {
  const [active, setActive] = React.useState(false)

  return (
    <ShipStyle>
      <div>name: {ship.name}</div>
      <button onClick={() => setActive(!active)}>Details</button>
      {active && <div>{JSON.stringify(ship, null, 2)}</div>}
    </ShipStyle>
  )
}

const ShipStyle = styled.div`
  border: 1px solid #ccc;
  padding: 4px;
  box-sizing: border-box;
  margin: 8px auto;
  max-width: 700px;
`

import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

export default function ShipSearch ({ ships }) {
  return (
    <Wrapper>
      <h2>Star Wars Ship Search</h2>
      <BoxOne>
        {ships.map(ship => {
          return (
            <SearchItem>
              <div>{ship.name}</div>
              <button>Select</button>
            </SearchItem>
          )
        })}
      </BoxOne>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BoxOne = styled.div`
  padding: 0 8px;
  box-sizing: border-box;
  min-width: 400px;
  position: relative;
  border: 1px solid #ccc;

  & ul {
    margin: 0;
  }
  & > button {
    position: absolute;
    right: 40px;
    top: 16px;
  }
`
const SearchItem = styled.div`
  padding: 8px 4px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
`

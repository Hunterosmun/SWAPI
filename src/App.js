import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import './App.css'
import fetchStarships from './api/starships-only'
// import ShipSearch from './modules/starship-search'

// requirements:
// - [x] 1 See a list of all starships
// - [ ] 2 Filter list by price
// - [ ] 3 Sort list by price
// - [x] 4 Search list
// - [ ] 5 See individual starship
// - [x] 6 See info on pilots attached to individual starships

// load starships first, then, when they go into a specific thing, load that starships pilots

function App () {
  const [search, setSearch] = React.useState('')
  const [starships, setStarships] = React.useState([])
  let foundShips = _.filter(starships, ship => compare(search, ship.name))

  React.useEffect(() => {
    fetchStarships().then(e => setStarships(e))
  }, [])

  return (
    <SearchWrapper>
      <h2>Star Wars Ship Search</h2>
      <input
        type='text'
        placeholder='search'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ShipSearch ships={foundShips} />
    </SearchWrapper>
  )
}

function ShipSearch ({ ships }) {
  return (
    <BoxOne>
      {ships.map(ship => {
        return (
          <SearchItem>
            <div>{ship.name}</div>
            <button onClick={() => console.log('hello')}>Select</button>
          </SearchItem>
        )
      })}
    </BoxOne>
  )
}

function compare (a, b) {
  return (
    a.toLowerCase().includes(b.toLowerCase()) ||
    b.toLowerCase().includes(a.toLowerCase())
  )
}

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h2 {
    margin: 0;
    padding: 16px;
  }

  & > input {
    margin-bottom: 8px;
    padding: 4px 8px;
    width: 300px;
  }
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

export default App

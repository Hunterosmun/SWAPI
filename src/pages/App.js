import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import fetchStarships from '../api/starships-only'
// import ShipSearch from './modules/starship-search'

// requirements:
// - [x] 1 See a list of all starships
// - [ ] 2 Filter list by price
// - [x] 3 Sort list by price
// - [x] 4 Search list
// - [x] 5 See individual starship
// - [x] 6 See info on pilots attached to individual starships

// load starships first, then, when they go into a specific thing, load that starships pilots

function App () {
  const [search, setSearch] = React.useState('')
  const [active, setActive] = React.useState(false)
  const [showPrice, setShowPrice] = React.useState(false)
  const [ordered, setOrdered] = React.useState(false)
  const [byPrice, setByPrice] = React.useState({ min: 0, max: 0 })
  const [starships, setStarships] = React.useState([])

  React.useEffect(() => {
    fetchStarships().then(e => setStarships(e))
  }, [])

  const sortList = () => {
    let sortedList = []
    sortedList = _.filter(starships, ship => compare(search, ship.name))
    if (byPrice.max) {
      sortedList = sortedList.filter(ship => ship.cost_in_credits < byPrice.max)
    }
    if (byPrice.min) {
      sortedList = sortedList.filter(ship => ship.cost_in_credits > byPrice.min)
    }
    if (ordered) {
      sortedList = _.sortBy(sortedList, ['obj', 'cost_in_credits'])
    } else {
      sortedList = _.orderBy(
        sortedList,
        ['obj', 'cost_in_credits'],
        ['asc', 'desc']
      )
    }
    sortedList = sortedList.sort((a, b) => {
      if (a.cost_in_credits === -1) return 1
      if (b.cost_in_credits === -1) return -1
      return 0
    })

    return sortedList
  }

  if (starships.length === 0) {
    return <div>Loading :(</div>
  }

  return (
    <SearchWrapper>
      <h2>Star Wars Ship Catalog</h2>
      <div className='options'>
        <input
          type='text'
          placeholder='search'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => setActive(!active)}>Filters</button>
        {active && (
          <div className='filterBox'>
            <div>
              <input
                type='checkbox'
                onChange={() => setShowPrice(!showPrice)}
              />
              <span>Show Cost</span>
            </div>
            <button
              onClick={() => {
                setOrdered(false)
              }}
            >
              Price Ascending
            </button>
            <button
              onClick={() => {
                setOrdered(true)
              }}
            >
              Price Descending
            </button>
            <div>
              Price Range:
              <div>
                max:
                <span>
                  <button onClick={() => setByPrice({ ...byPrice, max: 0 })}>
                    clear
                  </button>
                </span>
                <input
                  type='number'
                  value={byPrice.max}
                  onChange={e =>
                    setByPrice({ ...byPrice, max: e.target.value })
                  }
                />
              </div>
              <div>
                min:{' '}
                <span>
                  <button onClick={() => setByPrice({ ...byPrice, min: 0 })}>
                    clear
                  </button>
                </span>
                <input
                  type='number'
                  value={byPrice.min}
                  onChange={e =>
                    setByPrice({ ...byPrice, min: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <ShipSearch seePrice={showPrice} ships={sortList()} />
    </SearchWrapper>
  )
}

function ShipSearch ({ seePrice, ships }) {
  return (
    <BoxOne>
      {ships.map(ship => {
        return (
          <StyledLink
            key={ship.name}
            to={{ pathname: '/ship', search: ship.url }}
          >
            <SearchItem>
              <div>{ship.name}</div>
              {seePrice && (
                <div>
                  Credits:{' '}
                  {ship.cost_in_credits === -1
                    ? 'Unknown'
                    : ship.cost_in_credits}
                </div>
              )}
            </SearchItem>
          </StyledLink>
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

  & > div > input {
    margin: 0 0 8px 0;
    padding: 4px 8px;
    width: 200px;
  }
  & .options {
    display: flex;
    align-items: space-around;
    justify-content: space-between;
    position: relative;

    & .filterBox {
      border: 1px solid #bbb;
      box-shadow: 4px 4px 4px #aaa;
      position: absolute;
      right: -130px;
      max-width: 100px;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 8px;

      & input {
        max-width: 90px;
      }
    }
    & > button {
      height: 27px;
      margin-left: 24px;
    }
  }
`

const BoxOne = styled.div`
  padding: 0 8px;
  box-sizing: border-box;
  min-width: 300px;
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
  flex-direction: column;
  &:hover {
    background-color: #ccc;
  }
`

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`

export default App

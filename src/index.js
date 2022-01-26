import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import './index.css'
import reportWebVitals from './reportWebVitals'

import App from './pages/App'
import FullView from './pages/FullView'
import SingleShip from './pages/SingleShip'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='ship' element={<SingleShip />}>
          <Route path=':shipId' element={<SingleShip />} />
        </Route>
        <Route path='full' element={<FullView />} />
        <Route path='*' element={<div>Nothin here :(</div>} />
      </Routes>
    </BrowserRouter>
    <Outlet />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

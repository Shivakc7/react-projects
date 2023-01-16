import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ScrollOne from './components/ScrollOne'
import ScrollTwo from './components/ScrollTwo'

function App() {

  return (
    <div className="bg-black">
      {/* <ScrollOne className='' /> */}
      <ScrollTwo />
    </div>
  )
}

export default App

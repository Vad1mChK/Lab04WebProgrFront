import React from 'react'
import logo from './logo.svg'
import './resources/styles/vad1mchk.scss'
import {ShootingGallery} from "./components/ShootingGallery";
import XInput from "./components/XInput";

function App() {
  return (
    <div className="App dark-theme">
      <ShootingGallery size={400}/>
        <XInput/>
    </div>
  )
}

export default App;

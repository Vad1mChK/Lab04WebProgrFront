import React from 'react'
import logo from './logo.svg'
import './resources/styles/vad1mchk.scss'
import {ShootingGallery} from "./components/ShootingGallery";
import TextNumberInput from "./components/TextNumberInput";

function App() {
  return (
    <div className="App dark-theme">
      <ShootingGallery size={400}/>
        <TextNumberInput min={-3} max={5} htmlId={'x'} htmlName={'x'}/>
        <TextNumberInput min={-5} max={3} htmlId={'y'} htmlName={'y'}/>
        <TextNumberInput min={-3} max={5} htmlId={'r'} htmlName={'r'}/>
    </div>
  )
}

export default App;

import React, { useEffect } from 'react'
import Nav from '../component/Nav'
import Menu from '../component/Menu'
import MapAll from '../component/MapAll'

function Map() {
  useEffect(()=>{
    getmode();
  },[])
  const getmode=()=>{
    let gotmode = localStorage.getItem('mode');
    if (gotmode === 'light') {
      document.documentElement.style.setProperty('--color','#333');
      document.documentElement.style.setProperty('--back','#fff');
    }else{
      document.documentElement.style.setProperty('--color','#fff');
      document.documentElement.style.setProperty('--back','#333');
    }
  }
  return (
    <div className='main'>
      <Nav showsearch={true} back={true}/>
      <div className='body'>
        <Menu selected={'Map'}/>
        <MapAll/>
      </div>
    </div>
  )
}

export default Map

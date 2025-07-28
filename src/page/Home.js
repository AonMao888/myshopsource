import React, { useEffect } from 'react'
import Nav from '../component/Nav'
import Menu from '../component/Menu'
import World from '../component/World'

function Home() {
  useEffect(()=>{
    getmode()
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
      <Nav showsearch={true} back={false}/>
      <div className='body'>
        <Menu selected={'Home'}/>
        <World/>
      </div>
    </div>
  )
}

export default Home

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../fire'
import langjson from '../json/lang.json'

function Menu({ selected }) {
  const [me, setme] = useState(null);
  const [lang, setlang] = useState('english');

  useEffect(() => {
    getlang();
    checkauth();
  }, [])

  const getlang = () => {
    let gotlang = localStorage.getItem('lang');
    if (gotlang) {
      setlang(gotlang);
    } else {
      setlang('english');
    }
  }
  const checkauth = () => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setme(u);
      }
    })
  }
  const closemenu = () => {
    document.querySelector('.menu').style.left = '-369px';
  }
  return (
    <div className='menu'>
      <button className='close' onClick={() => { closemenu() }}>
        <i class="ri-close-large-line"></i>
      </button>
      <Link to={'/'} className={selected === 'Home' && 'active'}>
        {selected === 'Home' ? <i class="ri-home-smile-fill"></i> : <i class="ri-home-smile-line"></i>}
        <p>{langjson[9][lang]}</p>
      </Link>
      <Link to={'../../map'} className={selected === 'Map' && 'active'}>
        {selected === 'Map' ? <i class="ri-compass-3-fill"></i> : <i class="ri-compass-3-line"></i>}
        <p>{langjson[3][lang]}</p>
      </Link>
      <Link to={'../../post'} className={selected === 'Post' && 'active'}>
        {selected === 'Post' ? <i class="ri-chat-smile-ai-fill"></i> : <i class="ri-chat-smile-ai-line"></i>}
        <p>{langjson[10][lang]}</p>
      </Link>
      <Link to={'/app'} className={selected === 'App' ? 'active mini' : 'mini'}>
        {selected === 'App' ? <i class="ri-apps-fill"></i> : <i class="ri-apps-line"></i>}
        <p>{langjson[11][lang]}</p>
      </Link>
      {me && <Link to={'../../profile'} className={selected === 'Profile' && 'active'}>
        {selected === 'Profile' ? <i class="ri-user-fill"></i> : <i class="ri-user-line"></i>}
        <p>{langjson[5][lang]}</p>
      </Link>}
    </div>
  )
}

export default Menu

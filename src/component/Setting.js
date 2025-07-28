import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Menu from './Menu'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../fire'
import langjson from '../json/lang.json'
import { Link } from 'react-router-dom';

function Setting() {
  const [me, setme] = useState(null);
  const [currentlang, setcurrentlang] = useState('');
  const [gmode, setmode] = useState('');
  const [lang, setlang] = useState('english');
  const [langpop, setlangpop] = useState(false);
  const [showreq, setshowreq] = useState(false);

  useEffect(() => {
    getmode();
    getlang();
    checkshop();
    checkauth();
  }, [])

  const getmode = () => {
    let gotmode = localStorage.getItem('mode');
    setmode(gotmode);
    if (gotmode === 'light') {
      document.documentElement.style.setProperty('--color', '#333');
      document.documentElement.style.setProperty('--back', '#fff');
    } else {
      document.documentElement.style.setProperty('--color', '#fff');
      document.documentElement.style.setProperty('--back', '#333');
    }
  }
  const getlang = () => {
    let gotlang = localStorage.getItem('lang');
    if (gotlang) {
      setlang(gotlang);
    } else {
      setlang('english');
    }
  }
  const checkshop = (e) => {
    fetch('https://myshop-tau-two.vercel.app/shopbyemail?email=' + e).then(r => r.json()).then(da => {
      if (da.status === 'success') {
        setshowreq(false);
      } else {
        setshowreq(true);
      }
    })
  }
  const checkauth = () => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setme(u);
        checkshop(u.email);
      }
    })
  }

  const setlangu = () => {
    if (currentlang) {
      localStorage.setItem('lang', currentlang);
      window.alert('Website language was currently selected ' + currentlang);
      setlangpop(false);
      getlang();
    }
  }
  const changemode = () => {
    let gotmode = localStorage.getItem('mode');
    if (gotmode === 'dark') {
      localStorage.setItem('mode', 'light');
      document.documentElement.style.setProperty('--color', '#333');
      document.documentElement.style.setProperty('--back', '#fff');
      setmode('light');
    } else {
      localStorage.setItem('mode', 'dark');
      document.documentElement.style.setProperty('--color', '#fff');
      document.documentElement.style.setProperty('--back', '#333');
      setmode('dark');
    }
  }
  const out = () => {
    const ask = window.confirm('Are you sure to logout?');
    if (ask === true) {
      signOut(auth).then(() => { window.location.reload() })
    }
  }
  return (
    <div className='main'>
      <Nav showsearch={true} back={true} />
      <div className='body'>
        <Menu />
        <div className='setting'>
          <h3 className='settingtitle'>{langjson[43][lang]}</h3>
          <div className='box'>
            <button onClick={() => { setlangpop(true) }}>
              <i style={{ color: 'royalblue' }} class="ri-translate-ai-2"></i>
              <p>{langjson[44][lang]}</p>
            </button>
            <button onClick={() => { changemode() }}>
              {gmode === 'dark' ? <i class="ri-sun-fill"></i> : <i class="ri-moon-clear-fill"></i>}
              <p>{gmode === 'dark' ? 'Light mode' : 'Dark mode'}</p>
            </button>
          </div>
          <h3 className='settingtitle'>{langjson[71][lang]}</h3>
          <div className='box'>
            <Link to={'/docs/privacy'} onClick={() => { setlangpop(true) }}>
              <i style={{ color: 'orange' }} class="ri-newspaper-line"></i>
              <p>{langjson[72][lang]}</p>
            </Link>
            <Link to={'/docs/about'} onClick={() => { setlangpop(true) }}>
              <i style={{ color: '#5A827E' }} class="ri-information-2-line"></i>
              <p>{langjson[73][lang]}</p>
            </Link>
            {showreq && me && <Link to={'/request/shop'}>
              <i style={{ color: '#4CAF50' }} class="ri-chat-new-fill"></i>
              <p>Request a shop</p>
            </Link>}
          </div>
          {me && <h3 className='settingtitle'>{langjson[45][lang]}</h3>}
          {me && <div className='box'>
            <button>
              <i class="ri-user-line"></i>
              <p>{langjson[45][lang]}: <b>{me && me.displayName}</b></p>
            </button>
            <button>
              <i class="ri-mail-line"></i>
              <p>{langjson[25][lang]}: <b>{me && me.email}</b></p>
            </button>
            <button onClick={() => { out() }} className='out'>
              <i class="ri-logout-circle-r-line"></i>
              <p>{langjson[7][lang]}</p>
            </button>
          </div>}
        </div>
      </div>
      {langpop && <div className='pop'>
        <div className='div'>
          <button className='close' onClick={() => { setlangpop(false); }}>
            <i class="ri-close-large-line"></i>
          </button>
          <div className='head'>
            <h1>{langjson[46][lang]}</h1>
          </div>
          <div style={{ height: 9 }}></div>
          <button onClick={() => { setcurrentlang('shan') }} className={currentlang === 'shan' ? 'active lang' : 'lang'}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Flag_of_Shan_State.svg/1200px-Flag_of_Shan_State.svg.png' alt='' />
            <p>လိၵ်ႈတႆး</p>
          </button>
          <button onClick={() => { setcurrentlang('english') }} className={currentlang === 'english' ? 'active lang' : 'lang'}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg' alt='' />
            <p>English</p>
          </button>
          <button onClick={() => { setcurrentlang('myanmar') }} className={currentlang === 'myanmar' ? 'active lang' : 'lang'}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Myanmar.svg/960px-Flag_of_Myanmar.svg.png' alt='' />
            <p>မြန်မာ</p>
          </button>
          <div className='btn'>
            <button onClick={() => { setlangu() }} className='submit'>{langjson[48][lang]}</button>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Setting

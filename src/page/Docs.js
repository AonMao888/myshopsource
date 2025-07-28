import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Menu from '../component/Menu'
import { useParams } from 'react-router-dom'
import Privacy from '../component/Privacy';
import About from '../component/About';
import langjson from '../json/lang.json'

function Docs() {
  const { name } = useParams();
  const [lang, setlang] = useState('english');

  useEffect(() => {
    getlang();
  }, [])

  const getlang = () => {
    let gotlang = localStorage.getItem('lang');
    if (gotlang) {
      setlang(gotlang);
    } else {
      setlang('english');
    }
  }
  return (
    <div className='main'>
      <Nav back={true} showsearch={true} />
      <div className='body'>
        <Menu />
        {name === 'privacy' ? <Privacy /> : name === 'about' ? <About /> : <div className='nopost'>
          <i class="ri-article-fill"></i>
          <h3>{langjson[74][lang]}</h3>
          <p>{langjson[75][lang]}</p>
        </div>}
      </div>
    </div>
  )
}

export default Docs

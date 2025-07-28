import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Menu from '../component/Menu'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../fire'
import { useNavigate } from 'react-router-dom'
import langjson from '../json/lang.json'

function Request() {
  const [user, setuser] = useState([]);
  const [addload, setaddload] = useState(false);
  const [shopname, setshopname] = useState('');
  const [shoptype, setshoptype] = useState('');
  const [shopdes, setshopdes] = useState('');
  const [city, setcity] = useState('');
  const [isrequest, setisrequest] = useState(false);
  const [load, setload] = useState(false);
  const [requestdata, setrequestdata] = useState([]);
  const [lang, setlang] = useState('english');
  const navigate = useNavigate();

  useEffect(() => {
    getmode();
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
  const checkauth = () => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setuser(u);
        checkrequest(u);
      } else {
        navigate('../../signin')
      }
    })
  }
  const checkrequest = async (e) => {
    await fetch('https://myshop-tau-two.vercel.app/request/' + e.uid).then(r => r.json()).then(al => {
      if (al.status === 'success') {
        setisrequest(true);
        setrequestdata(al.data);
        setload(false);
        console.log(al);
      } else {
        console.log(al);
      }
    })
  }
  const request = async () => {
    const data = {
      shopname: shopname,
      shoptype: shoptype,
      shopdes: shopdes,
      city: city,
      uid: user.uid,
      email: user.email,
      username: user.displayName,
      profile: user.photoURL,
    };
    if (shopname && shoptype && shopdes && city) {
      setaddload(true);
      await fetch('https://myshop-tau-two.vercel.app/request/shop', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(r => r.json()).then(s => {
        if (s.status === 'success') {
          window.alert(s.text);
          setaddload(false);
          navigate('../../')
        } else {
          window.alert(s.text);
          setaddload(false);
        }
      })
    }
  }

  return (
    <div className='main'>
      <Nav back={true} showsearch={true} />
      <div className='body'>
        <Menu />
        <div className='world'>
          <h1 className='addtitle'>{langjson[76][lang]}</h1>
          {!isrequest && <div className='form'>
            <label htmlFor='shopname'>{langjson[77][lang]}</label>
            <input value={shopname} onChange={(e) => { setshopname(e.target.value) }} minLength={3} maxLength={42} id='shopname' placeholder={langjson[81][lang]} required />
            <label htmlFor='shopcate'>{langjson[78][lang]}</label>
            <input value={shoptype} onChange={(e) => { setshoptype(e.target.value) }} maxLength={19} id='shopcate' placeholder={langjson[82][lang]} required />
            <label htmlFor='shopdes'>{langjson[79][lang]}</label>
            <input value={shopdes} onChange={(e) => { setshopdes(e.target.value) }} maxLength={91} id='shopdes' placeholder={langjson[83][lang]} required />
            <label htmlFor='city'>{langjson[80][lang]}</label>
            <input value={city} onChange={(e) => { setcity(e.target.value) }} maxLength={42} id='city' placeholder={langjson[84][lang]} required />
            <button onClick={() => { request() }} type='submit'>{addload && <div className='whiteload'></div>}{langjson[85][lang]}</button>
          </div>}
          {isrequest && <div className='nopost'>
            <i style={requestdata && requestdata.status === 'approved' ? { background: '#8ABB6C', color: '#fff' } : { background: '#F68537', color: '#fff' }} class="ri-chat-check-fill"></i>
            <h3>{langjson[86][lang]}</h3>
            <p>{langjson[87][lang]} <b>{requestdata && requestdata.status}</b></p>
          </div>}
        </div>
      </div>
      {load&&<div className='loaddiv'>
        <div className='loadbox'>
          <div className='cir'></div>
          <p>{langjson[13][lang]}...</p>
        </div>
      </div>}
    </div>
  )
}

export default Request

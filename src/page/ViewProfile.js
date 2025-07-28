import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Menu from '../component/Menu'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../fire'
import { Link, useNavigate, useParams } from 'react-router-dom'
import langjson from '../json/lang.json'

function ViewProfile() {
    const [me, setme] = useState([]);
    const [shop, setshop] = useState([]);
    const [noshop, setnoshop] = useState(false);
    const [hasshop, sethasshop] = useState(false);
    const [load, setload] = useState(true);
        const [lang, setlang] = useState('english');
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getlang();
        getmode();
        checkuser();
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
    const checkuser = () => {
        fetch('https://myshop-tau-two.vercel.app/user?id='+id).then(r=>r.json()).then(da=>{
            if (da.status === 'success') {
                setme(da.data);
                checkshop(da.data)
                setload(false);
            }else{
                navigate('../../');
            }
        })
    }
    const checkshop=(e)=>{
        fetch('https://myshop-tau-two.vercel.app/shopbyemail?email='+e.email).then(r=>r.json()).then(da=>{
            if (da.status === 'success') {
                setload(false);
                setshop(da.data[0]);
                sethasshop(true);
                setnoshop(false);
            }else if (da.status === 'fail') {
                setload(false);
                setnoshop(true);
                sethasshop(false);
            }
        })
    }
    return (
        <div className='main'>
            <Nav showsearch={true} back={true} />
            {load&&<div className='loadbar'></div>}
            <div className='body'>
                <Menu selected={'Profile'} />
                <div className='profile'>
                    <div className='left'>
                        <div className='profileshow'>
                            <img src={me?me.profileimg:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt='' />
                            <h1>{me?me.displayName:'...'}</h1>
                            <p><i class="ri-mail-fill"></i>{me?me.email:'...@gmail.com'}</p>
                            <div className='box'>
                                <div className='item'>
                                    <i style={{ color: '#ff4545' }} class="ri-store-2-fill"></i>
                                    <p>{langjson[58][lang]}</p>
                                    <span>{hasshop ? langjson[61][lang] : langjson[62][lang]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {hasshop&&<Link to={shop&&'../../shop/'+shop.shopid} className='right'>
                        <img className='back' src='https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg' alt=''/>
                        <div className='shoptop'>
                            <img src={shop&&shop.logo} alt=''/>
                            <div className='name'>
                                <h2>{shop&&shop.shopname}</h2>
                                <p>{langjson[17][lang]} : <b>{shop&&shop.shoptype}</b></p>
                            </div>
                        </div>
                    </Link>}
                    {noshop&&<div className='no'>
                        <i class="ri-store-line"></i>
                        <p>Current have no shop</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ViewProfile

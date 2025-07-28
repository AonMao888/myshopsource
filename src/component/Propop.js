import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../fire'
import { Link } from 'react-router-dom';
import langjson from '../json/lang.json'

function Propop({ me, close, hasshop }) {
    const [shop, setshop] = useState(false);
    const [shopdata, setshopdata] = useState(false);
    const [lang, setlang] = useState('english');

    useEffect(()=>{
        checkshop();
        getlang();
    },[])

    const out = () => {
        const ask = window.confirm(langjson[8][lang]);
        if (ask === true) {
            signOut(auth).then(() => { window.location.reload() })
        }
    }
    const checkshop = (e) => {
        fetch('https://myshop-tau-two.vercel.app/shopbyemail?email=' + me.email).then(r => r.json()).then(da => {
            if (da.status === 'success') {
                setshop(true);
                setshopdata(da.data[0])
            }
        })
    }
    const getlang = () => {
        let gotlang = localStorage.getItem('lang');
        if (gotlang) {
            setlang(gotlang);
        } else {
            setlang('english');
        }
    }
    return (
        <div className='pop'>
            <div className='propop'>
                <button onClick={() => { close() }} className='close'>
                    <i class="ri-close-large-line"></i>
                </button>
                <h1>{langjson[5][lang]}</h1>
                <hr />
                <div className='propopbar'>
                    <img src={me && me.photoURL} alt='' />
                    <h2>{me && me.displayName}</h2>
                </div>
                <div className='i'>
                    <i class="ri-mail-line"></i>
                    <p>{me && me.email}</p>
                </div>
                {shopdata&&<div className='i'>
                    <i class="ri-store-2-line"></i>
                    {shopdata&&shopdata.status==='block'&&<p>{langjson[88][lang]}: <b style={{color:'#ff4545'}}>{shopdata&&shopdata.status}</b></p>}
                    {shopdata&&shopdata.status==='active'&&<p>{langjson[88][lang]}: <b style={{color:'#06923E'}}>{shopdata&&shopdata.status}</b></p>}
                </div>}
                {shopdata && <Link to={'/shop/'+shopdata.shopid} className='my'>
                    <i class="ri-store-2-line"></i>
                    <p>{langjson[6][lang]}</p>
                </Link>}
                <button onClick={() => { out() }} className='out'>
                    <i class="ri-logout-circle-r-line"></i>
                    {langjson[7][lang]}
                </button>
            </div>
        </div>
    )
}

export default Propop

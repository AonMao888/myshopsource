import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../fire'
import Propop from './Propop';
import langjson from '../json/lang.json'

function Nav({ back, showsearch }) {
    const [me, setme] = useState([]);
    const [pop, setpop] = useState(false);
    const [lang, setlang] = useState('english');
    const [shop, setshop] = useState([]);
    const [noshop, setnoshop] = useState(false);
    const [hasshop, sethasshop] = useState(false);

    useEffect(() => {
        getlang();
        checkauth();
    }, [])

    const getlang=()=>{
        let gotlang = localStorage.getItem('lang');
        if (gotlang) {
            setlang(gotlang);
        }else{
            setlang('english');
        }
    }
    const checkauth = () => {
        onAuthStateChanged(auth, (u) => {
            if (u) {
                setme(u);
                checkshop(u);
            } else {
                setme(false);
            }
        })
    }
    const checkshop = (e) => {
        fetch('https://myshop-tau-two.vercel.app/shopbyemail?email=' + e.email).then(r => r.json()).then(da => {
            if (da.status === 'success') {
                setshop(da.data[0]);
                sethasshop(true);
                setnoshop(false);
            } else if (da.status === 'fail') {
                setnoshop(true);
                sethasshop(false);
            }
        })
    }
    const showmenu = () => {
        document.querySelector('.menu').style.left = 0;
    }
    return (
        <nav>
            <div className='left'>
                {back && <button onClick={() => { window.history.back() }}>
                    <i class="ri-arrow-left-s-line"></i>
                    <span>{langjson[1][lang]}</span>
                </button>}
                <button onClick={() => { showmenu() }} className='menubtn'>
                    <i class="ri-menu-2-line"></i>
                </button>
                <Link>myShop</Link>
            </div>
            <div className='right'>
                {showsearch && <Link to={'/search'} className='search'>
                    <span>{langjson[0][lang]}</span>
                    <i class="ri-search-line"></i>
                </Link>}
                <Link to={'/search'} className='btn searchnav'>
                    <i class="ri-search-line"></i>
                    <p>{langjson[2][lang]}</p>
                </Link>
                <Link to={'../../map'} className='btn'>
                    <i class="ri-map-pin-fill"></i>
                    <p>{langjson[3][lang]}</p>
                </Link>
                <Link to={'/setting'} className='btn'>
                    <i class="ri-settings-3-fill"></i>
                    <p>{langjson[4][lang]}</p>
                </Link>
                {me && <button onClick={() => { setpop(true); }} className='pro'>
                    <img src={me && me.photoURL} alt='' />
                </button>}
                {!me && <Link to={'../../signin'} className='login'>{langjson[49][lang]}</Link>}
            </div>
            {pop && <Propop hasshop={hasshop} close={() => { setpop(false); }} me={me} />}
        </nav>
    )
}

export default Nav

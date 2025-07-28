import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Menu from '../component/Menu'
import { Link } from 'react-router-dom'
import langjson from '../json/lang.json'

function MiniApp() {
    const [list, setlist] = useState([]);
    const [load, setload] = useState(true);
    const [lang, setlang] = useState('english');
    const [inp, setinp] = useState('');

    useEffect(() => {
        getlang();
        getmode();
        getlist();
    }, [])

    const getmode = () => {
        let gotmode = localStorage.getItem('mode');
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
    const getlist = async () => {
        await fetch('https://myshop-tau-two.vercel.app/miniapp').then(r => r.json()).then(all => {
            if (all.status === 'success') {
                setlist(all.data);
                setload(false);
            }
        })
    }
    const shar = () => {
        window.navigator.share({
            title: 'Mini Apps in myShop',
            url: window.location.href
        })
    }
    return (
        <div className='main'>
            <Nav showsearch={true} back={true} />
            <div className='body'>
                <Menu selected={'App'} />
                <div className='applist'>
                    <div className='appnav'>
                        <h1 className='addtitle'><i class="ri-apps-fill"></i>{langjson[11][lang]}</h1>
                        <div className='btn'>
                            <div className='search'>
                                <i class="ri-search-line"></i>
                                <input maxLength={29} type='text' value={inp} onChange={(e)=>{setinp(e.target.value)}} placeholder={langjson[91][lang]} />
                            </div>
                            <button onClick={() => { window.location.reload() }}><i class="ri-reset-left-line"></i></button>
                            <button onClick={() => { shar() }}><i class="ri-share-forward-line"></i></button>
                        </div>
                    </div>
                    {load && <div className='loadbar'></div>}
                    {!load && <div className='apptitle'>
                        {langjson[89][lang]}
                    </div>}
                    <div className='list'>
                        {list && list.map((item) => {
                            if (item.type === 'tool' && item.name.toLowerCase().includes(inp.toLowerCase())) {
                                return (
                                    <Link to={'/app/' + item.id} key={item.id}>
                                        <img src={item.logo} alt='' />
                                        <p>{item.name}</p>
                                    </Link>
                                )
                            }
                        })}
                    </div>
                    {!load && <div className='apptitle'>
                        {langjson[90][lang]}
                    </div>}
                    <div className='list'>
                        {list && list.map((item) => {
                            if (item.type === 'game'&& item.name.toLowerCase().includes(inp.toLowerCase())) {
                                return (
                                    <Link to={'/app/' + item.id} key={item.id}>
                                        <img src={item.logo} alt='' />
                                        <p>{item.name}</p>
                                    </Link>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiniApp

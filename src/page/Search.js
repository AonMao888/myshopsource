import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Menu from '../component/Menu'
import { Link } from 'react-router-dom';
import langjson from '../json/lang.json'

function Search() {
    const [inp, setinp] = useState('');
    const [list, setlist] = useState([]);
    const [reslist, setreslist] = useState([]);
    const [load, setload] = useState(true);
    const [lang, setlang] = useState('english');

    useEffect(() => {
        getlang();
        getmode();
        getdata();
    }, [])

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
    const getlang = () => {
        let gotlang = localStorage.getItem('lang');
        if (gotlang) {
            setlang(gotlang);
        } else {
            setlang('english');
        }
    }
    const getdata = async () => {
        await fetch('https://myshop-tau-two.vercel.app/allshop').then(r => r.json()).then(all => {
            if (all.status === 'success') {
                setlist(all.data);
                setload(false);
            } else {
                window.alert('Error fetching data!');
            }
        })
    }
    const handlekeydown = (e) => {
        if (e.key === 'Enter') {
            search()
        }
    }
    const search = () => {
        if (inp) {
            let rr = list.filter((item) => item.shopname.toLowerCase().includes(inp.toLowerCase()));
            setreslist(rr);
        }
    }
    return (
        <div className='main'>
            <Nav showsearch={false} back={true} />
            <div className='body'>
                <Menu />
                <div className='mainsearch'>
                    {load && <div className='loadbar'></div>}
                    <div className='searchbar'>
                        <input onKeyDown={(e) => { handlekeydown(e) }} value={inp} onChange={(e) => setinp(e.target.value)} placeholder={langjson[41][lang]} />
                        {inp && <button onClick={() => { setinp('') }} className='close'>
                            <i class="ri-close-large-line"></i>
                        </button>}
                        <button disabled={load} onClick={() => { search() }} className='search'>
                            <i class="ri-search-line"></i>
                            <p>{langjson[2][lang]}</p>
                        </button>
                    </div>
                    {reslist && reslist.map((item) => (
                        <Link to={'/shop/' + item.shopid} key={item.shopid} className='shopi'>
                            <img src={item.logo} alt='' />
                            <div className='des'>
                                <h1>{item.shopname}</h1>
                                <p>{langjson[42][lang]}: <b>{item.shoptype}</b></p>
                                <div className='bar'>
                                    <i class="ri-map-pin-fill"></i>
                                    <span>{item.city}</span>
                                    <hr />
                                    <i class="ri-links-line"></i>
                                    <span>Shop ID: <b>15</b></span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Search

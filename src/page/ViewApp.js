import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Menu from '../component/Menu'
import { useNavigate, useParams } from 'react-router-dom'
import json from '../json/miniapp.json'
import QR from '../component/QR'
import langjson from '../json/lang.json'

function ViewApp() {
    const [app, setapp] = useState([]);
    const [pop, setpop] = useState(false);
    const [qrpop, setqrpop] = useState(false);
    const [load, setload] = useState(true);
    const [lang, setlang] = useState('english');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getlang();
        getmode();
        getapp();
    }, [])

    const getlang = () => {
        let gotlang = localStorage.getItem('lang');
        if (gotlang) {
            setlang(gotlang);
        } else {
            setlang('english');
        }
    }
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
    const getapp = async () => {
        if (id) {
            await fetch('https://myshop-tau-two.vercel.app/miniapp/' + id).then(r => r.json()).then(all => {
                if (all.status === 'success') {
                    setapp(all.data);
                    setpop(false);
                    setload(false);
                }
            })
        } else {
            navigate('../');
        }
    }
    const copy = () => {
        let inp = document.createElement('input');
        inp.value = window.location.href;
        document.body.append(inp);
        inp.select();
        document.execCommand('copy');
        inp.remove()
        window.alert('Link was copied.');
    }
    const shar = () => {
        window.navigator.share({
            title: app && app.name,
            url: window.location.href
        })
    }
    return (
        <div className='main'>
            <Nav showsearch={true} back={true} />
            <div className='body'>
                <Menu selected={'App'} />
                <div className='viewapp'>
                    <iframe src={app && app.link} frameBorder={0} />
                    <div className='fab'>
                        <button onClick={() => { setpop(true); }}><i class="ri-more-fill"></i></button>
                        <hr />
                        <button onClick={() => { navigate('/app') }}><i class="ri-record-circle-line"></i></button>
                    </div>
                </div>
            </div>
            {pop && <div className='infopop'>
                <div className='appinfo'>
                    <button onClick={() => { setpop(false); }} className='close'>
                        <i class="ri-close-large-line"></i>
                    </button>
                    <h1>{langjson[50][lang]}</h1>
                    <div className='info'>
                        <img src={app && app.logo} alt='' />
                        <div className='appname'>
                            <h3>{app && app.name}</h3>
                            <p>{langjson[42][lang]}: <b>{app && app.type}</b></p>
                        </div>
                    </div>
                    <hr />
                    <p className='more'>{langjson[51][lang]}</p>
                    <div className='btn'>
                        <button onClick={() => { copy() }}>
                            <i class="ri-file-copy-line"></i>
                            <p>{langjson[52][lang]}</p>
                        </button>
                        <button onClick={() => { setpop(false); setqrpop(true); }}>
                            <i class="ri-qr-code-line"></i>
                            <p>QR Code</p>
                        </button>
                        <button onClick={() => { shar() }}>
                            <i class="ri-share-forward-line"></i>
                            <p>{langjson[53][lang]}</p>
                        </button>
                    </div>
                </div>
            </div>}
            {qrpop && <div className='pop'>
                <QR clicked={() => { setqrpop(false) }} title={'Share app with QR Code'} des={app && 'App name: ' + app.name} text={window.location.href} />
            </div>}
            {load && <div className='loaddiv'>
                <div className='loadbox'>
                    <div className='cir'></div>
                    <p>{langjson[13][lang]}...</p>
                </div>
            </div>}
        </div>
    )
}

export default ViewApp

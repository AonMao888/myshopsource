import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Menu from './Menu'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../fire'
import { useNavigate } from 'react-router-dom'
import langjson from '../json/lang.json'

function AddPost() {
    const [inp, setinp] = useState('');
    const [user, setuser] = useState([]);
    const [shop, setshop] = useState([]);
    const [load, setload] = useState(false);
    const [popload, setpopload] = useState(true);
    const [lang, setlang] = useState('english');
    const navigate = useNavigate();

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
                setuser(u);
                checkshop(u);
                setpopload(false);
            } else {
                navigate('../../signin')
            }
        })
    }
    const addpost = async () => {
        let data = {
            text: inp,
            postername: user.displayName,
            posterimg: user.photoURL,
            posteremail: user.email,
            posterid: user.uid,
            shopdocid:shop.id
        }
        setload(true);
        await fetch('https://myshop-tau-two.vercel.app/add/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(r => r.json()).then(d => {
            if (d.status === 'success') {
                setload(false);
                window.alert(d.text);
                navigate('../post');
            } else {
                window.alert(d.text);
                setload(false);
            }
        })
    }
    const checkshop = async (e) => {
        await fetch('https://myshop-tau-two.vercel.app/shopbyemail?email=' + e.email).then(re => re.json()).then(all => {
            if (all.status === 'fail') {
                navigate('../../')
            } else {
                setpopload(false);
                setshop(all.data[0])
            }
        })
    }
    return (
        <div className='world'>
            <h1 className='addtitle'>{langjson[55][lang]}</h1>
            <div className='addinp'>
                <img src={user && user.photoURL} alt='' />
                <textarea placeholder={langjson[56][lang]+'...'} value={inp} onChange={(e) => { setinp(e.target.value) }}></textarea>
            </div>
            <div className='addbtn'>
                <button onClick={() => { addpost() }}>
                    {load && <div className='whiteload'></div>}
                    {langjson[57][lang]}
                </button>
            </div>
            {popload && <div className='loaddiv'>
                <div className='loadbox'>
                    <div className='cir'></div>
                    <p>Loading...</p>
                </div>
            </div>}
        </div>
    )
}

export default AddPost

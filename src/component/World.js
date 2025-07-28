import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../fire'
import langjson from '../json/lang.json'

function World() {
    const [me, setme] = useState([]);
    const [list, setlist] = useState([]);
    const [shop, setshop] = useState([]);
    const [hasshop, sethasshop] = useState(false);
    const [load, setload] = useState(true);
    const [lang, setlang] = useState('english');

    useEffect(() => {
        getlang();
        checkauth();
        fetchdata();
    }, [])

    const getlang = () => {
        let gotlang = localStorage.getItem('lang');
        if (gotlang) {
            setlang(gotlang);
        } else {
            setlang('english');
        }
    }
    const fetchdata = async () => {
        setload(true);
        await fetch('https://myshop-tau-two.vercel.app/allshop').then(re => re.json()).then(all => {
            if (all.status === 'success') {
                setlist(all.data);
                setload(false)
            }
        })
    }
    const checkauth = () => {
        onAuthStateChanged(auth, (u) => {
            if (u) {
                setme(u);
                checkshop(u);
                checkuser(u);
            }
        })
    }
    const checkuser = async (e) => {
        await fetch('https://myshop-tau-two.vercel.app/user?id=' + e.uid).then(r => r.json()).then(da => {
            if (da.text === 'No user found with this user ID!') {
                addnewuser(e);
            }
        })
    }
    const checkshop = async (e) => {
        await fetch('https://myshop-tau-two.vercel.app/shopbyemail?email=' + e.email).then(re => re.json()).then(all => {
            if (all.status === 'success') {
                sethasshop(true);
                setshop(all.data[0]);
            } else if (all.status === 'fail') {
                sethasshop(false);
            }
        })
    }
    const addnewuser = async (e) => {
        const jsondata = {
            name: e.displayName,
            profileimg: e.photoURL,
            email: e.email,
            uid: e.uid,
            creationtime: e.metadata.creationTime,
            lastsignin: e.metadata.creationTime
        }
        await fetch('https://myshop-tau-two.vercel.app/newuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsondata)
        }).then(r => r.json()).then(da => {
            if (da.status === 'success') {
                console.log(da.text);
            } else {
                console.log(da.text);
            }
        })
    }
    return (
        <div className='world'>
            {hasshop &&shop&&shop.status==='active'&& <Link to={'/post/add'} className='postbar'>
                <img src={me && me.photoURL} alt='' />
                <div className='inp'>
                    <p>{langjson[12][lang]}...</p>
                </div>
                <i class="ri-chat-3-fill"></i>
            </Link>}
            {load && <div className='loadbar'></div>}
            <div className='worldlist'>
                {list && list.map((item) => (
                    <Link to={'../shop/' + item.shopid} key={item.shopid} title='Visit this shop'>
                        <div className='back'>
                            <img src={item.background} alt='' />
                            <img src={item.logo} alt='' />
                        </div>
                        <h1>{item.shopname}</h1>
                        <hr />
                        <div className='b'>
                            <p><i class="ri-store-2-fill"></i>{item.shoptype}</p>
                            <p><i class="ri-map-pin-2-fill"></i>{item.city}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default World

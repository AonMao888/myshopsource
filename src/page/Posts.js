import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Menu from '../component/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../fire'
import langjson from '../json/lang.json'

function Posts() {
    const [me, setme] = useState([]);
    const [list, setlist] = useState([]);
    const [shop, setshop] = useState([]);
    const [load, setload] = useState(true);
    const [hasshop, sethasshop] = useState(false);
    const [lang, setlang] = useState('english');
    const navigate = useNavigate();

    useEffect(() => {
        getlang();
        getmode();
        checkauth();
        getpost();
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
    const checkauth = () => {
        onAuthStateChanged(auth, (u) => {
            if (u) {
                setme(u);
                checkshop(u);
            }
        })
    }

    const getpost = async () => {
        await fetch('https://myshop-tau-two.vercel.app/allposts').then(r => r.json()).then(dat => {
            if (dat.status === 'success') {
                setlist(dat.data);
                setload(false);
            } else {
                window.alert(dat.text);
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
    const shar = (id) => {
        window.navigator.share({
            title: 'View Post',
            url: 'https://myshop789.netlify.app/post/' + id
        })
    }
    const delpost = async (e) => {
        let ask = window.confirm(langjson[63][lang]);
        if (ask === true) {
            let data = {
                postid: e,
                requester: me.uid,
            };
            await fetch('https://myshop-tau-two.vercel.app/post/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(r => r.json()).then(dd => {
                if (dd.status === 'success') {
                    window.alert(dd.text);
                    getpost()
                } else {
                    window.alert(dd.text);
                }
            })
        }
    }
    return (
        <div className='main'>
            <Nav showsearch={true} back={true} />
            <div className='body'>
                <Menu selected={'Post'} />
                <div className='world'>
                    {load && <div className='loadbar'></div>}
                    {hasshop &&shop&&shop.status === 'active'&& <div className='postinpbar'>
                        <Link to={'/post/add'}>
                            <img src={me && me.photoURL} alt='' />
                            <p>{langjson[12][lang]}</p>
                            <i class="ri-chat-3-fill"></i>
                        </Link>
                        <Link to={'/post/mine'} className='my'>
                            <i class="ri-account-pin-box-fill"></i>
                            <span>{langjson[64][lang]}</span>
                        </Link>
                    </div>}
                    <div className='postlist'>
                        {list && list.map((item) => (
                            <div key={item.id} className='postitem'>
                                <p className='text'>{item.text}</p>
                                <hr />
                                <div className='postdes'>
                                    <Link to={'/profile/' + item.posterid}>
                                        <img src={item.posterimg} alt='' />
                                        <h3>{item.postername}</h3>
                                    </Link>
                                    <div className='postbtn'>
                                        <p><i class="ri-calendar-event-line"></i>{item.time}</p>
                                        {me.uid === item.posterid &&shop&&shop.status === 'active'&& <button onClick={() => { delpost(item.id) }} className='del'>
                                            <i class="ri-delete-bin-5-line"></i>
                                        </button>}
                                        <button className='sh' onClick={() => { shar(item.id) }}>
                                            <i class="ri-share-forward-line"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts

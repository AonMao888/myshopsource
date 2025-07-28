import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Menu from './Menu'
import { Link, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../fire'
import ProgressBarCircle from './ProgressBarCircle';
import langjson from '../json/lang.json'

function Reviews() {
    const [me, setme] = useState(null);
    const [sdata, setsdata] = useState([]);
    const [list, setlist] = useState([]);
    const [load, setload] = useState(true);
    const [addload, setaddload] = useState(false);
    const [showinp, setshowinp] = useState(false);
    const [inp, setinp] = useState('');
    const [lang, setlang] = useState('english');
    const { id } = useParams();

    useEffect(() => {
        getlang();
        getmode();
        checkauth();
        fetchdata();
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
    const checkauth = () => {
        onAuthStateChanged(auth, (u) => {
            if (u) {
                setme(u);
            }
        })
    }
    const fetchdata = async () => {
        await fetch('https://myshop-tau-two.vercel.app/shop?id=' + id).then(re => re.json()).then(all => {
            if (all.status === 'success') {
                setsdata(all.data[0]);
                getreviews(all.data[0]);
                setload(false);
            }
        })
    }
    const getreviews = async (g) => {
        await fetch(g&&'https://myshop-tau-two.vercel.app/get/review/' + g.id).then(re => re.json()).then(all => {
            if (all.status === 'success') {
                setlist(all.data);
            } else {
                setlist([]);
            }
        })
    }
    const addreview = () => {
        if (inp.length > 1) {
            let da = {
                shopid: id,
                shopdocid:sdata.id,
                shopname: sdata.shopname,
                posterid: me.uid,
                postername: me.displayName,
                posterimg: me.photoURL,
                posteremail: me.email,
                text: inp
            }
            setaddload(true);
            fetch('https://myshop-tau-two.vercel.app/add/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(da)
            }).then(r => r.json()).then(al => {
                if (al.status === 'success') {
                    window.alert(al.text);
                    setaddload(false);
                    setinp('');
                    setshowinp(false);
                    window.location.reload();
                } else {
                    window.alert(al.text);
                    setaddload(false);
                }
            })
        }
    }
    const deletereview = async (e) => {
        let ask = window.confirm(langjson[69][lang]);
        if (ask === true) {
            let da = {
                requesterid: me.uid,
                requesteremail: me.email,
                shopid: e.shopid
            }
            await fetch('https://myshop-tau-two.vercel.app/delete/review/' + e.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(da)
            }).then(r => r.json()).then(sa => {
                if (sa.status === 'success') {
                    window.alert(sa.text);
                    window.location.reload();
                } else {
                    window.alert(sa.text);
                }
            })
        }
    }
    return (
        <div className='main'>
            <Nav back={true} />
            <div className='body'>
                <Menu />
                <div className='review'>
                    {load && <div className='loaddiv'>
                        <div className='loadbox'>
                            <div className='cir'></div>
                            <p>{langjson[13][lang]}...</p>
                        </div>
                    </div>}
                    <div className='shopbackdiv'>
                        <img className='shopback' src='https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg' alt='' />
                    </div>
                    <div className='shopdetail'>
                        <img src={sdata && sdata.logo} alt='' />
                        <h1>{sdata && sdata.shopname}</h1>
                        <div className='shopdetailbar'>
                            <p><i class="ri-store-2-fill"></i>{sdata && sdata.shoptype}</p>
                        </div>
                        <p className='shopdes'>{sdata && sdata.shopdes}</p>
                    </div>
                    <div className='reviewdiv'>
                        <div className='left'>
                            <div className='score'>
                                <h3>{langjson[14][lang]}</h3>
                                <div className='cir'>
                                    <ProgressBarCircle
                                        percentage={list.length}
                                        size={200}
                                        strokeWidth={9}
                                        color='#ff4545'
                                        trackColor='var(--back)'
                                        mainText={list.length + '/100'}
                                        subText={langjson[65][lang]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='right'>
                            {me &&sdata&&sdata.status==='active'&& <div className='reviewinp'>
                                <img src={me && me.photoURL} alt='' />
                                {!showinp && <p onClick={() => { setshowinp(true) }} className='add'>{langjson[66][lang]}</p>}
                                {showinp && <div className='inp'>
                                    <textarea value={inp} onChange={(e) => { setinp(e.target.value) }} placeholder='...'></textarea>
                                    <div className='btn'>
                                        <button onClick={() => { addreview() }} className='post'>{addload && <div className='whiteload'></div>}{langjson[67][lang]}</button>
                                        <button onClick={() => { setshowinp(false); setinp('') }} className='close'>{langjson[68][lang]}</button>
                                    </div>
                                </div>}
                            </div>}
                            {list && list.map((item) => (
                                <div key={item.posterid} className='postitem'>
                                    <p className='text'>{item.text}</p>
                                    <hr />
                                    <div className='postdes'>
                                        <Link to={'/profile/' + item.posterid}>
                                            <img src={item.posterimg} alt='' />
                                            <h3>{item.postername}</h3>
                                        </Link>
                                        <div style={{ marginRight: 9 }} className='postbtn'>
                                            <p><i class="ri-calendar-event-line"></i>{item.time}</p>
                                            {me && item.posterid === me.uid && <button onClick={() => { deletereview(item) }} style={{ color: '#ff4545', marginLeft: 7 }} className='del'><i class="ri-delete-bin-5-line"></i></button>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {list && list.length <= 0 && <div className='nopost'>
                                <i class="ri-file-warning-line"></i>
                                <h3>No reviews</h3>
                                <p>There have no reviews yet.</p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews

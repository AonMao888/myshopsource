import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Menu from '../component/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../fire'

function MyPost() {
    const [me, setme] = useState([]);
    const [list, setlist] = useState([]);
    const [load, setload] = useState(true);
    const [nopo, setnopo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkauth();
    }, [])

    const checkauth = () => {
        onAuthStateChanged(auth, (u) => {
            if (u) {
                setme(u);
                getpost(u);
            } else {
                navigate('../')
            }
        })
    }

    const getpost = async (e) => {
        await fetch('https://myshop-tau-two.vercel.app/postbyposter/'+e.uid).then(r => r.json()).then(dat => {
            if (dat.status === 'success') {
                setlist(dat.data);
                setload(false);
            } else {
                if (dat.text === 'No post!') {
                    setnopo(true);
                    setload(false);
                }else{
                    window.alert(dat.text);
                }
            }
        })
    }
    const shar = (id) => {
        window.navigator.share({
            title: 'View Post',
            url: 'https://myshop-tau-two.vercel.app/post/' + id
        })
    }
    const delpost = async (e) => {
        let ask = window.confirm('Are you sure to delete this post?');
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
        <div className='world'>
            {load && <div className='loadbar'></div>}
            <div className='postinpbar'>
                <Link to={'/post/add'}>
                    <p>What's new to post</p>
                    <i class="ri-map-pin-2-fill"></i>
                    <i class="ri-chat-3-fill"></i>
                </Link>
            </div>
            {nopo&&<div className='nopost'>
                <i class="ri-file-warning-line"></i>
                <h3>No post</h3>
                <p>You currently havn't post any post.</p>
            </div>}
            <div className='postlist'>
                {list && list.map((item) => {
                    if (item.posterid === me.uid) {
                        return (
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
                                        <button onClick={() => { delpost(item.id) }} className='del'>
                                            <i class="ri-delete-bin-5-line"></i>
                                        </button>
                                        <button onClick={() => { shar(item.id) }}>
                                            <i class="ri-share-forward-line"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default MyPost
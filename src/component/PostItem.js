import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function PostItem({postid}) {
    const [load,setload] = useState(true);
    const [data,setdata] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        getdata();
    },[])

    const getdata=()=>{
        fetch('https://myshop-tau-two.vercel.app/post/'+postid).then(r=>r.json()).then(da=>{
            if (da.status === 'success') {
                setdata(da.data);
                setload(false);
            }else{
                navigate('../../');
            }
        })
    }

    const shar=(id)=>{
        window.navigator.share({
            title:'View Post',
            url:'https://myshop-tau-two.vercel.app/post/'+id
        })
    }
    return (
        <div className='postlist'>
            {load&&<div className='loadbar'></div>}
            {!load&&<div style={{marginTop:19}} key={'1'} className='postitem'>
                <p className='text'>{data&&data.text}</p>
                <hr />
                <div className='postdes'>
                    <Link to={'/profile/'}>
                        <img src={data&&data.posterimg} alt='' />
                        <h3>{data&&data.postername}</h3>
                    </Link>
                    <div className='postbtn'>
                        <p><i class="ri-calendar-event-line"></i>{data&&data.time}</p>
                        <button onClick={() => {shar(data&&data.id)}}>
                            <i class="ri-share-forward-line"></i>
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default PostItem

import React, { useEffect, useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom';
import QR from './QR';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../fire'
import langjson from '../json/lang.json'

function ShopItem({ shopid }) {
    const [sdata, setsdata] = useState([]);
    const [me, setme] = useState([]);
    const [anothercontact, setanothercontact] = useState([]);
    const [postlist, setpostlist] = useState([]);
    const [currentedit, setcurrentedit] = useState([]);
    const [reviews, setreviews] = useState([]);
    const [currentanotheredit, setcurrentanotheredit] = useState([]);
    const [melocation, setmelocation] = useState(null);
    const [inp, setinp] = useState('');
    const [appname, setappname] = useState('');
    const [applink, setapplink] = useState('');
    const [labelcolor, setlabelcolor] = useState('#ff4545');
    const [load, setload] = useState(true);
    const [isupdate, setisupdate] = useState(false);
    const [showqr, setshowqr] = useState(false);
    const [pop, setpop] = useState(false);
    const [addnewpop, setaddnewpop] = useState(false);
    const [addpopload, setaddpopload] = useState(false);
    const [isaddedit, setisaddedit] = useState(false);
    const [popload, setpopload] = useState(false);
    const [addmappop, setaddmappop] = useState(false);
    const [mapload, setmapload] = useState(false);
    const [nopo, setnopo] = useState(false);
    const [isowner, setisowner] = useState(false);
    const [isblock, setisblock] = useState(false);
    const [current, setcurrent] = useState('Overview');
    const [todel, settodel] = useState('');
    const [picklocation, setpicklocation] = useState(null);
    const [lang, setlang] = useState('english');
    const navigate = useNavigate();

    useEffect(() => {
        getlang();
        getmode();
        checkauth();
        fetchdata();
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
    const getcurrentlocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setmelocation([latitude, longitude]);
                }
            )
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
        await fetch('https://myshop-tau-two.vercel.app/shop?id=' + shopid).then(re => re.json()).then(all => {
            if (all.status === 'success') {
                let shopd = all.data[0];
                setsdata(shopd);
                getreviews(shopd);
                getpost(shopd);
                setload(false);
                if (shopd.anothercontact) {
                    setanothercontact(Object.values(shopd.anothercontact))
                }
                if (shopd.ownerid === me.uid) {
                    setisowner(true);
                }
                if (shopd.status === 'block') {
                    setisblock(true);
                }
            }
        })
    }
    const getreviews = async (e) => {
        await fetch('https://myshop-tau-two.vercel.app/get/review/' + e.id).then(re => re.json()).then(all => {
            if (all.status === 'success') {
                setreviews(all.data);
            }
        })
    }
    const getpost = (e) => {
        fetch('http://localhost/postbyposter/' + e.id).then(re => re.json()).then(all => {
            if (all.status === 'success') {
                setpostlist(all.data);
            } else {
                setnopo(true)
            }
        })
    }
    const shar = (e) => {
        if (sdata) {
            window.navigator.share({
                title: sdata + "'s shop",
                url: e
            })
        }
    }
    const customMarkerIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/9131/9131546.png',
        iconSize: [36, 36],
        iconAnchor: [18, 38],
        popupAnchor: [0, -39]
    });
    const copytext = (e) => {
        let inp = document.createElement('input');
        inp.value = e;
        document.body.appendChild(inp);
        inp.select();
        document.execCommand('copy');
        inp.remove();
        window.alert('Copied');
    }
    const go = (e) => {
        window.location.href = e;
    }
    const submit = async () => {
        setpopload(true);
        let data = {
            contacttype: currentedit[4],
            current: currentedit[3],
            new: inp,
            shopid: sdata.shopid,
            posterid: me.uid,
            isupdate: isupdate
        };
        await fetch('https://myshop-tau-two.vercel.app/contact/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(r => r.json()).then(s => {
            if (s.status === 'success') {
                window.alert(s.text);
                setpopload(false);
                setpop(false);
                setcurrentedit([]);
                setinp('');
                fetchdata();
            } else {
                window.alert(s.text);
                setpopload(false);
            }
        })
    }
    const addnewaccount = async () => {
        setaddpopload(true);
        let data = {
            appname: appname,
            applink: applink,
            labelcolor: labelcolor,
            shopid: sdata.shopid,
            posterid: me.uid,
            isupdate: isaddedit
        };
        await fetch('https://myshop-tau-two.vercel.app/contact/addanother', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(r => r.json()).then(s => {
            if (s.status === 'success') {
                window.alert(s.text);
                setaddpopload(false);
                setaddnewpop(false);
                setappname('');
                setapplink('');
                setlabelcolor('royalblue');
                fetchdata();
            } else {
                window.alert(s.text);
                setaddpopload(false);
            }
        })
    }
    const delaccount = async (e) => {
        let da = {
            appname: todel.appname,
            posterid: me.uid,
            shopid: sdata.shopid
        };
        await fetch('https://myshop-tau-two.vercel.app/delanotheraccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(da)
        }).then(r => r.json()).then(dd => {
            if (dd.status === 'success') {
                window.alert(dd.text);
                setaddnewpop(false);
                setapplink('');
                setappname('');
                setlabelcolor('royalblue');
                fetchdata();
            } else {
                window.alert(dd.text);
            }
        })
    }
    const addlocation = async () => {
        let data = {
            lat: picklocation.lat.toFixed(4),
            long: picklocation.lng.toFixed(4),
            posterid: me.uid,
            shopid: sdata.shopid
        };
        setmapload(true);
        if (picklocation) {
            await fetch('https://myshop-tau-two.vercel.app/addlocation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(r => r.json()).then(ad => {
                if (ad.status === 'success') {
                    window.alert(ad.text);
                    setmapload(false);
                    setaddmappop(false);
                } else {
                    window.alert(ad.text);
                    setmapload(false);
                }
            })
        } else {
            window.alert('Please select location!')
        }
    }
    function MapClickHandler() {
        const map = useMapEvents({
            click: (e) => {
                setpicklocation(e.latlng);
            }
        });
        return null;
    }
    return (
        <div className='shopview'>
            {load && <div className='loaddiv'>
                <div className='loadbox'>
                    <div className='cir'></div>
                    <p>{langjson[13][lang]}...</p>
                </div>
            </div>}
            {isblock&&<div className='banned'>
                This shop is under blocked
            </div>}
            <div className='shopbackdiv'>
                <div className='shopshare'>
                    <button onClick={() => { setshowqr(true) }}>
                        <i class="ri-qr-code-line"></i>
                    </button>
                    <button onClick={() => { shar(window.location.href) }}>
                        <i class="ri-share-forward-line"></i>
                    </button>
                </div>
                <img className='shopback' src='https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg' alt='' />
            </div>
            <div className='shopdetail'>
                <img src={sdata && sdata.logo} alt='' />
                <h1>{sdata && sdata.shopname}</h1>
                <div className='shopdetailbar'>
                    <p><i class="ri-store-2-fill"></i>{sdata && sdata.shoptype}</p>
                    <hr />
                    <Link to={sdata && '/shop/' + sdata.shopid + '/reviews'}><i class="ri-star-half-fill"></i> {langjson[14][lang]} {reviews ? '('+reviews.length+')':0}</Link>
                </div>
                <p className='shopdes'>{sdata && sdata.shopdes}</p>
            </div>
            <div className='shoptab'>
                <button onClick={() => { setcurrent('Overview') }} className={current === 'Overview' && 'active'}>{langjson[15][lang]}</button>
                <button onClick={() => { setcurrent('Contact') }} className={current === 'Contact' && 'active'}>{langjson[16][lang]}</button>
                <button onClick={() => { setcurrent('Map') }} className={current === 'Map' && 'active'}>{langjson[3][lang]}</button>
            </div>
            {current === 'Overview' && <div className='shopoverview'>
                <div className='left'>
                    <div className='item'>
                        <i style={{ background: '#ff703c56' }} class="ri-store-2-line"></i>
                        <h3>{langjson[17][lang]}</h3>
                        <p>{sdata && sdata.shoptype}</p>
                    </div>
                    <div className='item'>
                        <i style={{ background: '#70c24d53' }} class="ri-verified-badge-line"></i>
                        <h3>{langjson[18][lang]}</h3>
                        <p>{sdata && sdata.verify}</p>
                    </div>
                    <div className='item'>
                        <i style={{ background: '#c562b059' }} class="ri-user-follow-line"></i>
                        <h3>{langjson[19][lang]}</h3>
                        <p>{sdata && sdata.ownername}</p>
                    </div>
                    <div className='item'>
                        <i style={{ background: '#efe5565c' }} class="ri-map-pin-2-line"></i>
                        <h3>{langjson[20][lang]}</h3>
                        <p>{sdata && sdata.city}</p>
                    </div>
                </div>
                <div className='right'>
                    <h2 className='title'>{langjson[21][lang]}</h2>
                    {nopo && <div className='nopost'>
                        <i class="ri-file-warning-line"></i>
                        <h3>{langjson[22][lang]}</h3>
                        <p>{langjson[23][lang]}</p>
                    </div>}
                    {postlist && postlist.map((item, index) => (
                        <div key={index} className='postitem'>
                            <p className='text'>{item.text}</p>
                            <hr />
                            <div className='postdes'>
                                <p><i class="ri-calendar-event-line"></i>{item.time}</p>
                                <div className='postbtn'>
                                    <button onClick={() => { shar('http://localhost/post/' + item.id) }}>
                                        <i class="ri-share-forward-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
            {current === 'Contact' && <div className='shopoverview'>
                <div className='left'>
                    <div className='item'>
                        <i style={{ background: '#ff703c56' }} class="ri-store-2-line"></i>
                        <h3>{langjson[17][lang]}</h3>
                        <p>{sdata && sdata.shoptype}</p>
                    </div>
                    <div className='item'>
                        <i style={{ background: '#70c24d53' }} class="ri-verified-badge-line"></i>
                        <h3>{langjson[18][lang]}</h3>
                        <p>{sdata && sdata.verify}</p>
                    </div>
                    <div className='item'>
                        <i style={{ background: '#c562b059' }} class="ri-user-follow-line"></i>
                        <h3>{langjson[19][lang]}</h3>
                        <p>{sdata && sdata.ownername}</p>
                    </div>
                    <div className='item'>
                        <i style={{ background: '#efe5565c' }} class="ri-map-pin-2-line"></i>
                        <h3>{langjson[20][lang]}</h3>
                        <p>{sdata && sdata.city}</p>
                    </div>
                </div>
                <div className='right'>
                    <h2 className='title'>{langjson[16][lang]}</h2>
                    <div className='contactitem'>
                        <i style={{ background: '#f3571f52', paddingTop: 14, paddingBottom: 14 }} class="fa-solid fa-store"></i>
                        <div className='ii'>
                            <span>{langjson[24][lang]}</span>
                            <p>{sdata && sdata.id}</p>
                        </div>
                        <div className='bb'>
                            <button onClick={() => { copytext(sdata && sdata.id) }}>
                                <i class="ri-file-copy-line"></i>
                            </button>
                            <a href={window.location.href}>
                                <i class="ri-external-link-line"></i>
                            </a>
                        </div>
                    </div>
                    <div className='contactitem'>
                        <i style={{ background: '#a0896359' }} class="ri-mail-line"></i>
                        <div className='ii'>
                            <span>{langjson[25][lang]}</span>
                            <p>{sdata && sdata.email}</p>
                        </div>
                        <div className='bb'>
                            <button onClick={() => { copytext(sdata && sdata.email) }}>
                                <i class="ri-file-copy-line"></i>
                            </button>
                        </div>
                    </div>
                    <div className='contactitem'>
                        <i style={{ background: '#9087f161' }} class="ri-phone-fill"></i>
                        <div className='ii'>
                            <span>{langjson[26][lang]}</span>
                            <p>{sdata && sdata.contact.phone ? sdata.contact.phone : '???'}</p>
                        </div>
                        {sdata && sdata.contact.phone && <div className='bb'>
                            <button onClick={() => { copytext(sdata && sdata.contact.phone && sdata.contact.phone) }}>
                                <i class="ri-file-copy-line"></i>
                            </button>
                            {sdata.ownerid === me.uid &&sdata.status === 'active' && <button onClick={() => { setpop(true); setisupdate(true); setcurrentedit(['ri-phone-fill', '#9087f161', 'Edit phone numbers', sdata.contact.phone ? sdata.contact.phone : '', 'phone']) }}>
                                <i class="ri-pencil-fill"></i>
                            </button>}
                        </div>}
                        {sdata && !sdata.contact.phone && sdata.ownerid === me.uid && sdata.status === 'active' && <div className='bb'>
                            <button onClick={() => { setpop(true); setisupdate(false); setcurrentedit(['ri-phone-fill', '#9087f161', 'Add phone numbers', '', 'phone']) }}>
                                <i class="ri-add-line"></i>
                            </button>
                        </div>}
                    </div>
                    <div className='contactitem'>
                        <i style={{ background: '#5bf03262' }} class="fa-brands fa-weixin"></i>
                        <div className='ii'>
                            <span>Wechat</span>
                            <p>{sdata && sdata.contact.wechat ? sdata.contact.wechat : '???'}</p>
                        </div>
                        {sdata && sdata.contact.wechat && <div className='bb'>
                            <button onClick={() => { copytext(sdata && sdata.contact.wechat && sdata.contact.phone) }}>
                                <i class="ri-file-copy-line"></i>
                            </button>
                            {sdata.ownerid === me.uid &&sdata.status === 'active' && <button onClick={() => { setpop(true); setisupdate(true); setcurrentedit(['fa-brands fa-weixin', '#5bf03262', 'Edit wechat ID', sdata.contact.wechat ? sdata.contact.wechat : '', 'wechat']) }}>
                                <i class="ri-pencil-fill"></i>
                            </button>}
                        </div>}
                        {sdata && !sdata.contact.wechat && sdata.ownerid === me.uid && sdata.status === 'active' && <div className='bb'>
                            <button onClick={() => { setpop(true); setisupdate(false); setcurrentedit(['fa-brands fa-weixin', '#5bf03262', 'Add wechat account', '', 'wechat', 'Enter wechat account ID.']) }}>
                                <i class="ri-add-line"></i>
                            </button>
                        </div>}
                    </div>
                    <div className='contactitem'>
                        <i style={{ background: '#86868645', paddingRight: 14, paddingLeft: 14 }} class="fa-brands fa-tiktok"></i>
                        <div className='ii'>
                            <span>TikTok</span>
                            <p>{sdata && sdata.contact.tiktok ? sdata.contact.tiktok : '???'}</p>
                        </div>
                        {sdata && sdata.contact.tiktok && <div className='bb'>
                            <button onClick={() => { copytext(sdata && sdata.contact.wechat && sdata.contact.phone) }}>
                                <i class="ri-file-copy-line"></i>
                            </button>
                            {sdata.ownerid === me.uid &&sdata.status === 'active' && <button onClick={() => { setpop(true); setisupdate(true); setcurrentedit(['fa-brands fa-tiktok', '#86868645', 'Edit tiktok account', sdata.contact.tiktok ? sdata.contact.tiktok : '', 'tiktok']) }}>
                                <i class="ri-pencil-fill"></i>
                            </button>}
                        </div>}
                        {sdata && !sdata.contact.tiktok && sdata.ownerid === me.uid && sdata.status === 'active' && <div className='bb'>
                            <button onClick={() => { setpop(true); setisupdate(false); setcurrentedit(['fa-brands fa-tiktok', '#86868645', 'Add tiktok account', '', 'tiktok', 'Enter tiktok account ID.']) }}>
                                <i class="ri-add-line"></i>
                            </button>
                        </div>}
                    </div>
                    <div className='contactitem'>
                        <i style={{ background: '#86868645', paddingRight: 14, paddingLeft: 14 }} class="fa-brands fa-tiktok"></i>
                        <div className='ii'>
                            <span>抖音</span>
                            <p>{sdata && sdata.contact.douyin ? sdata.contact.douyin : '???'}</p>
                        </div>
                        {sdata && sdata.contact.douyin && <div className='bb'>
                            <button onClick={() => { copytext(sdata && sdata.contact.douyin && sdata.contact.douyin) }}>
                                <i class="ri-file-copy-line"></i>
                            </button>
                            {sdata.ownerid === me.uid &&sdata.status === 'active' && <button onClick={() => { setpop(true); setisupdate(true); setcurrentedit(['fa-brands fa-tiktok', '#86868645', 'Edit douyin account', sdata.contact.douyin ? sdata.contact.douyin : '', 'douyin']) }}>
                                <i class="ri-pencil-fill"></i>
                            </button>}
                        </div>}
                        {sdata && !sdata.contact.douyin && sdata.ownerid === me.uid && sdata.status === 'active' && <div className='bb'>
                            <button onClick={() => { setpop(true); setisupdate(false); setcurrentedit(['fa-brands fa-tiktok', '#86868645', 'Add douyin account', '', 'douyin', 'Enter douyin account ID.']) }}>
                                <i class="ri-add-line"></i>
                            </button>
                        </div>}
                    </div>
                    <div className='contactitem'>
                        <i style={{ background: '#1f5fdf62' }} class="fa-brands fa-telegram"></i>
                        <div className='ii'>
                            <span>Telegram</span>
                            <p>{sdata && sdata.contact.telegram ? sdata.contact.telegram : '???'}</p>
                        </div>
                        {sdata && sdata.contact.telegram && <div className='bb'>
                            <button onClick={() => { copytext(sdata && sdata.contact.telegram && sdata.contact.telegram) }}>
                                <i class="ri-file-copy-line"></i>
                            </button>
                            {sdata.ownerid === me.uid &&sdata.status === 'active' && <button onClick={() => { setpop(true); setisupdate(true); setcurrentedit(['fa-brands fa-telegram', '#1f5fdf62', 'Edit telegram username', sdata.contact.telegram ? sdata.contact.telegram : '', 'telegram']) }}>
                                <i class="ri-pencil-fill"></i>
                            </button>}
                        </div>}
                        {sdata && !sdata.contact.telegram && sdata.ownerid === me.uid && sdata.status === 'active' && <div className='bb'>
                            <button onClick={() => { setpop(true); setisupdate(false); setcurrentedit(['fa-brands fa-telegram', '#1f5fdf62', 'Add telegram username', '', 'telegram', 'Enter telegram account username.']) }}>
                                <i class="ri-add-line"></i>
                            </button>
                        </div>}
                    </div>
                    <div className='contactitem'>
                        <i style={{ background: 'royalblue' }} class="fa-brands fa-facebook"></i>
                        <div className='ii'>
                            <span>Facebook</span>
                            <p>{sdata && sdata.contact.facebook ? sdata.contact.facebook : '???'}</p>
                        </div>
                        {sdata && sdata.contact.facebook && <div className='bb'>
                            <button onClick={() => { copytext(sdata && sdata.contact.facebook && sdata.contact.facebook) }}>
                                <i class="ri-file-copy-line"></i>
                            </button>
                            {sdata.ownerid === me.uid &&sdata.status === 'active' && <button onClick={() => { setpop(true); setisupdate(true); setcurrentedit(['fa-brands fa-facebook', 'royalblue', 'Edit facebook account', sdata.contact.facebook ? sdata.contact.facebook : '', 'facebook']) }}>
                                <i class="ri-pencil-fill"></i>
                            </button>}
                        </div>}
                        {sdata && !sdata.contact.facebook && sdata.ownerid === me.uid && sdata.status === 'active' && <div className='bb'>
                            <button onClick={() => { setpop(true); setisupdate(false); setcurrentedit(['fa-brands fa-facebook', 'royalblue', 'Add facebook account', '', 'facebook', 'Enter facebook account profile link.']) }}>
                                <i class="ri-add-line"></i>
                            </button>
                        </div>}
                    </div>
                    <div className='contactitem'>
                        <i style={{ background: '#7414e262' }} class="fa-brands fa-viber"></i>
                        <div className='ii'>
                            <span>Viber</span>
                            <p>{sdata && sdata.contact.viber ? sdata.contact.viber : '???'}</p>
                        </div>
                        {sdata && sdata.contact.viber && <div className='bb'>
                            <button onClick={() => { copytext(sdata && sdata.contact.viber && sdata.contact.viber) }}>
                                <i class="ri-file-copy-line"></i>
                            </button>
                            {sdata.ownerid === me.uid &&sdata.status === 'active' && <button onClick={() => { setpop(true); setisupdate(true); setcurrentedit(['fa-brands fa-viber', '#7414e262', 'Edit viber number', sdata.contact.viber ? sdata.contact.viber : '', 'viber']) }}>
                                <i class="ri-pencil-fill"></i>
                            </button>}
                        </div>}
                        {sdata && !sdata.contact.viber && sdata.ownerid === me.uid && sdata.status === 'active' && <div className='bb'>
                            <button onClick={() => { setpop(true); setisupdate(false); setcurrentedit(['fa-brands fa-viber', '#7414e262', 'Add viber number', '', 'viber', 'Enter viber account phone number.']) }}>
                                <i class="ri-add-line"></i>
                            </button>
                        </div>}
                    </div>
                    {sdata && anothercontact && anothercontact.map((item) => (
                        <div key={item.name} className='contactitem'>
                            <div style={{ background: item.labelcolor }} className='applabelcolor'></div>
                            <div className='ii'>
                                <span>{item.appname}</span>
                                <p>{item.applink}</p>
                            </div>
                            <div className='bb'>
                                <button onClick={() => { copytext(item.applink) }}>
                                    <i class="ri-file-copy-line"></i>
                                </button>
                                <a href={item.applink}>
                                    <i class="ri-external-link-line"></i>
                                </a>
                                {sdata&&sdata.ownerid===me.uid&&sdata.status === 'active' &&<button onClick={() => { setaddnewpop(true); setisaddedit(true); setlabelcolor(item.labelcolor); setappname(item.appname); setapplink(item.applink); settodel(item) }}>
                                    <i class="ri-pencil-fill"></i>
                                </button>}
                            </div>
                        </div>
                    ))}
                    {sdata && sdata.ownerid === me.uid &&sdata.status === 'active' && <div onClick={() => { setaddnewpop(true); setisaddedit(false); }} style={{ cursor: 'pointer' }} className='contactitem'>
                        <i style={{ background: '#a1a1a13d' }} class="ri-add-large-line"></i>
                        <p className='add'>{langjson[27][lang]}</p>
                    </div>}
                </div>
            </div>}
            {current === 'Map' && <div className='shopmap'>
                {!load && sdata.lat && (
                    <MapContainer
                        center={[sdata.lat, sdata.long]}
                        zoom={20}
                        className='mapdiv'
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            position={[sdata.lat, sdata.long]}
                            icon={customMarkerIcon}
                        >
                            <Popup
                                minWidth={360}
                                maxWidth={450}
                            >
                                <div className='mappopdiv'>
                                    <h3 className='poptitle'>{sdata.shopname}</h3>
                                    <p>{sdata.shopdes}</p>
                                    <Link to={`http://maps.google.com/maps?daddr=${sdata.lat},${sdata.long}&amp;ll=`} className='poplink'>{langjson[70][lang]}</Link>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                )}
                {sdata && sdata.ownerid === me.uid &&sdata.status === 'active' && <button className='mappen' onClick={() => { setaddmappop(true); getcurrentlocation(); }}>
                    <i class="ri-pencil-fill"></i>
                </button>}
            </div>}
            {showqr && <QR clicked={() => { setshowqr(false) }} title={'Share via QR Code'} des={sdata && sdata.shopname + "'s shop"} text={window.location.href} />}
            {pop && <div className='pop'>
                <div className='div'>
                    <button className='close' onClick={() => { setpop(false); setcurrentedit([]); setinp('') }}>
                        <i class="ri-close-large-line"></i>
                    </button>
                    <div className='head'>
                        <i style={{ color: currentedit && currentedit[1] }} class={currentedit && currentedit[0]}></i>
                        <h1>{currentedit && currentedit[2]}</h1>
                    </div>
                    {currentedit && currentedit[5] && <p>{currentedit && currentedit[5]}</p>}
                    {isupdate && <p>{langjson[30][lang]} <b>{currentedit && currentedit[3]}</b></p>}
                    <input value={inp} onChange={(e) => { setinp(e.target.value) }} type={currentedit && currentedit[4] === 'phone' ? 'number' : 'text'} placeholder='...' />
                    <div className='btn'>
                        <button onClick={() => { submit() }} className='submit'>{popload && <div className='whiteload'></div>}{isupdate ? langjson[29][lang] : langjson[28][lang]}</button>
                    </div>
                </div>
            </div>}
            {addnewpop && <div className='pop'>
                <div className='div'>
                    <button className='close' onClick={() => { setaddnewpop(false); setapplink(''); setappname(''); setlabelcolor('royalblue') }}>
                        <i class="ri-close-large-line"></i>
                    </button>
                    <div className='head'>
                        <h1>{langjson[31][lang]}</h1>
                    </div>
                    <div className='labelbar'>
                        <label htmlFor='col' style={{ display: 'flex', alignItems: 'center' }}>
                            {langjson[32][lang]}
                            <div className='previewcolor' style={{ background: labelcolor }}></div>
                            <input id='col' value={labelcolor} onInput={(e) => { setlabelcolor(e.target.value) }} className='color' type='color' />
                        </label>
                    </div>
                    <label htmlFor='appname'>{langjson[33][lang]}</label>
                    <input value={appname} onChange={(e) => { setappname(e.target.value) }} id='appname' type='text' maxLength={29} placeholder='...' />
                    <label htmlFor='applink'>{langjson[34][lang]}</label>
                    <input value={applink} onChange={(e) => { setapplink(e.target.value) }} id='applink' type='text' placeholder='...' />
                    <div className='btn'>
                        {isaddedit && <button onClick={() => { delaccount() }} className='del'><i class="ri-delete-bin-fill"></i>{langjson[35][lang]}</button>}
                        <button onClick={() => { addnewaccount() }} className='submit'>{addpopload && <div className='whiteload'></div>}{isaddedit ? langjson[29][lang] : langjson[28][lang]}</button>
                    </div>
                </div>
            </div>}
            {addmappop && <div className='pop'>
                <div className='mappop'>
                    <div className='nav'>
                        <h1>{langjson[36][lang]}</h1>
                        <div className='navbtn'>
                            {melocation && <button className='add' onClick={() => { addlocation() }}>{mapload && <div className='whiteload'></div>}{langjson[28][lang]}</button>}
                            <button onClick={() => { setaddmappop(false); }} className='close'><i class="ri-close-large-line"></i></button>
                        </div>
                    </div>
                    {!melocation && <div className='req'>
                        <h3>{langjson[37][lang]}</h3>
                        <button onClick={() => { getcurrentlocation() }}>{langjson[38][lang]}</button>
                    </div>}
                    {melocation && <MapContainer
                        center={[melocation[0], melocation[1]]}
                        zoom={18}
                        className='mapdiv'
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapClickHandler />
                        {picklocation && <Marker
                            position={picklocation}
                            icon={customMarkerIcon}
                        >
                            <Popup
                                minWidth={360}
                                maxWidth={450}
                            >
                                <div className='mappopdiv'>
                                    <h3 className='poptitle'>Pick this location</h3>
                                    <p>Latitude: {picklocation.lat.toFixed(4)}<br />Longitude: {picklocation.lng.toFixed(4)}</p>
                                </div>
                            </Popup>
                        </Marker>}
                    </MapContainer>}
                </div>
            </div>}
        </div>
    )
}

export default ShopItem

import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Chart from '../component/Chart'
import { Link, useNavigate } from 'react-router-dom';
import langjson from '../json/lang.json'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../fire'

function Admin() {
  const [me, setme] = useState([]);
  const [currentpage, setcurrentpage] = useState('allshop');
  const [allshop, setallshop] = useState([]);
  const [allapp, setallapp] = useState([]);
  const [allrequest, setallrequests] = useState([]);
  const [load, setload] = useState(true);
  const [ask, setask] = useState(true);
  const [askid, setaskid] = useState('');
  const [askpass, setaskpass] = useState('');
  const [popload, setpopload] = useState(false);
  const [addload, setaddload] = useState(false);
  const [secload, setsecload] = useState(false);
  const [showpop, setshowpop] = useState(false);
  const [apppop, setapppop] = useState(false);
  const [addpop, setaddpop] = useState(false);
  const [apppoptype, setapppoptype] = useState('add');
  const [shoplogo, setshoplogo] = useState('');
  const [shopname, setshopname] = useState('');
  const [shoptype, setshoptype] = useState('');
  const [shopdes, setshopdes] = useState('');
  const [shopcity, setshopcity] = useState('');
  const [shopemail, setshopemail] = useState('');
  const [currentshopid, setcurrentshopid] = useState('');
  const [shopid, setshopid] = useState('');
  const [shopdocid, setshopdocid] = useState('');
  const [shopstatus, setshopstatus] = useState('');
  const [appname, setappname] = useState('');
  const [apptype, setapptype] = useState('');
  const [applogo, setapplogo] = useState('');
  const [appid, setappid] = useState('');
  const [applink, setapplink] = useState('');
  const [lang, setlang] = useState('english');
  const navigate = useNavigate();

  useEffect(() => {
    getlang();
    checkauth();
    getapplist();
    getallshop();
    getallrequests();
  }, [])

  const getapplist = () => {
    fetch('https://myshop-tau-two.vercel.app/miniapp').then(r => r.json()).then(al => {
      if (al.status === 'success') {
        setallapp(al.data);
      }
    })
  }
  const checkauth = () => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setme(u);
      } else {
        navigate('../../signin')
      }
    })
  }
  const getlang = () => {
    let gotlang = localStorage.getItem('lang');
    if (gotlang) {
      setlang(gotlang);
    } else {
      setlang('english');
    }
  }
  const getallshop = async () => {
    await fetch('https://myshop-tau-two.vercel.app/allshop').then(re => re.json()).then(all => {
      if (all.status === 'success') {
        setallshop(all.data);
        setload(false);
      }
    })
  }
  const getallrequests = async () => {
    await fetch('https://myshop-tau-two.vercel.app/all/requests').then(re => re.json()).then(all => {
      if (all.status === 'success') {
        setallrequests(all.data);
      }
    })
  }
  const approve = async (e) => {
    let data = {
      ownerid: e.ownerid,
      owneremail: e.owneremail,
    }
    setpopload(true);
    await fetch('https://myshop-tau-two.vercel.app/approve/shop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(r => r.json()).then(al => {
      if (al.status === 'success') {
        window.alert(al.text);
        getallrequests();
        setpopload(false);
      } else {
        window.alert(al.text);
        setpopload(false);
      }
    })
  }
  const decline = async (e) => {
    let data = {
      ownerid: e.ownerid,
      owneremail: e.owneremail,
    }
    setpopload(true);
    await fetch('https://myshop-tau-two.vercel.app/decline/shop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(r => r.json()).then(al => {
      if (al.status === 'success') {
        window.alert(al.text);
        getallrequests();
        setpopload(false);
      } else {
        window.alert(al.text);
        setpopload(false);
      }
    })
  }
  const closemenu = () => {
    document.querySelector('.menu').style.left = '-369px';
  }
  const citycounts = Object.values(allshop).reduce((acc, stu) => {
    const stuclass = stu.city;
    if (acc[stuclass]) {
      acc[stuclass] += 1
    } else {
      acc[stuclass] = 1
    }
    return acc;
  }, {})
  const citychartdata = {
    labels: Object.keys(citycounts),
    datasets: [
      {
        label: 'All Shop By Address',
        data: citycounts,
        backgroundColor: [
          "#5B99C2",
          "#88D66C",
          "#7D8ABC",
          "#FF7777",
          "#50B498",
          "#667BC6",
          "#E49BFF",
          "#FFAD60",
          "#A67B5B",
          "#748873",
          "#722323"
        ]
      }
    ]
  }
  const update = async () => {
    let data = {
      logo: shoplogo,
      shopname: shopname,
      shoptype: shoptype,
      shopdes: shopdes,
      city: shopcity,
      email: shopemail,
      shopid: shopid,
      currentshopid: currentshopid,
      shopdocid: shopdocid,
      uid: me.uid
    };
    setaddload(true);
    await fetch('https://myshop-tau-two.vercel.app/update/shop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(r => r.json()).then(as => {
      if (as.status === 'success') {
        window.alert(as.text);
        setaddload(false);
        setshowpop(false);
        getallshop();
      } else {
        window.alert(as.text);
        setaddload(false);
      }
    })
  }
  const block = async () => {
    let data = {
      requesterid: me.uid,
      shopdocid: shopdocid
    };
    setsecload(true);
    await fetch('https://myshop-tau-two.vercel.app/block/shop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(r => r.json()).then(a => {
      if (a.status === 'success') {
        window.alert(a.text);
        setshowpop(false);
        getallshop();
        setsecload(false);
      } else {
        window.alert(a.text);
        setsecload(false);
      }
    })
  }
  const reactive = async () => {
    let data = {
      requesterid: me.uid,
      shopdocid: shopdocid
    };
    setsecload(true);
    await fetch('https://myshop-tau-two.vercel.app/reactive/shop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(r => r.json()).then(a => {
      if (a.status === 'success') {
        window.alert(a.text);
        setshowpop(false);
        getallshop();
        setsecload(false);
      } else {
        window.alert(a.text);
        setsecload(false);
      }
    })
  }
  const login = () => {
    let date = new Date();
    let day = date.getDate();
    let year = date.getFullYear();
    let pas = `${day}${year}6395`;
    if (askid && askpass) {
      if (askid === 'aonmao' && askpass === pas) {
        setask(false);
      } else {
        window.alert('Incorrect ID or password!')
      }
    } else {
      window.alert('Please enter ID and password!')
    }
  }
  const submit = async () => {
    let data = {
      logo: applogo,
      name: appname,
      type: apptype,
      link: applink,
      appid: appid,
    };
    if (apppoptype === 'add') {
      setaddpop(true);
      await fetch('https://myshop-tau-two.vercel.app/add/app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(r => r.json()).then(ss => {
        if (ss.status === 'success') {
          window.alert(ss.text);
          setaddpop(false);
          setapppop(false);
          setapplogo('');
          setappname('');
          setapptype('');
          setapplink('');
          setappid('');
          getapplist();
        } else {
          window.alert(ss.text);
          setaddpop(false);
        }
      })
    } else {
      setaddpop(true);
      await fetch('https://myshop-tau-two.vercel.app/update/app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(r => r.json()).then(ss => {
        if (ss.status === 'success') {
          window.alert(ss.text);
          setaddpop(false);
          setapppop(false);
          setapplogo('');
          setappname('');
          setapptype('');
          setapplink('');
          setappid('');
          getapplist();
        } else {
          window.alert(ss.text);
          setaddpop(false);
        }
      })
    }
  }
  const delapp=async()=>{
    let data = {
      appid:appid,
    };
    await fetch('https://myshop-tau-two.vercel.app/delete/app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(r => r.json()).then(ss => {
        if (ss.status === 'success') {
          window.alert(ss.text);
          setaddpop(false);
          setapppop(false);
          getapplist();
        } else {
          window.alert(ss.text);
          setaddpop(false);
        }
      })
  }
  return (
    <div className='main'>
      <Nav back={true} showsearch={true} />
      {popload && <div className='loaddiv'>
        <div className='loadbox'>
          <div className='cir'></div>
          <p>{langjson[13][lang]}...</p>
        </div>
      </div>}
      <div className='body'>
        <div className='menu'>
          <button className='close' onClick={() => { closemenu() }}>
            <i class="ri-close-large-line"></i>
          </button>
          <button onClick={() => { setcurrentpage('allshop') }} className={currentpage === 'allshop' ? 'active btn' : 'btn'}>
            {currentpage === 'allshop' ? <i class="ri-store-2-fill"></i> : <i class="ri-store-2-line"></i>}
            <p>All shop</p>
          </button>
          <button onClick={() => { setcurrentpage('requests') }} className={currentpage === 'requests' ? 'active btn' : 'btn'}>
            {currentpage === 'requests' ? <i class="ri-chat-unread-fill"></i> : <i class="ri-chat-unread-line"></i>}
            <p>Requests</p>
          </button>
          <button onClick={() => { setcurrentpage('miniapps') }} className={currentpage === 'miniapps' ? 'active btn' : 'btn'}>
            {currentpage === 'miniapps' ? <i class="ri-apps-fill"></i> : <i class="ri-apps-line"></i>}
            <p>Mini Apps</p>
          </button>
          <button onClick={() => { setcurrentpage('charts') }} className={currentpage === 'charts' ? 'active btn' : 'btn'}>
            {currentpage === 'charts' ? <i class="ri-bar-chart-2-fill"></i> : <i class="ri-bar-chart-2-line"></i>}
            <p>Charts</p>
          </button>
        </div>
        <div className='world'>
          {load && <div className='loadbar'></div>}
          <div className='tnav'>
            <h1 className='addtitle'>{currentpage === 'allshop' ? 'All shop' : currentpage === 'requests' ? 'Requests' : currentpage === 'miniapps' ? 'Mini Apps' : 'Charts'}</h1>
            <div className='btn'>
              <button onClick={() => { window.location.reload() }}><i class="ri-reset-right-line"></i></button>
              <button onClick={() => { setcurrentpage('charts') }}><i class="ri-bar-chart-2-line"></i></button>
            </div>
          </div>
          <div className='tableover'>
            {currentpage === 'allshop' && <table cellSpacing={0}>
              <tr>
                <th>Shop name</th>
                <th>Shop type</th>
                <th>Shop address</th>
                <th>Shop owner</th>
                <th>Shop ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              {allshop && allshop.map((item) => (
                <tr key={item.shopid}>
                  <td><b>{item.shopname}</b></td>
                  <td>{item.shoptype}</td>
                  <td>{item.city}</td>
                  <td>{item.ownername}</td>
                  <td><Link to={'/shop/' + item.shopid}>{item.shopid}</Link></td>
                  <td>{item.status === 'active' ? <b style={{ color: '#06923E' }}>{item.status}</b> : item.status === 'block' ? <b style={{ color: '#ff4545' }}>{item.status}</b> : <b>{item.status}</b>}</td>
                  <td className='btn'>
                    <button onClick={() => {
                      setshowpop(true);
                      setshoplogo(item.logo);
                      setshopname(item.shopname);
                      setshoptype(item.shoptype);
                      setshopdes(item.shopdes);
                      setshopcity(item.city);
                      setshopemail(item.email);
                      setcurrentshopid(item.shopid);
                      setshopid(item.shopid);
                      setshopdocid(item.id);
                      setshopstatus(item.status);
                    }}><i class="ri-pencil-fill"></i></button>
                    <button><i class="ri-delete-bin-6-fill"></i></button>
                  </td>
                </tr>
              ))}
            </table>}
            {currentpage === 'requests' && <table cellSpacing={0}>
              <tr>
                <th>Requester</th>
                <th>Email</th>
                <th>UID</th>
                <th>City</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              {allrequest && allrequest.map(a => (
                <tr key={a.ownerid}>
                  <td><b>{a.ownername}</b></td>
                  <td>{a.owneremail}</td>
                  <td>{a.ownerid}</td>
                  <td>{a.city}</td>
                  <td><b>{a.status}</b></td>
                  <td>
                    <div className='rbtn'>
                      <button className='app' onClick={() => { approve(a) }}>Approve</button>
                      <button className='de' onClick={() => { decline(a) }}>Decline</button>
                    </div>
                  </td>
                </tr>
              ))}
            </table>}
            {currentpage === 'miniapps' && <div className='minilist'>
              <div className='add b' onClick={() => {
                setapppop(true);
                setapppoptype('add');
              }}>
                <i class="ri-apps-2-add-fill"></i>
                <p>Add new app</p>
              </div>
              {allapp && allapp.map((item) => (
                <div to={'/app/' + item.id} key={item.id} className='item b'>
                  <img src={item.logo} alt='' />
                  <p>{item.name}</p>
                  <div className='des'>
                    <span>{item.type}</span>
                    <button onClick={() => {
                      setapppop(true);
                      setapppoptype('update');
                      setapplogo(item.logo);
                      setappname(item.name);
                      setapptype(item.type);
                      setapplink(item.link);
                      setappid(item.id);
                    }}><i class="ri-pencil-fill"></i></button>
                  </div>
                </div>
              ))}
            </div>}
          </div>
          {currentpage === 'charts' && <Chart data={citychartdata} />}
        </div>
      </div>
      {showpop && <div className='pop'>
        <div className='div'>
          <button onClick={() => { setshowpop(false); setaddload(false) }} className='close'>
            <i class="ri-close-large-line"></i>
          </button>
          <div className='head'>
            <h1>Edit shop</h1>
          </div>
          <div className='pro'>
            <img src={shoplogo ? shoplogo : 'https://i.pinimg.com/originals/ce/56/99/ce5699233cbc0f142250b520d967dff7.png'} alt='' />
            <div className='prolabel'>
              <label htmlFor='profile'>Shop profile</label>
              <input value={shoplogo} onChange={(e) => { setshoplogo(e.target.value) }} id='profile' placeholder='Paste link' />
            </div>
          </div>
          <label htmlFor='shopname'>Shop name</label>
          <input value={shopname} onChange={(e) => { setshopname(e.target.value) }} id='shopname' placeholder='...' />
          <label htmlFor='shoptype'>Shop type</label>
          <input value={shoptype} onChange={(e) => { setshoptype(e.target.value) }} id='shoptype' placeholder='...' />
          <label htmlFor='shopdes'>Shop description</label>
          <input value={shopdes} onChange={(e) => { setshopdes(e.target.value) }} id='shopdes' placeholder='...' />
          <label htmlFor='shopcity'>Shop city</label>
          <input value={shopcity} onChange={(e) => { setshopcity(e.target.value) }} id='shopcity' placeholder='...' />
          <label htmlFor='shopdes'>Shop email</label>
          <input value={shopemail} onChange={(e) => { setshopemail(e.target.value) }} id='shopdes' placeholder='...' />
          <label htmlFor='shopid'>Shop ID</label>
          <input value={shopid} onChange={(e) => { setshopid(e.target.value) }} id='shopid' placeholder='...' />
          <div className='btn'>
            {shopstatus === 'active' && <button onClick={() => { block() }} className='del'>{secload && <div className='whiteload'></div>}Block</button>}
            {shopstatus === 'block' && <button onClick={() => { reactive() }} className='reactive'>{secload && <div className='whiteload'></div>}Reactive</button>}
            <button onClick={() => { update() }} className='submit'>{addload && <div className='whiteload'></div>}Update</button>
          </div>
        </div>
      </div>}
      {ask && <div className='pop'>
        <div className='div'>
          <div className='head'>
            <h1>Admin login</h1>
          </div>
          <label htmlFor='id'>ID</label>
          <input value={askid} onChange={(e) => { setaskid(e.target.value) }} id='id' type='password' placeholder='...' />
          <label htmlFor='pass'>Password</label>
          <input value={askpass} onChange={(e) => { setaskpass(e.target.value) }} id='pass' type='password' placeholder='...' />
          <div className='btn'>
            <button onClick={() => { login() }} className='submit'>Login</button>
          </div>
        </div>
      </div>}
      {apppop && <div className='pop'>
        <div className='div'>
          <button onClick={() => {
            setapppop(false);
            setapplogo('');
            setappname('');
            setapptype('');
            setapplink('');
            setappid('');
          }} className='close'>
            <i class="ri-close-large-line"></i>
          </button>
          <div className='head'>
            <h1>{apppoptype === 'add' ? 'Add new app' : 'Edit app'}</h1>
          </div>
          <label htmlFor='applogo'>App logo</label>
          <input value={applogo} onChange={(e) => { setapplogo(e.target.value) }} id='applogo' type='text' placeholder='...' />
          <label htmlFor='appname'>App name</label>
          <input value={appname} onChange={(e) => { setappname(e.target.value) }} id='appname' type='text' placeholder='...' />
          <label htmlFor='apptype'>App type</label>
          <input value={apptype} onChange={(e) => { setapptype(e.target.value) }} id='apptype' type='text' placeholder='...' />
          <label htmlFor='applink'>App link</label>
          <input value={applink} onChange={(e) => { setapplink(e.target.value) }} id='applink' type='text' placeholder='...' />
          {apppoptype !== 'update' && <label htmlFor='appid'>App ID</label>}
          {apppoptype !== 'update' && <input value={appid} onChange={(e) => { setappid(e.target.value) }} id='appid' type='text' placeholder='...' />}
          <div className='btn'>
            {apppoptype === 'update' && <button onClick={()=>{delapp()}} className='del'>Delete</button>}
            <button onClick={() => { submit() }} className='submit'>{addpop && <div className='whiteload'></div>}{apppoptype === 'add' ? 'Add' : 'Update'}</button>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Admin

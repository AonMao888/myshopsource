import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link, useNavigate } from 'react-router-dom';
import langjson from '../json/lang.json'

function MapAll() {
    const [list, setlist] = useState([]);
    const [load, setload] = useState(true);
    const [melocation, setmelocation] = useState(null);
        const [lang, setlang] = useState('english');
    const navigate = useNavigate();

    useEffect(() => {
        getlang();
        getcurrentlocation();
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
        await fetch('https://myshop-tau-two.vercel.app/allshop').then(re => re.json()).then(all => {
            if (all.status === 'success') {
                setlist(all.data);
                setload(false);
            }
        })
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
    const customMarkerIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/9131/9131546.png',
        iconSize: [36, 36],
        iconAnchor: [18, 38],
        popupAnchor: [0, -39]
    });
    return (
        <div className='mapview'>
            <div className='mapnav'>
                <h1>{langjson[39][lang]}</h1>
                <div className='mapnavbtn'>
                    <button onClick={()=>{navigate('../search')}}>
                        <i class="ri-search-line"></i>
                    </button>
                    <button onClick={() => { window.location.reload() }}>
                        <i class="ri-reset-left-line"></i>
                    </button>
                </div>
            </div>
            {load && <div className='loadbar'></div>}
            {!melocation&&<div className='req'>
                <h3>{langjson[37][lang]}</h3>
                <button onClick={() => { getcurrentlocation() }}>{langjson[38][lang]}</button>
            </div>}
            {melocation && <MapContainer
                center={[melocation[0], melocation[1]]}
                zoom={16}
                className='mapdiv'
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {list && list.map((item) => (
                    <Marker
                        key={item.id}
                        position={[item.lat, item.long]}
                        icon={customMarkerIcon}
                    >
                        <Popup
                            minWidth={360}
                            maxWidth={450}
                        >
                            <div className='mappopdiv'>
                                <h3 className='poptitle'>{item.shopname}</h3>
                                <p>{item.shopdes}</p>
                                <Link to={'../../shop/' + item.id} className='poplink'>{langjson[40][lang]}</Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>}
        </div>
    )
}

export default MapAll

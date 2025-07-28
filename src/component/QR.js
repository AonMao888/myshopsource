import { click } from '@testing-library/user-event/dist/click'
import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import langjson from '../json/lang.json'

function QR({ title, des, text, clicked }) {
  const [lang, setlang] = useState('english');

  useEffect(() => {
    getlang();
  }, [])

  const getlang = () => {
    let gotlang = localStorage.getItem('lang');
    if (gotlang) {
      setlang(gotlang);
    } else {
      setlang('english');
    }
  }
  return (
    <div className='pop'>
      <div className='qrpop'>
        <button onClick={() => { clicked() }}>
          <i class="ri-close-large-line"></i>
        </button>
        <h1>{title}</h1>
        <p>{des}</p>
        <QRCode bgColor='var(--back)' fgColor='var(--color)' value={text} className='qr' style={{ width: '45%', height: 'auto' }} />
        <p>{langjson[54][lang]}</p>
      </div>
    </div>
  )
}

export default QR

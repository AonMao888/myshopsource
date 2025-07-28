import React, { useEffect } from 'react'
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../fire'
import { useNavigate } from 'react-router-dom';

const provider = new GoogleAuthProvider();

function Signin() {
  const navigate = useNavigate();
  
  useEffect(() => {
    getmode();
    checkauth();
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
  const checkauth = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('../')
      }
    })
  }
  const sign = async () => {
    await signInWithPopup(auth, provider).then(user => {
      console.log(user);

    })
  }
  return (
    <div className='signin'>
      <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png' alt='' />
      <h1>Login Account</h1>
      <p>Continue signin with google.</p>
      <button onClick={() => { sign() }}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png' alt='' />
        <p>Continue with Google</p>
      </button>
    </div>
  )
}

export default Signin

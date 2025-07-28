import React, { useEffect } from 'react'
import Nav from '../component/Nav'
import Menu from '../component/Menu'
import { useParams } from 'react-router-dom'
import AddPost from '../component/AddPost';
import PostItem from '../component/PostItem';
import MyPost from '../component/MyPost';

function ViewPost() {
    const {id} = useParams();

    useEffect(()=>{
      getmode();
    },[])
    
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
  return (
    <div className='main'>
      <Nav showsearch={true} back={true}/>
      <div className='body'>
        <Menu selected={'Post'}/>
        {id==='add'?<AddPost/>:id==='mine'?<MyPost/>:<PostItem postid={id}/>}
      </div>
    </div>
  )
}

export default ViewPost

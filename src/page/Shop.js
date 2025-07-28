import React from 'react'
import Nav from '../component/Nav'
import Menu from '../component/Menu'
import ShopItem from '../component/ShopItem'
import { useParams } from 'react-router-dom'

function Shop() {
    const {id} = useParams();
  return (
    <div className='main'>
      <Nav showsearch={true} back={true}/>
      <div className='body'>
        <Menu/>
        <ShopItem shopid={id}/>
      </div>
    </div>
  )
}

export default Shop

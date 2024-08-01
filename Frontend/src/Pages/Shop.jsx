import React from 'react'
import Hero from '../assets/Hero/Hero'
import Popular from '../assets/Popular/Popular'
import Offers from '../assets/Offers/Offers'

import NewsLetter from '../NewsLetter/NewsLetter'

export default function Shop() {
  return (
    <div>
     <Hero/>
     <Popular/>
     <h1>Offers</h1>
     <Offers/>
     <NewsLetter/>
    </div>
  )
}
